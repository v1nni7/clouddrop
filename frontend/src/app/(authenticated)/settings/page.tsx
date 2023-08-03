'use client'

import { useContext, useState } from 'react'
import { IoLockClosed, IoLockOpen } from 'react-icons/io5'
import { UserContext } from '@/context/UserContext'

export default function Settings() {
  const [formEnabled, setFormEnabled] = useState(false)

  const { user } = useContext(UserContext)

  return (
    <main className="mx-auto space-y-4 p-4 sm:max-w-md">
      <h2 className="mb-4 text-2xl">Configurações</h2>

      <div className="rounded-lg bg-neutral-800 p-2">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg">Minhas Informações</h2>

          <button
            onClick={() => setFormEnabled(!formEnabled)}
            className="flex justify-center rounded-lg bg-neutral-700 p-2 text-xl outline-none transition-colors hover:bg-neutral-600"
          >
            {formEnabled ? <IoLockOpen /> : <IoLockClosed />}
          </button>
        </div>

        <form className="overflo-hidden relative rounded-lg p-2">
          <div
            className={`absolute inset-0 rounded-lg bg-neutral-700/40 transition-all ${
              formEnabled ? 'invisible opacity-0' : 'visible opacity-100'
            }`}
          />

          <div className="my-4">
            <label htmlFor="name" className="mb-2 block">
              Nome
            </label>

            <input
              type="text"
              id="name"
              defaultValue={user.name}
              className="w-full rounded-lg bg-neutral-700 p-2 outline-none disabled:bg-neutral-600"
              disabled={!formEnabled}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="mb-2 block">
              Usuário
            </label>

            <input
              type="text"
              id="username"
              defaultValue={user.username}
              className="w-full rounded-lg bg-neutral-700 p-2 outline-none disabled:bg-neutral-600"
              disabled={!formEnabled}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              defaultValue={user.email}
              className="w-full rounded-lg bg-neutral-700 p-2 outline-none disabled:bg-neutral-600"
              disabled={!formEnabled}
            />
          </div>
        </form>
      </div>

      <div className="rounded-lg border-2 border-red-400 p-2">
        <h2 className="mb-4 text-lg font-semibold text-red-400">
          Zona de perigo
        </h2>

        <button className="w-full rounded-lg bg-red-400 p-2 font-semibold text-white transition-colors hover:bg-red-500">
          Excluir conta
        </button>
      </div>
    </main>
  )
}
