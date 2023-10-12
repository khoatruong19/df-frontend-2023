/* eslint-disable import/no-cycle */

'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
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
import { BOOKS_PER_PAGE } from '../utils/constants'

type BooksContextValues = {
  books: Book[]
  isLoading: boolean
  page: number
  totalPages: number
  searchBooksKey: string
} & ReturnType<typeof useBooks>

const defaultBooksContextValues: BooksContextValues = {
  books: [],
  isLoading: false,
  searchBooksKey: '',
  page: 0,
  totalPages: 1,
  handleAddBook: async () => {},
  handleDeleteBook: async () => {},
  handleUpdateBook: async () => {},
  handleNextPage: () => {},
  handleBackPage: () => {},
  handleSelectPage: () => {},
  handleChangeSearchValue: () => {},
}

const BooksContext = createContext(defaultBooksContextValues)

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [searchBooksKey, setSearchBooksKey] = useState('')
  const [page, setPage] = useState(1)

  const {
    data: booksResponse,
    mutate,
    isLoading,
  } = useSWR(['getAllBooks', page, searchBooksKey], async () => {
    const { data } = await booksService.getAll({
      page,
      query: searchBooksKey,
    })
    return data
  })

  const totalPages = booksResponse?.metadata.totalPages ?? 1

  const booksUtils = useBooks({
    mutate,
    page,
    setPage,
    totalPages,
    setSearchBooksKey,
  })

  const value: BooksContextValues = useMemo(
    () => ({
      books: booksResponse?.data ?? [],
      page,
      totalPages,
      isLoading,
      searchBooksKey,
      ...booksUtils,
    }),
    [searchBooksKey, booksResponse, booksUtils, isLoading, totalPages, page],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}
const useBooksContext = () => useContext(BooksContext)

export { useBooksContext }
export default BooksProvider
