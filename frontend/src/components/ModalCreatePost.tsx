'use client'

import { useContext } from 'react'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { IoCheckmarkSharp, IoImageOutline } from 'react-icons/io5'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { ModalCreateContext } from '@/context/ModalCreateContext'
import { useFilePreview } from '@/hooks'
import { createPostRequest } from '@/services/post'
import { uploadFile } from '@/services/upload'
import Image from 'next/image'
import { PostsContext } from '@/context/PostsContext'

type FieldValues = {
  title: string
  file: FileList
  isPublic: boolean
}

export default function ModalCreatePost() {
  const { handleSubmit, register, watch, setValue, resetField } =
    useForm<FieldValues>()

  const { isOpen, toggleOpen, elementRef } = useContext(ModalCreateContext)
  const { posts, setPosts } = useContext(PostsContext)

  const isPublic = watch('isPublic')
  const selectedFile = watch('file') ? watch('file') : []

  if (selectedFile.length > 0) {
    setValue('title', selectedFile[0].name)
  }

  const [preview, resetPreview] = useFilePreview(selectedFile)

  const onSubmit: SubmitHandler<FieldValues> = async ({
    title,
    file,
    isPublic,
  }) => {
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
        isPublic,
        type: preview.type,
      }

      console.log(data)

      const response = await createPostRequest(data)

      if (response.status !== 201) {
        throw new Error('Erro ao criar postagem')
      }

      toggleOpen()
      handleCloseModal()
      setPosts((prev) => [response.data, ...prev] as any)
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
    resetField('isPublic')
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
        ref={elementRef}
        className={`fixed left-0 top-0 z-10 h-full w-full transition-all ${overlayClass}`}
      >
        <div className="h-full w-full bg-slate-50/10">
          <div className="mx-auto flex h-full max-w-md items-center px-4">
            <div
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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ispublic"
                    {...register('isPublic')}
                    hidden
                  />
                  <label
                    htmlFor="ispublic"
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-neutral-700"
                  >
                    {isPublic ? <IoCheckmarkSharp /> : null}
                  </label>

                  <h3 className="ml-2 text-neutral-400">
                    A publicação está{' '}
                    <span className="text-indigo-500">
                      {isPublic ? 'Pública' : 'Privada'}
                    </span>
                  </h3>
                </div>

                <label
                  htmlFor="file"
                  className="flex h-56 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-500 transition-colors hover:bg-neutral-700/60"
                >
                  {preview.url ? (
                    preview.type.includes('image') ? (
                      <Image
                        width={544}
                        height={256}
                        src={preview.url}
                        alt=""
                        className="h-full max-h-[600px] w-full rounded-lg object-contain"
                      />
                    ) : (
                      <video
                        src={preview.url}
                        className="h-full w-full rounded-lg object-contain"
                        controls
                      />
                    )
                  ) : (
                    <IoImageOutline className="text-4xl" />
                  )}
                </label>

                <input type="file" id="file" {...register('file')} hidden />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCloseModal()}
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
