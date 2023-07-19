'use client'

import { signInRequest } from '@/services/auth'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

type FieldValues = {
  email: string
  password: string
}

export default function SignIn() {
  const { handleSubmit, register } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await signInRequest(data)

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-96 flex-col rounded-lg p-2 shadow">
        <h1 className="mb-4 text-center text-3xl font-extrabold">Entrar</h1>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-2">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              {...register('email')}
              className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100/80 p-2 outline-none transition-colors focus:border-zinc-400"
            />
          </div>
          <div className="p-2">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100/80 p-2 outline-none transition-colors focus:border-zinc-400"
            />
          </div>
          <button className="m-2 rounded-lg bg-blue-500 p-3 font-bold text-zinc-50 transition-colors hover:bg-blue-500/80 focus:hover:bg-blue-500/80">
            Entrar
          </button>
          <Link
            href="/sign-up"
            className="group mt-4 text-center text-blue-500"
          >
            Não possui uma conta?{' '}
            <span className="font-bold group-hover:underline">Criar conta</span>
          </Link>
        </form>
      </div>
    </main>
  )
}
