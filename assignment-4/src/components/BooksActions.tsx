import React from 'react'
import { MODALS, useModalContext } from '../providers/ModalProvider'
import SearchBookInput from './SearchBooksInput'
import { useBooksContext } from '../providers/BooksProvider'

const BooksActions = () => {
  const { searchBooksKey, setSearchBooksKey } = useBooksContext()

  const { showModal } = useModalContext()

  const handleOpenAddBookModal = () => {
    showModal(MODALS.BOOK_FORM, {})
  }

  return (
    <section id="actions" className="flex gap-2 float-right items-end">
      <SearchBookInput
        searchBooksKey={searchBooksKey}
        setSearchBooksKey={setSearchBooksKey}
      />
      <button
        className="w-fit shadow-md py-2.5 md:py-3 px-4 bg-secondary rounded-md font-medium"
        onClick={handleOpenAddBookModal}
      >
        <span className="text-xl md:hidden">+</span>
        <span className="hidden md:inline">Add book</span>
      </button>
    </section>
  )
}

export default BooksActions
