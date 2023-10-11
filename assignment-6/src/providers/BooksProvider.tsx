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
import useSWR from 'swr'
import useBooks from '../hooks/useBooks'
import {
  Book,
  CreateBookInput,
  GetBookResponse,
  UpdateBookInput,
} from '../utils/types'
import booksService from '../services/books'

type BooksContextValues = {
  books: Book[]
  isLoading: boolean
  page: number
  searchBooksKey: string
  setSearchBooksKey: Dispatch<SetStateAction<string>>
} & ReturnType<typeof useBooks>

const defaultBooksContextValues: BooksContextValues = {
  books: [],
  isLoading: false,
  searchBooksKey: '',
  setSearchBooksKey: () => {},
  page: 0,
  // handleGetBookById: () => ({}) as GetBookResponse,
  handleAddBook: async () => {},
  handleDeleteBook: async () => {},
  handleUpdateBook: async () => {},
  // page: 0,
  // setPage: () => {},
  // totalPages: 1,
}

const BooksContext = createContext(defaultBooksContextValues)

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [searchBooksKey, setSearchBooksKey] = useState('')
  const {
    data: books,
    mutate,
    isLoading,
  } = useSWR('getAllBooks', async () => {
    const { data } = await booksService.getAll()
    return data.data
  })

  const [page, setPage] = useState(0)

  const booksUtils = useBooks({
    mutate,
  })

  const value: BooksContextValues = useMemo(
    () => ({
      books: books ?? [],
      isLoading,
      searchBooksKey,
      setSearchBooksKey,
      page,
      ...booksUtils,
    }),
    [searchBooksKey, books],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}
const useBooksContext = () => useContext(BooksContext)

export { useBooksContext }
export default BooksProvider
