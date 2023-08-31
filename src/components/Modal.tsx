import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'react-daisyui'

export interface ModalProps {
  isOpen: boolean
  hasCloseBtn?: boolean
  onClose?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen)
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const handleCloseModal = () => {
    onClose && onClose()
    setModalOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      handleCloseModal()
    }
  }

  useEffect(() => {
    setModalOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    const modalElement = modalRef.current

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal()
      } else {
        modalElement.close()
      }
    }
  }, [isModalOpen])

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="bg-base-100 text-base-content p-6 rounded-xl shadow-2xl">
      {hasCloseBtn && (
        <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2" onClick={handleCloseModal}>
          x
        </Button>
      )}
      {children}
    </dialog>
  )
}

export default Modal
