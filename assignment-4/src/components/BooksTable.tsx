import React from 'react'
import { BOOKS_PER_PAGE } from '../hooks/useBooks'
import BookRow from './BookRow'
import { Book } from '../utils/types'

type BooksTableProps = {
  books: Book[]
  page: number
  deleteBook: (bookId: string) => void
}

const BooksTable = ({
  books = [],
  page,
  deleteBook: deleteBookById,
}: BooksTableProps) => {
  return (
    <section id="books-table" className="mt-20 min-h-[200px] overflow-x-auto">
      <table className="w-full border-2">
        <thead>
          <tr className="text-left">
            <th className="">#</th>
            <th className="book-name-col">Name</th>
            <th className="book-author-col">Author</th>
            <th className="w-[20%]">Topic</th>
            <th className="w-[15%]">Action</th>
          </tr>
        </thead>
        <tbody id="books-table-body">
          {books.length > 0 &&
            books.map((book, index) => (
              <BookRow
                deleteBook={() => deleteBookById(book.id)}
                key={book.id}
                {...book}
                order={index + page * BOOKS_PER_PAGE + 1}
              />
            ))}
        </tbody>
      </table>
      {books.length === 0 && (
        <h1 className="no-books-message">No books found!</h1>
      )}
    </section>
  )
}

export default BooksTable
