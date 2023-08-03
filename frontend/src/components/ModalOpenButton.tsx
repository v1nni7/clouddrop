'use client'

import { useContext } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { ModalCreateContext } from '@/context/ModalCreateContext'
import { useRouter } from 'next/navigation'

export default function ModalOpenButton() {
  const router = useRouter()
  const { toggleOpen } = useContext(ModalCreateContext)

  const openModal = () => {
    toggleOpen()
    router.push('/uploads')
  }

  return (
    <button
      onClick={() => openModal()}
      className="-translate-y-5 rounded-full bg-indigo-500 p-4 shadow shadow-indigo-500 transition-colors hover:bg-indigo-600 hover:shadow-indigo-600"
    >
      <IoAddOutline className="text-2xl" />
    </button>
  )
}
