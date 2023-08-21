'use client'

import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ReactElement, Ref, forwardRef, useEffect, useState } from 'react'
import { TransitionProps } from '@mui/material/transitions'

import AddIcon from '@mui/icons-material/Add'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

import Slide from '@mui/material/Slide'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  InputLabelProps,
  SxProps,
  TextField,
  Theme,
  checkboxClasses,
} from '@mui/material'

import { useFilePreview } from '@/hooks'
import { IoMenuOutline } from 'react-icons/io5'

type FieldValues = {
  file: Blob[]
  title: string
  isPublic: boolean
}

export default function ModalOpenButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { handleSubmit, register, watch, setValue } = useForm<FieldValues>()

  const selectedFile = watch('file') ? watch('file') : []

  const [preview] = useFilePreview(selectedFile)

  const handleClickOpen = () => {
    setOpen(true)
    router.push('/uploads')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      console.log(data)
    } catch (error) {}
  }

  const labelIsOpen = !!watch('title')

  useEffect(() => {
    if (selectedFile.length > 0) {
      setValue('title', selectedFile[0].name)
    }
  }, [selectedFile, setValue])

  return (
    <>
      <div>
        <Fab
          sx={{
            color: '#fff',
            backgroundColor: '#6366f1',

            [`&:hover`]: {
              backgroundColor: '#4f46e5',
            },
          }}
          onClick={handleClickOpen}
          className="-translate-y-5 rounded-full bg-indigo-500 p-4 text-white shadow transition-colors hover:bg-indigo-600"
        >
          <AddIcon className="text-2xl" />
        </Fab>

        <Dialog
          open={true}
          fullWidth
          maxWidth="lg"
          onClose={handleClose}
          PaperComponent={PaperDialog}
          TransitionComponent={Transition}
        >
          <DialogTitle>Criar postagem</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="-ml-3">
                <Checkbox id="ispublic" />

                <label htmlFor="ispublic" className="align-middle">
                  Tornar postagem pública
                </label>
              </div>

              <div className="relative col-span-2 flex items-center sm:col-span-1">
                <IoMenuOutline className="absolute left-2 text-3xl text-neutral-500" />
                <input
                  type="text"
                  placeholder="Título"
                  {...register('title')}
                  className="w-full rounded-lg border border-neutral-600 bg-transparent py-4 pl-10 text-lg font-semibold text-neutral-500 outline-none transition-colors placeholder:font-semibold placeholder:text-neutral-500 focus:border-neutral-500"
                />
              </div>
              <DialogActions>
                <Button className="text-indigo-500">Enviar</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />
})

const PaperDialog = forwardRef(function PaperDialog(props: any, ref: Ref<any>) {
  return (
    <div
      ref={ref}
      {...props}
      className="mx-4 w-full max-w-sm rounded-lg bg-neutral-800 shadow-lg md:max-w-md"
    />
  )
})
