import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {} from 'next/router'
import {
  debounce,
  saveBooksToLocalStorage,
  validatePageParam,
} from '../utils/helpers'
import { Book, GetBookResponse, NewBook } from '../utils/types'
import { BOOKS_PER_PAGE } from '../utils/constants'

type UseBooksProps = {
  searchBooksKey: string
  setSearchBooksKey: Dispatch<SetStateAction<string>>
  books: Book[]
  setBooks: Dispatch<SetStateAction<Book[]>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const useBooks = (props: UseBooksProps) => {
  const { books, page, searchBooksKey, setSearchBooksKey, setBooks, setPage } =
    props

  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()
  const searchKeyParam = params.get('key')
  const pageParam = params.get('page')

  const searchedBooks = useMemo(() => {
    if (searchBooksKey.length === 0) return [...books]

    return [...books].filter(
      (book) =>
        book.name.toLowerCase().includes(searchBooksKey.trim().toLowerCase()) ||
        book.author.toLowerCase().includes(searchBooksKey.trim().toLowerCase()),
    )
  }, [books, searchBooksKey])

  const totalPages = Math.ceil(searchedBooks.length / BOOKS_PER_PAGE)
  const filteredBooks = [...searchedBooks].splice(
    page * BOOKS_PER_PAGE,
    BOOKS_PER_PAGE,
  )

  const handleGetBookById = (id: string): GetBookResponse => {
    const exisitingBook = books.find((book) => book.id === id)

    if (!exisitingBook)
      return {
        success: false,
        message: 'No book found',
      }

    return {
      success: true,
      message: 'Book found!',
      book: exisitingBook,
    }
  }

  const handleAddBook = (data: NewBook) => {
    const existingBook = books.find(
      ({ id, ...rest }) => JSON.stringify(data) === JSON.stringify(rest),
    )
    if (existingBook) return alert('This book is existing')
    const newBook = {
      id:
        data.author.trim() +
        data.name.trim() +
        new Date().toLocaleDateString().replaceAll('/', '-'),
      ...data,
    }
    const tempBooks = [...books, newBook]

    setBooks(tempBooks)
    saveBooksToLocalStorage(tempBooks)
  }

  const handleUpdateBook = (data: Book) => {
    const updateBook = books.find(({ id }) => data.id === id)

    if (!updateBook) return alert('Not found!')

    if (JSON.stringify(data) === JSON.stringify(updateBook)) return

    const existingBook = books.find(
      ({ id, ...rest }) => JSON.stringify(data) === JSON.stringify(rest),
    )
    if (existingBook)
      return alert('These information is same as one other book!')

    const tempBooks = [...books].map((book) => {
      if (book.id !== updateBook.id) return book
      return data
    })

    setBooks(tempBooks)
    saveBooksToLocalStorage(tempBooks)
  }

  const handleDeleteBook = (id: string) => {
    const existingBookIndex = books.findIndex((item) => item.id === id)
    if (existingBookIndex < 0) return

    const tempBooks: Book[] = [...books]
    tempBooks.splice(existingBookIndex, 1)
    setBooks(tempBooks)
    saveBooksToLocalStorage(tempBooks)

    if (pathname !== '/') {
      router.push('/')
    }
  }

  const syncFilterParamsWithUrl = () => {
    const filterParams = new URLSearchParams({
      key: searchBooksKey.trim(),
      page: `${page + 1}`,
    }).toString()
    router.push(`?${filterParams}`)
  }

  const debounceSyncFilterParams = useCallback(
    debounce(syncFilterParamsWithUrl, 500),
    [searchBooksKey, page],
  )

  useEffect(() => {
    const formatPageParam = validatePageParam(pageParam ?? '', totalPages)
    if (totalPages === 0 || (page !== 0 && formatPageParam !== page)) setPage(0)
  }, [totalPages])

  useEffect(() => {
    debounceSyncFilterParams()
  }, [searchBooksKey, page])

  useEffect(() => {
    if (searchKeyParam) setSearchBooksKey(searchKeyParam)

    if (!pageParam) return

    const formatPageParam = validatePageParam(pageParam, totalPages)
    setPage(formatPageParam - 1)
  }, [])

  return {
    filteredBooks,
    totalPages,
    page,
    setPage,
    handleGetBookById,
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
  }
}

export default useBooks
