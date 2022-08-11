import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsListContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  return (
    <TransactionsContainer>
      <Header />
      <Summary />

      <TransactionsListContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="40%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="positive">R$ 1200,00</PriceHighlight>
              </td>
              <td>Venda</td>
              <td>10/08/2004</td>
            </tr>
            <tr>
              <td width="40%">Hambúrger</td>
              <td>
                <PriceHighlight variant="negative">- R$ 14,00</PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>10/08/2004</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsListContainer>
    </TransactionsContainer>
  )
}
