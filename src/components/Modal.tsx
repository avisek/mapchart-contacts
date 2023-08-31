import React, { useState, useEffect, useRef } from 'react'

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
        <button className="btn btn-ghost btn-square" onClick={handleCloseModal}>
          X
        </button>
      )}
      {children}
    </dialog>
  )
}

export default Modal
