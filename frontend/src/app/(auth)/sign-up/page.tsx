'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

type FieldValues = {
  email: string
  name: string
  username: string
  password: string
  confirmEmail: string
  confirmPassword: string
}

export default function SignUp() {
  const { handleSubmit, register } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data)
    } catch (error) {}
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex w-[768px] flex-col rounded-lg p-2 shadow">
        <h1 className="mb-4 text-center text-3xl font-extrabold">Cadastro</h1>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100/80 p-2 outline-none transition-colors focus:border-zinc-400"
              />
            </div>
            <div className="p-2">
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                type="text"
                {...register('username')}
                className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100/80 p-2 outline-none transition-colors focus:border-zinc-400"
              />
            </div>
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
              <label htmlFor="confirmEmail">Confirme seu e-mail</label>
              <input
                id="confirmEmail"
                type="text"
                {...register('confirmEmail')}
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
            <div className="p-2">
              <label htmlFor="confirmPassword">Confirme sua senha</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100/80 p-2 outline-none transition-colors focus:border-zinc-400"
              />
            </div>
          </div>
          <button className="m-2 rounded-lg bg-blue-500 p-3 font-bold text-zinc-50 transition-colors hover:bg-blue-500/80 focus:hover:bg-blue-500/80">
            Cadastrar
          </button>
          <Link
            href="/sign-in"
            className="group mt-4 text-center text-blue-500"
          >
            Já possui uma conta?{' '}
            <span className="font-bold group-hover:underline">Entrar</span>
          </Link>
        </form>
      </div>
    </main>
  )
}
