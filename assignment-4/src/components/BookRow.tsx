import React from 'react'
import { Pencil, Trash } from 'lucide-react'
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
    <tr className="font-medium text-black">
      <td>{order}</td>
      <td className="book-name-col">{name}</td>
      <td className="book-author-col">{author}</td>
      <td>{topic}</td>
      <td className="font-bold">
        <div className="flex justify-center md:justify-start items-center gap-2 md:gap-3 text-sucess">
          <button
            className="hover-opacity-desc"
            onClick={handleOpenDeleteConfirmationModal}
          >
            <span className="hidden md:inline">Edit</span>
            <Pencil size={15} strokeWidth={3} className="md:hidden" />
          </button>
          <button
            className="hover-opacity-desc text-danger"
            onClick={handleOpenDeleteConfirmationModal}
          >
            <span className="hidden md:inline">Delete</span>
            <Trash size={15} strokeWidth={3} className="md:hidden" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BookRow
