import styled from 'styled-components'

export const TransactionsContainer = styled.div``

export const TransactionsListContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  /* margin-top: 1.5rem; */

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme.colors['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'positive' | 'negative'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) =>
    variant === 'positive'
      ? theme.colors['green-300']
      : theme.colors['red-300']};
`
