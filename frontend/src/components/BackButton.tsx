'use client'

import { useRouter } from 'next/navigation'
import { IoChevronBack } from 'react-icons/io5'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="my-4 flex items-center rounded-lg bg-blue-400 p-2 font-semibold text-white outline-none transition-colors hover:bg-blue-500 focus:bg-blue-500"
    >
      <IoChevronBack className="text-2xl" />
      Voltar
    </button>
  )
}
