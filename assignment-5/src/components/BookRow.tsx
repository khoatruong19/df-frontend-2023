import React from 'react'
import { BookOpen, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Book } from '../utils/types'
import { MODALS, useModalContext } from '../providers/ModalProvider'
import { DeleteBookConfirmationProps } from './modals/DeleteBookConfirmation'
import { BookFormProps } from './modals/BookForm'

type BookRowProps = Book & {
  order: number
  deleteBook: () => void
}

const BookRow = (props: BookRowProps) => {
  const { id, order, name, author, topic, deleteBook } = props

  const { showModal } = useModalContext()
  const router = useRouter()

  const handleOpenEditBookModal = () => {
    showModal<BookFormProps>(MODALS.BOOK_FORM, {
      updateBookData: {
        id,
        name,
        author,
        topic,
      },
    })
  }

  const handleOpenDeleteConfirmationModal = () => {
    showModal<DeleteBookConfirmationProps>(MODALS.DELETE_BOOK_CONFIRMATION, {
      deleteBook,
      bookName: name,
    })
  }

  const handleNavigateToBookDetailPage = () => {
    router.push(`book/${id}`)
  }

  return (
    <tr className="font-medium text-mainTextColor">
      <td>{order}</td>
      <td className="book-name-col">{name}</td>
      <td className="book-author-col">{author}</td>
      <td>{topic}</td>
      <td className="font-bold">
        <div className="flex justify-center md:justify-start items-center gap-2 md:gap-3">
          <button
            className="hover-opacity-desc text-[#6499E9]"
            onClick={handleNavigateToBookDetailPage}
          >
            <span className="hidden md:inline">View</span>
            <BookOpen size={15} strokeWidth={3} className="md:hidden" />
          </button>
          <button
            className="hover-opacity-desc text-sucess"
            onClick={handleOpenEditBookModal}
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
