import BackButton from '@/components/BackButton'
import { ReactNode } from 'react'

type ContentLayoutProps = {
  children: ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <main className="p-6">
      <BackButton />
      {children}
    </main>
  )
}
