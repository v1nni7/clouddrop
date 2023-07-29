'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { setCookie } from 'nookies'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signInRequest } from '@/services/auth'
import LoadingSpinner from '@/components/LoadingSpinner'
import { signInSchema } from '@/schema/authSchemas'

type FieldValues = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const { handleSubmit, register, formState } = useForm<FieldValues>()
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await signInSchema.validate(data, { abortEarly: true })

      const response = await signInRequest(data)

      if (response.status !== 200) {
        throw new Error('Erro ao entrar')
      }

      setCookie(null, 'clouddrop.token', response.data.token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      toast.success('Login efetuado com sucesso!')
      router.push('/')
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(`${error.response?.data}`)
      }

      toast.error(`${error.message}`)
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
          <button
            type="submit"
            className="m-2 h-14 rounded-lg bg-blue-500 font-bold text-zinc-50 transition-colors hover:bg-blue-500/80 focus:hover:bg-blue-500/80 disabled:bg-blue-600/50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingSpinner width={35} height={35} strokeWidth={3} />
            ) : (
              'Entrar'
            )}
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
