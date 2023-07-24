'use client'

import Image from 'next/image'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { IoAdd, IoImage } from 'react-icons/io5'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToggle, useFilePreview } from '@/hooks'
import { uploadFile } from '@/services/upload'
import { createPostRequest } from '@/services/post'
import LoadingSpinner from './LoadingSpinner'

type FieldValues = {
  title: string
  file: FileList
}

export default function FormUpload() {
  const [isOpen, toggleOpen, elementRef] = useToggle()
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState,
    setValue,
    resetField,
  } = useForm<FieldValues>()
  const { isSubmitting } = formState

  const selectedFile = watch('file') ? watch('file') : []

  if (selectedFile.length > 0) {
    setValue('title', selectedFile[0].name)
  }

  const [preview, resetPreview] = useFilePreview(selectedFile)

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

      handleCloseModal()
      toast.success('Postagem criada com sucesso')
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return toast.error(`${error.response?.data}`)
      }

      toast.error(`${error.message}`)
    }
  }

  const handleCloseModal = () => {
    toggleOpen()
    resetPreview()
    resetField('file')
    resetField('title')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('file')} id="file" type="file" hidden />
      </form>

      <button
        type="button"
        onClick={() => toggleOpen()}
        className="flex cursor-pointer items-center rounded-lg bg-blue-400 p-2 text-white shadow transition-colors hover:bg-blue-400/80"
      >
        <IoAdd className="h-6 w-6 text-lg" />

        <span className="ml-2">Criar postagem</span>
      </button>

      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transition-all duration-500 ${
          isOpen ? 'visible duration-500' : 'invisible duration-300'
        }`}
      >
        <div className="h-full w-full bg-zinc-950/60">
          <div className="mx-auto flex h-full max-w-xl items-center py-9">
            <div
              ref={elementRef}
              className={`w-full transform rounded-lg bg-white p-2 transition-all  ${
                isOpen
                  ? 'translate-y-0 opacity-100 duration-500'
                  : '-translate-y-24 opacity-0 duration-300'
              }`}
            >
              <div className="p-2">
                <h2 className="text-2xl font-semibold">Criar postagem</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-6">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-start font-bold"
                    >
                      Titulo
                    </label>

                    <input
                      id="title"
                      type="text"
                      {...register('title')}
                      className="w-full rounded-lg border border-zinc-300 bg-zinc-100 p-2 outline-none transition-all focus:border-zinc-400"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="file"
                      className="mb-2 block text-start font-bold"
                    >
                      Arquivo
                    </label>
                    <label
                      htmlFor="file"
                      className={`group relative flex min-h-[256px] w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 object-cover transition-colors duration-500 hover:border-zinc-400 hover:bg-zinc-200`}
                    >
                      {preview.url ? (
                        preview.type.includes('image') ? (
                          <Image
                            width={544}
                            height={256}
                            src={preview.url}
                            alt=""
                            className={`h-full max-h-[600px] w-full rounded-lg object-contain`}
                          />
                        ) : (
                          <>
                            <video
                              src={preview.url}
                              className="h-full w-full rounded-lg object-contain"
                              controls
                            />

                            <label
                              htmlFor="file"
                              className="absolute right-2 top-2 cursor-pointer rounded-md bg-blue-400 px-2 py-1 text-white opacity-0 transition-all duration-500 hover:bg-blue-400/80 group-hover:opacity-100"
                            >
                              Alterar
                            </label>
                          </>
                        )
                      ) : (
                        <IoImage className="text-4xl text-zinc-300 transition-colors duration-500 group-hover:text-zinc-400" />
                      )}
                    </label>
                    <input id="file" type="file" hidden />
                    <h3 className="mt-1 text-sm">
                      Essa é apenas uma prévia, a imagem ou video manterá o
                      formato e tamanho original
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCloseModal()}
                      className="focus:zinc:bg-blue-500/80 h-10 rounded-lg bg-zinc-400 px-4 font-bold text-white transition-colors hover:bg-zinc-400/80"
                    >
                      Fechar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-10 w-24 rounded-lg bg-blue-500 px-4 font-bold text-zinc-50 transition-colors hover:bg-blue-500/80 focus:hover:bg-blue-500/80 disabled:bg-blue-600/50"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner
                          width={25}
                          height={25}
                          strokeWidth={3}
                        />
                      ) : (
                        'Salvar'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
