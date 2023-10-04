import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { saveBooksToLocalStorage } from '../utils/helpers'
import { Book, NewBook } from '../utils/types'
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
  const { books, page, searchBooksKey, setBooks, setPage } = props
  console.log({ searchBooksKey })

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

  const handleAddBook = (data: NewBook) => {
    const existingBook = books.find(
      ({ id, ...rest }) => JSON.stringify(data) === JSON.stringify(rest),
    )
    if (existingBook) return alert('This book is existing')
    const newBook = {
      id: data.author + data.name + new Date().getTime().toLocaleString(),
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

  useEffect(() => {
    if (page !== 0) setPage(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages])

  return {
    filteredBooks,
    handleDeleteBook,
    totalPages,
    page,
    setPage,
    handleAddBook,
    handleUpdateBook,
  }
}

export default useBooks
