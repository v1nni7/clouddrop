'use client'

import { ReactNode } from 'react'
import PostsProvider from './context/PostsContext'
import { UserProvider } from './context/UserContext'

type ProviderProps = {
  children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return (
    <UserProvider>
      <PostsProvider>{children}</PostsProvider>
    </UserProvider>
  )
}
