import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { TransactionsContext } from '../../contexts/TransactionsContext'

import { SearchFormContainer } from './styles'

const SearchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof SearchFormSchema>

export function SearchForm() {
  const { register, handleSubmit, formState } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  })

  const loadTransactions = useContextSelector(TransactionsContext, (ctx) => {
    return ctx.loadTransactions
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await loadTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={formState.isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
