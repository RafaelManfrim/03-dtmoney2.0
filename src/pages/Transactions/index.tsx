import { useContextSelector } from 'use-context-selector'

import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsListContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (ctx) => {
    return ctx.transactions
  })

  return (
    <TransactionsContainer>
      <Header />
      <Summary />

      <TransactionsListContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="40%">{transaction.description}</td>
                <td>
                  <PriceHighlight
                    variant={
                      transaction.type === 'income' ? 'positive' : 'negative'
                    }
                  >
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsListContainer>
    </TransactionsContainer>
  )
}
