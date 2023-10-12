'use client'

import { MODALS, useModalContext } from '../providers/ModalProvider'
import SearchBookInput from './SearchBooksInput'

const BooksActions = () => {
  const { showModal } = useModalContext()

  const handleOpenAddBookModal = () => {
    showModal(MODALS.BOOK_FORM, {})
  }

  return (
    <section id="actions" className="flex gap-2 float-right items-end">
      <SearchBookInput />
      <button
        className="hover-opacity-desc w-fit shadow-md py-2.5 md:py-3 px-4 bg-secondary rounded-md font-semibold"
        onClick={handleOpenAddBookModal}
      >
        <span className="text-xl md:hidden">+</span>
        <span className="hidden md:inline">Add book</span>
      </button>
    </section>
  )
}

export default BooksActions
