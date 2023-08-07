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
import { IoMailOutline, IoLockClosedOutline } from 'react-icons/io5'

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
      router.push('/uploads')
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
        <h1 className="mb-4 text-center text-3xl font-bold text-neutral-300">
          Entrar
        </h1>
        <form
          className="flex flex-col gap-4 rounded-lg bg-neutral-800 p-4 shadow shadow-neutral-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoMailOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="text"
              placeholder="E-mail"
              {...register('email')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoLockClosedOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="password"
              placeholder="Senha"
              {...register('password')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
          <button
            type="submit"
            className="h-14 rounded-lg bg-indigo-500 font-bold text-zinc-50 transition-colors hover:bg-indigo-500/80 focus:hover:bg-indigo-500/80 disabled:bg-indigo-600/50"
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
            className="group mt-4 text-center text-indigo-500"
          >
            Não possui uma conta?{' '}
            <span className="font-bold group-hover:underline">Criar conta</span>
          </Link>
        </form>
      </div>
    </main>
  )
}
