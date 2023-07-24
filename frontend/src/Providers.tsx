'use client'

import { ReactNode } from 'react'
import PostsProvider from './context/PostsContext'

type ProviderProps = {
  children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
  return <PostsProvider>{children}</PostsProvider>
}
