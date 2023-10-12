import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {} from 'next/router'
import { KeyedMutator } from 'swr'
import { uuid } from 'uuidv4'
import {
  debounce,
  saveBooksToLocalStorage,
  validatePageParam,
} from '../utils/helpers'
import {
  Book,
  BooksMetadata,
  CreateBookInput,
  GetBookResponse,
  NewBook,
  UpdateBookInput,
} from '../utils/types'
import { BOOKS_PER_PAGE } from '../utils/constants'
import { useAuthContext } from '../providers/AuthProvider'
import booksService from '../services/books'

type UseBooksProps = {
  // searchBooksKey: string
  // books: Book[]
  // setBooks: Dispatch<SetStateAction<Book[]>>
  // page: number
  // setPage: Dispatch<SetStateAction<number>>
  mutate: KeyedMutator<{
    data: Book[]
    metadata: BooksMetadata
  }>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  totalPages: number
  setSearchBooksKey: Dispatch<SetStateAction<string>>
}

const useBooks = (props: UseBooksProps) => {
  const { mutate, page, setPage, totalPages, setSearchBooksKey } = props

  // const { isLogin } = useAuthContext()
  // const pathname = usePathname()
  // const router = useRouter()
  // const params = useSearchParams()
  // const searchKeyParam = params.get('key')
  // const pageParam = params.get('page')

  // const searchedBooks = useMemo(() => {
  //   if (searchBooksKey.length === 0) return [...books]

  //   return [...books].filter(
  //     (book) =>
  //       book.name.toLowerCase().includes(searchBooksKey.trim().toLowerCase()) ||
  //       book.author.toLowerCase().includes(searchBooksKey.trim().toLowerCase()),
  //   )
  // }, [books, searchBooksKey])

  // const totalPages = Math.ceil(searchedBooks.length / BOOKS_PER_PAGE)
  // const filteredBooks = [...searchedBooks].splice(
  //   page * BOOKS_PER_PAGE,
  //   BOOKS_PER_PAGE,
  // )

  const handleNextPage = () => {
    if (page >= totalPages) return
    setPage(page + 1)
  }

  const handleBackPage = () => {
    if (page <= 1) return
    setPage(page - 1)
  }

  const handleSelectPage = (selectedPage: number) => {
    setPage(selectedPage)
  }

  const handleChangeSearchValue = (value: string) => setSearchBooksKey(value)

  const handleAddBook = async (value: CreateBookInput) => {
    try {
      await booksService.create(value)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateBook = async (value: UpdateBookInput) => {
    try {
      await booksService.update(value)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBook = async (id: number) => {
    try {
      await booksService.delete(id)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  // const syncFilterParamsWithUrl = () => {
  //   if (!isLogin) return
  //   const filterParams = new URLSearchParams({
  //     key: searchBooksKey.trim(),
  //     page: `${page + 1}`,
  //   }).toString()
  //   router.push(`?${filterParams}`)
  // }

  // const debounceSyncFilterParams = useCallback(
  //   debounce(syncFilterParamsWithUrl, 500),
  //   [searchBooksKey, page],
  // )

  // useEffect(() => {
  //   const formatPageParam = validatePageParam(pageParam ?? '', totalPages)
  //   if (totalPages === 0 || (page !== 0 && formatPageParam !== page)) setPage(0)
  // }, [totalPages])

  // useEffect(() => {
  //   debounceSyncFilterParams()
  // }, [searchBooksKey, page])

  // useEffect(() => {
  //   if (searchKeyParam) setSearchBooksKey(searchKeyParam)

  //   if (!pageParam) return

  //   const formatPageParam = validatePageParam(pageParam, totalPages)
  //   setPage(formatPageParam - 1)
  // }, [])

  return {
    // filteredBooks,
    // totalPages,
    // page,
    // setPage,
    // handleGetBookById,
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    handleNextPage,
    handleBackPage,
    handleSelectPage,
    handleChangeSearchValue,
  }
}

export default useBooks