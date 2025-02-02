/* eslint-disable import/no-cycle */

'use client'

import { useSearchParams } from 'next/navigation'
import { ReactNode, createContext, useContext, useMemo } from 'react'
import useBooks from '../hooks/useBooks'
import { useAuthContext } from './AuthProvider'
import { BOOKS_PER_PAGE } from '../utils/constants'
import { useGetBooks } from '../generated/book/book'
import { Book } from '../generated/model'

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
  const params = useSearchParams()
  const page = params.get('page') ? Number(params.get('page')) : 1
  const searchBooksKey = params.get('key') ?? ''

  const { isLogin } = useAuthContext()

  const {
    data: booksResponse,
    mutate,
    isLoading,
  } = useGetBooks(
    {
      page,
      query: searchBooksKey,
      pageSize: BOOKS_PER_PAGE,
    },
    { swr: { enabled: isLogin } },
  )

  const totalPages = booksResponse?.metadata?.totalPages ?? 1

  const booksUtils = useBooks({
    mutate,
    isLoading,
    page,
    searchBooksKey,
    totalPages,
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
