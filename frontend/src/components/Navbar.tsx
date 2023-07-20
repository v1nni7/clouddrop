import Link from 'next/link'
import decoded from 'jwt-decode'
import { cookies } from 'next/headers'

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
    <nav className="flex items-center justify-between border-b border-zinc-300 bg-zinc-200/50 p-6">
      <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text fill-transparent font-alt text-3xl font-extrabold text-transparent">
        Cloud Drop
      </h1>

      <h2 className="w-[480px] text-center">
        Olá <b>{user?.username}</b>, seja bem-vindo ao <b>Cloud Drop</b>!
      </h2>

      <Link
        href="/profile"
        className="flex h-12 items-center rounded-lg bg-blue-300/50 px-12 font-semibold shadow outline-none transition-all hover:bg-blue-400/50 focus:hover:bg-blue-400/50 active:shadow-none"
      >
        Meu Perfil
      </Link>
    </nav>
  )
}
