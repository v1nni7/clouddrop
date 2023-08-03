import { ReactNode, RefObject, createContext } from 'react'
import { useToggle } from '@/hooks'

type ModalCreateContextProps = {
  isOpen: boolean
  toggleOpen: () => void
  elementRef: RefObject<HTMLDivElement>
}

export const ModalCreateContext = createContext({} as ModalCreateContextProps)

type ModalCreateProviderProps = {
  children: ReactNode
}

export function ModalCreateProvider({ children }: ModalCreateProviderProps) {
  const [isOpen, toggleOpen, elementRef] = useToggle()

  return (
    <ModalCreateContext.Provider value={{ isOpen, toggleOpen, elementRef }}>
      {children}
    </ModalCreateContext.Provider>
  )
}
