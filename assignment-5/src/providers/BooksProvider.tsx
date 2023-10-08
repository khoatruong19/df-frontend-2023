/* eslint-disable import/no-cycle */

'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import useBooks from '../hooks/useBooks'
import { DEFAULT_BOOKS } from '../utils/constants'
import { Book, GetBookResponse } from '../utils/types'

type BooksContextValues = {
  books: Book[]
  searchBooksKey: string
  setSearchBooksKey: Dispatch<SetStateAction<string>>
} & ReturnType<typeof useBooks>

const defaultBooksContextValues: BooksContextValues = {
  books: [],
  searchBooksKey: '',
  setSearchBooksKey: () => {},
  filteredBooks: [],
  handleGetBookById: () => ({}) as GetBookResponse,
  handleAddBook: () => {},
  handleDeleteBook: () => {},
  handleUpdateBook: () => {},
  page: 0,
  setPage: () => {},
  totalPages: 1,
}

const BooksContext = createContext(defaultBooksContextValues)

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [searchBooksKey, setSearchBooksKey] = useState('')
  const [books, setBooks] = useState<Book[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_BOOKS
    const storedBooks = window.localStorage.getItem('books')
    if (storedBooks) {
      try {
        return JSON.parse(storedBooks) as Book[]
      } catch (error) {
        return DEFAULT_BOOKS
      }
    }
    return DEFAULT_BOOKS
  })
  const [page, setPage] = useState(0)

  const booksUtils = useBooks({
    books,
    page,
    searchBooksKey,
    setBooks,
    setPage,
    setSearchBooksKey,
  })

  const value: BooksContextValues = useMemo(
    () => ({
      books,
      searchBooksKey,
      setSearchBooksKey,
      ...booksUtils,
    }),
    [searchBooksKey, books, booksUtils],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}
const useBooksContext = () => useContext(BooksContext)

export { useBooksContext }
export default BooksProvider
