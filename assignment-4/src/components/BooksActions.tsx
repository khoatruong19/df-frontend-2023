import React from 'react'
import { Book } from '../utils/types'
import { MODALS, useModalContext } from '../providers/ModalProvider'
import SearchBookInput from './SearchBooksInput'

type BooksActionsProps = {
  searchBooksKey: string
  setSearchBooksKey: React.Dispatch<React.SetStateAction<string>>
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

const BooksActions = (props: BooksActionsProps) => {
  const { searchBooksKey, setSearchBooksKey, books, setBooks } = props

  const { showModal } = useModalContext()

  const handleOpenAddBookModal = () => {
    showModal(MODALS.ADD_BOOK, { books, setBooks })
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
