'use client'

import Link from 'next/link'
import useToggle from '@/hook/useToggle'
import { IoCaretDownOutline } from 'react-icons/io5'

type DropdownProps = {
  user: {
    username: string
  } | null
}

export default function Dropdown({ user }: DropdownProps) {
  const [isOpen, toggleOpen, element, button] = useToggle(false)

  return (
    <div className="relative">
      <button
        type="button"
        ref={button}
        onClick={() => toggleOpen()}
        className="text-md flex items-center gap-2 font-alt font-extrabold"
      >
        {user?.username} <IoCaretDownOutline />
      </button>

      <div
        ref={element}
        className={`absolute -left-12 top-10 overflow-hidden rounded-lg bg-zinc-300 text-center transition-all ${
          isOpen ? 'h-20 border border-zinc-400' : 'h-0'
        }`}
      >
        <Link
          href="/settings"
          className="block p-2 transition-colors hover:bg-zinc-400"
        >
          Configurações
        </Link>
        <Link
          href="/settings"
          className="block p-2 text-red-500 transition-colors hover:bg-zinc-400"
        >
          Sair
        </Link>
      </div>
    </div>
  )
}
