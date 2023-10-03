import React from 'react'
import { Book } from '../utils/types'
import { MODALS, useModalContext } from '../providers/ModalProvider'

type BookRowProps = Book & {
  order: number
  deleteBook: () => void
}

const BookRow = (props: BookRowProps) => {
  const { order, name, author, topic, deleteBook } = props

  const { showModal } = useModalContext()

  const handleOpenDeleteConfirmationModal = () => {
    showModal(MODALS.DELETE_BOOK_CONFIRMATION, {
      deleteBook,
      bookName: name,
    })
  }

  return (
    <tr>
      <td>{order}</td>
      <td className="book-name">{name}</td>
      <td className="book-author">{author}</td>
      <td>{topic}</td>
      <td className="book-actions" onClick={handleOpenDeleteConfirmationModal}>
        Delete
      </td>
    </tr>
  )
}

export default BookRow
