import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt: string
}

interface CreateTransactionData {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  loadTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((prevState) => [response.data, ...prevState])
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  const providerValue = {
    transactions,
    loadTransactions,
    createTransaction,
  }

  return (
    <TransactionsContext.Provider value={providerValue}>
      {children}
    </TransactionsContext.Provider>
  )
}
