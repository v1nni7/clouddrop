'use client'

import { ReactNode } from 'react'
import PostsProvider from './context/PostsContext'
import { UserProvider } from './context/UserContext'
import { ModalCreateProvider } from './context/ModalCreateContext'

type ProviderProps = {
  children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return (
    <UserProvider>
      <PostsProvider>
        <ModalCreateProvider>{children}</ModalCreateProvider>
      </PostsProvider>
    </UserProvider>
  )
}
