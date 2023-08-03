'use client'

import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoImageOutline } from 'react-icons/io5'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { ModalCreateContext } from '@/context/ModalCreateContext'
import { useFilePreview } from '@/hooks'
import { createPostRequest } from '@/services/post'
import { uploadFile } from '@/services/upload'

type FieldValues = {
  title: string
  file: FileList
}

export default function ModalCreatePost() {
  const { handleSubmit, register, watch, setValue } = useForm<FieldValues>()
  const { isOpen, toggleOpen, elementRef } = useContext(ModalCreateContext)

  const selectedFile = watch('file') ? watch('file') : []

  if (selectedFile.length > 0) {
    setValue('title', selectedFile[0].name)
  }

  const [preview, setPreview] = useFilePreview(selectedFile)

  const onSubmit: SubmitHandler<FieldValues> = async ({ title, file }) => {
    try {
      const formData = new FormData()

      let fileURL = null

      if (file.length > 0) {
        formData.append('media', file[0])
        const response = await uploadFile(formData)

        fileURL = response.data
      }

      const data = {
        title,
        fileURL,
        type: preview.type,
      }

      const response = await createPostRequest(data)

      if (response.status !== 201) {
        throw new Error('Erro ao criar postagem')
      }

      toast.success('Postagem criada com sucesso')
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(`${error.response?.data}`)
      }

      toast.error(`${error.message}`)
    }
  }

  const overlayClass = isOpen
    ? 'visible duration-500'
    : 'invisible duration-300'

  const modalClass = isOpen
    ? 'translate-y-0 opacity-100 duration-500'
    : '-translate-y-24 opacity-0 duration-300'

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transition-all ${overlayClass}`}
      >
        <div className="h-full w-full bg-slate-50/10">
          <div className="mx-auto flex h-full max-w-md items-center px-4">
            <div
              ref={elementRef}
              className={`w-full transform rounded-lg bg-neutral-800 p-2 transition-all ${modalClass}`}
            >
              <h2 className="mb-4 text-2xl text-neutral-400">Novo post</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="text"
                  placeholder="Título"
                  {...register('title')}
                  className="w-full rounded-lg bg-neutral-700/60 p-2 placeholder:text-neutral-400"
                />

                <label
                  htmlFor="file"
                  className="flex h-56 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-500 transition-colors hover:bg-neutral-700/60"
                >
                  <IoImageOutline className="text-4xl" />
                </label>

                <input type="file" id="file" {...register('file')} hidden />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleOpen()}
                    className="rounded-md bg-neutral-700 px-4 py-2 hover:bg-neutral-700/60"
                  >
                    Fechar
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-4 py-2 text-neutral-50 transition-colors hover:bg-indigo-500/60"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
