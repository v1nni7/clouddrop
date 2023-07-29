import { ReactNode } from 'react'

import { useToggle } from '@/hooks'

type ModalProps = {
  children?: ReactNode
}

export default function Modal({ children }: ModalProps) {
  const [isOpen, toggleOpen, elementRef] = useToggle()

  const showModal = isOpen ? 'visible duration-500' : 'invisible duration-300'

  return (
    <div
      className={`fixed left-0 top-0 z-20 h-full w-full transition-all ${showModal}`}
    >
      <div className="h-full w-full bg-zinc-950/60">
        <div className="mx-auto flex h-full max-w-xl items-center py-9">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  )
}
