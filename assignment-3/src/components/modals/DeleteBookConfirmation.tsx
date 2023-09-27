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
    <div className="delete-book-confirmation">
      <h2>Delete book</h2>
      <p className="confirmation-content">
        Do you want to delete <span id="delete-book-name">{bookName}</span>{' '}
        book?
      </p>
      <div className="confirmation-actions">
        <button className="delete" onClick={handleConfirmDelete}>
          Delete
        </button>
        <button className="cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteBookConfirmation
