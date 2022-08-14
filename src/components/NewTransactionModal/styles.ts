import styled, { css } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${({ theme }) => theme.colors['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    margin-top: 2rem;

    input {
      border-radius: 6px;
      border: 0;
      padding: 1rem;

      color: ${({ theme }) => theme.colors['gray-300']};
      background-color: ${({ theme }) => theme.colors['gray-900']};

      &:placeholder {
        color: ${({ theme }) => theme.colors['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      border-radius: 6px;
      background-color: ${({ theme }) => theme.colors['green-500']};
      font-weight: bold;
      padding: 0 1.25rem;
      margin-top: 1.5rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors['gray-100']};

      &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }

      &:not(:disabled):hover {
        background-color: ${({ theme }) => theme.colors['green-700']};
        transition: background-color 0.2s;
      }
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors['gray-500']};

  &:hover {
    color: ${({ theme }) => theme.colors['gray-400']};
    transition: color 0.2s;
  }
`

export const TransactionTypeContainer = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransTypeBtnProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransTypeBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors['gray-700']};
  color: ${({ theme }) => theme.colors['gray-300']};
  cursor: pointer;
  padding: 1rem;

  ${({ theme, variant }) =>
    variant === 'income' &&
    css`
      svg {
        color: ${theme.colors['green-300']};
      }
    `}

  ${({ theme, variant }) =>
    variant === 'outcome' &&
    css`
      svg {
        color: ${theme.colors['red-300']};
      }
    `}

  &[data-state='unchecked'] {
    &:hover {
      background-color: ${({ theme }) => theme.colors['gray-600']};
    }
  }

  &[data-state='checked'] {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme, variant }) =>
      variant === 'income'
        ? theme.colors['green-500']
        : theme.colors['red-500']};
    svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`
