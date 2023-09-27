import { useEffect, useMemo, useState } from 'react'
import { saveBooksToLocalStorage } from '../utils/helpers'
import { Book } from '../utils/types'

const DEFAULT_BOOKS: Book[] = [
  {
    id: 'sdfjsdfklj',
    name: 'Book 1',
    author: 'Khoa Truong',
    topic: 'Programming',
  },
  {
    id: 'qwerqwerqwer',
    name: 'Book 2',
    author: 'Khoa Truong',
    topic: 'DevOps',
  },
]

export const BOOKS_PER_PAGE = 5

const useBooks = () => {
  const [searchBooksKey, setSearchBooksKey] = useState('')
  const [books, setBooks] = useState<Book[]>(() => {
    const storedBooks = localStorage.getItem('books')
    if (storedBooks) return JSON.parse(storedBooks)
    return DEFAULT_BOOKS
  })
  const [page, setPage] = useState(0)

  const searchedBooks = useMemo(() => {
    if (searchBooksKey.length === 0) return [...books]

    return [...books].filter(
      (book) =>
        book.name.toLowerCase().includes(searchBooksKey.toLowerCase()) ||
        book.author.toLowerCase().includes(searchBooksKey.toLowerCase()),
    )
  }, [books, searchBooksKey])

  const totalPages = Math.ceil(searchedBooks.length / BOOKS_PER_PAGE)
  const filteredBooks = [...searchedBooks].splice(
    page * BOOKS_PER_PAGE,
    BOOKS_PER_PAGE,
  )

  const handleDeleteBook = (id: string) => {
    const existingBookIndex = books.findIndex((item) => item.id === id)
    if (existingBookIndex < 0) return

    const tempBooks: Book[] = [...books]
    tempBooks.splice(existingBookIndex, 1)
    setBooks(tempBooks)
    saveBooksToLocalStorage(tempBooks)
  }

  useEffect(() => {
    if (page !== 0) setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  return {
    books,
    setBooks,
    searchBooksKey,
    setSearchBooksKey,
    filteredBooks,
    handleDeleteBook,
    totalPages,
    page,
    setPage,
  }
}

export default useBooks
