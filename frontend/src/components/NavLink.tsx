'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  pathname: string
  children: ReactNode
}

export default function NavLink({ children, pathname }: NavLinkProps) {
  const routePathname = usePathname()

  const isActive = routePathname === pathname

  return (
    <Link
      href={pathname}
      className={`flex h-full w-1/2 items-center justify-center border-t-4 transition-all ${
        isActive ? 'border-indigo-500 text-indigo-500' : 'border-transparent'
      }`}
    >
      {children}
    </Link>
  )
}
