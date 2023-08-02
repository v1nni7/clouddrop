import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

type AuthenticatedLayoutProps = {
  children: ReactNode
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Navbar />
    </>
  )
}
