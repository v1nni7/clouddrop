'use client'

import Link from 'next/link'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoMailOutline,
  IoMailUnreadOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
} from 'react-icons/io5'

import { signUpSchema } from '@/schema/authSchemas'
import { signUpRequest } from '@/services/auth'
import LoadingSpinner from '@/components/LoadingSpinner'

type FieldValues = {
  email: string
  name: string
  username: string
  password: string
  confirmEmail: string
  confirmPassword: string
}

export default function SignUp() {
  const router = useRouter()
  const { handleSubmit, register, formState } = useForm<FieldValues>()
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await signUpSchema.validate(data, { abortEarly: true })

      const response = await signUpRequest(data)

      if (response.status !== 201) {
        throw new Error('Erro ao criar conta')
      }

      toast.success('Conta criada com sucesso!')
      router.push('/sign-in')
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(`${error.response?.data}`)
      }

      toast.error(`${error.message}`)
    }
  }

  return (
    <main className="h-screen">
      <div className="mx-auto flex h-full flex-col items-center justify-center px-4 sm:max-w-xl">
        <h1 className="mb-4 text-3xl font-bold text-neutral-300">
          Crie sua conta
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-2 gap-4 rounded-lg bg-neutral-800 p-4 shadow shadow-neutral-700"
        >
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoPersonOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="text"
              placeholder="Nome"
              {...register('name')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoPersonCircleOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="text"
              placeholder="Usuário"
              {...register('username')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
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
            <IoMailUnreadOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="text"
              placeholder="Confirme seu E-mail"
              {...register('confirmEmail')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoLockOpenOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="password"
              placeholder="Senha"
              {...register('password')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>
          <div className="relative col-span-2 flex items-center sm:col-span-1">
            <IoLockClosedOutline className="absolute left-2 text-3xl text-neutral-500" />
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register('confirmPassword')}
              className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 h-14 rounded-lg bg-indigo-500 font-bold text-zinc-50 transition-colors hover:bg-indigo-500/80 focus:hover:bg-indigo-500/80 disabled:bg-indigo-600/50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingSpinner width={35} height={35} strokeWidth={3} />
            ) : (
              'Cadastrar'
            )}
          </button>

          <Link
            href="/sign-in"
            className="group col-span-2 mt-4 text-center text-indigo-500"
          >
            Já possui uma conta?{' '}
            <span className="font-bold group-hover:underline">Entrar</span>{' '}
          </Link>
        </form>
      </div>
    </main>
  )
}
