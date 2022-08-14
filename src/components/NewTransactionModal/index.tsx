import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionTypeButton,
  TransactionTypeContainer,
} from './styles'
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const NewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
})

type NewTransactionFormInputs = z.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
  const { register, handleSubmit, formState, control, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(NewTransactionFormSchema),
    })

  const { createTransaction } = useContext(TransactionsContext)

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionTypeContainer
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionTypeContainer>
            )}
          />

          <button type="submit" disabled={formState.isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
