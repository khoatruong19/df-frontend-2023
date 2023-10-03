import React from 'react'
import { MODALS, useModalContext } from '../providers/ModalProvider'
import { Book } from '../utils/types'
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
    <section id="actions">
      <SearchBookInput
        searchBooksKey={searchBooksKey}
        setSearchBooksKey={setSearchBooksKey}
      />
      <button onClick={handleOpenAddBookModal}>Add book</button>
    </section>
  )
}

export default BooksActions
