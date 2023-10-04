import React from 'react'
import useBooks from '../hooks/useBooks'
import BooksTable from './BooksTable'
import BooksPagination from './BooksPagination'
import BooksActions from './BooksActions'

const BooksSection = () => {
  const {
    books,
    setBooks,
    searchBooksKey,
    setSearchBooksKey,
    filteredBooks,
    handleDeleteBook,
    totalPages,
    page,
    setPage,
  } = useBooks()
  return (
    <>
      <BooksActions
        searchBooksKey={searchBooksKey}
        setSearchBooksKey={setSearchBooksKey}
        books={books}
        setBooks={setBooks}
      />
      <BooksTable
        deleteBook={handleDeleteBook}
        books={filteredBooks}
        page={page}
      />
      <BooksPagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  )
}

export default BooksSection
