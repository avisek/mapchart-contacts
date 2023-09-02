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
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="bg-base-100 text-base-content p-6 rounded-2xl shadow-2xl select-none">
      {hasCloseBtn && (
        <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2" onClick={handleCloseModal}>
          <svg  className="w-6 h-6"viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      )}
      {children}
    </dialog>
  )
}

export default Modal
