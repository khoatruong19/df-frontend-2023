/* eslint-disable import/no-cycle */
import React from 'react'
import { useModalContext } from '../../providers/ModalProvider'

type DeleteBookConfirmationProps = {
  bookName: string
  deleteBook: () => void
}

const DeleteBookConfirmation = ({
  bookName,
  deleteBook,
}: DeleteBookConfirmationProps) => {
  const { closeModal } = useModalContext()

  const handleConfirmDelete = () => {
    deleteBook()
    closeModal()
  }

  return (
    <div className="flex flex-col justify-between text-black min-h-[200px]">
      <h2 className="text-xl font-semibold mb-3">Delete book</h2>
      <p className="max-w-[90%] mx-auto text-center">
        Do you want to delete <span className="font-bold">{bookName}</span>{' '}
        book?
      </p>
      <div className="flex items-center gap-2 mt-4 justify-end font-semibold">
        <button className="hover-opacity-desc px-3 py-2" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="hover-opacity-desc px-4 py-2 rounded-md text-white font-semibold bg-secondary"
          onClick={handleConfirmDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteBookConfirmation
