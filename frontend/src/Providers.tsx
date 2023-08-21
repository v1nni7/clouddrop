'use client'

import { ReactNode } from 'react'
import PostsProvider from './context/PostsContext'
import { UserProvider } from './context/UserContext'
import { ModalCreateProvider } from './context/ModalCreateContext'
import { ThemeProvider, createTheme } from '@mui/material'

type ProviderProps = {
  children: ReactNode
}

export default function Providers({ children }: ProviderProps) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  return (
    <UserProvider>
      <PostsProvider>
        <ModalCreateProvider>
          <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
        </ModalCreateProvider>
      </PostsProvider>
    </UserProvider>
  )
}
