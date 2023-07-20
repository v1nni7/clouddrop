'use client'

import Image from 'next/image'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { uploadFile } from '@/services/upload'
import useFilePreview from '@/hook/useFilePreview'
import { createPostRequest } from '@/services/post'

type FieldValues = {
  title: string
  file: FileList
}

export default function FormUpload() {
  const { handleSubmit, register, watch, reset } = useForm<FieldValues>()

  const selectedFile = watch('file')
  const [preview] = useFilePreview(selectedFile)

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="file"
        className="cursor-pointer rounded-lg bg-blue-400 p-2 text-white shadow transition-colors hover:bg-blue-400/80"
      >
        Escolher arquivo
      </label>

      <input {...register('file')} id="file" type="file" hidden />

      {selectedFile && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-900/40">
          <div className="flex w-2/6 animate-fade-in-down flex-col gap-2 rounded-lg bg-white p-4">
            <div className="">
              <label htmlFor="title" className="block text-start">
                Titulo
              </label>
              <input
                id="title"
                type="text"
                className="h-12 w-full rounded-lg border border-zinc-300 bg-zinc-200 px-2 outline-none transition-colors hover:border-zinc-400 focus:border-zinc-400"
              />
            </div>

            <div className="">
              {preview.url && (
                <div className="max-w-96 group relative mb-4 flex max-h-96 justify-center">
                  {preview.type.includes('image') ? (
                    <Image
                      className="rounded-lg object-cover"
                      width={384}
                      height={280}
                      src={preview.url}
                      alt=""
                    />
                  ) : (
                    <video
                      width={384}
                      height={280}
                      src={preview.url}
                      controls
                      className="w-full rounded-lg"
                    />
                  )}

                  <label
                    htmlFor="file"
                    className="absolute right-2 top-2 block cursor-pointer self-start rounded-lg bg-zinc-500 p-1 text-sm font-bold text-white opacity-0 transition-opacity duration-500 hover:opacity-80 group-hover:opacity-100"
                  >
                    Alterar arquivo
                  </label>
                </div>
              )}

              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="block cursor-pointer rounded-lg bg-zinc-400 p-2 font-bold text-white transition-opacity hover:opacity-80"
                >
                  Fechar
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 p-2 font-bold text-zinc-50 transition-colors hover:bg-blue-500/80 focus:hover:bg-blue-500/80 disabled:bg-blue-600/50"
                >
                  Fazer Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
