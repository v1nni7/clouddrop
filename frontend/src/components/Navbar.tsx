import Link from 'next/link'
import decoded from 'jwt-decode'
import { cookies } from 'next/headers'
import Dropdown from './Dropdown'

type User = {
  username: string
}

export default function Navbar() {
  let user: User | null = null
  const token = cookies().get('clouddrop.token')?.value

  if (token) {
    user = decoded(token)
  }

  return (
    <nav className="flex items-center justify-between border-b border-zinc-300 bg-zinc-200 px-6 py-4">
      <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text fill-transparent font-alt text-3xl font-extrabold text-transparent">
        Cloud Drop
      </h1>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-bold text-zinc-500 transition-colors hover:text-zinc-500/80"
        >
          Inicio
        </Link>
        <Link
          href="/"
          className="font-bold text-zinc-500 transition-colors hover:text-zinc-500/80"
        >
          Meus arquivos
        </Link>
      </div>

      <Dropdown user={user} />
    </nav>
  )
}
