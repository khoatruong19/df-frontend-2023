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
    <section id="books-table">
      <table>
        <thead>
          <tr>
            <th className="book-id">#</th>
            <th className="book-name">Name</th>
            <th className="book-author">Author</th>
            <th className="book-topic">Topic</th>
            <th className="book-actions">Action</th>
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
