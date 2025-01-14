import React from 'react'
import BookRow from './BookRow'
import { useBooksContext } from '../providers/BooksProvider'
import { BOOKS_PER_PAGE } from '../utils/constants'

const BooksTable = () => {
  const { filteredBooks, page, handleDeleteBook } = useBooksContext()

  return (
    <section id="books-table" className="mt-20 min-h-[370px] overflow-x-auto">
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
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <BookRow
                deleteBook={() => handleDeleteBook(book.id)}
                key={book.id}
                {...book}
                order={index + page * BOOKS_PER_PAGE + 1}
              />
            ))}
        </tbody>
      </table>
      {filteredBooks.length === 0 && (
        <h1 className="text-center text-2xl mt-10 text-secondary">
          No books found!
        </h1>
      )}
    </section>
  )
}

export default BooksTable
