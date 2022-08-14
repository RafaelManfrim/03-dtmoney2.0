import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { Summary } from '../../components/Summary'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsListContainer,
  TransactionsTable,
} from './styles'

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt: string
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function loadTransactions() {
      const response = await fetch('https://localhost:3333/transactions')
      const data = await response.json()
      setTransactions(data)
    }

    loadTransactions()
  }, [])

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
                    {transaction.price}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsListContainer>
    </TransactionsContainer>
  )
}
