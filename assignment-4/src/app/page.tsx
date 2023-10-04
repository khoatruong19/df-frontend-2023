'use client'

import React from 'react'
import BooksActions from '../components/BooksActions'
import useBooks from '../hooks/useBooks'

export default function Home() {
  const { books, setSearchBooksKey, setBooks, searchBooksKey } = useBooks()

  return (
    <main className="min-h-screen py-4 px-2 md:p-6 bg-primary">
      <BooksActions
        books={books}
        searchBooksKey={searchBooksKey}
        setBooks={setBooks}
        setSearchBooksKey={setSearchBooksKey}
      />
    </main>
  )
}
