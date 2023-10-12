'use client'

import React from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Trash } from 'lucide-react'
import { useBooksContext } from '../../../providers/BooksProvider'
import { MODALS, useModalContext } from '../../../providers/ModalProvider'
import { DeleteBookConfirmationProps } from '../../../components/modals/DeleteBookConfirmation'
import booksService from '../../../services/books'
import { QUERY_KEYS } from '../../../utils/constants'

type BookDetailProps = {
  params: { id: string }
}

const BookDetail = ({ params: { id } }: BookDetailProps) => {
  const { handleDeleteBook } = useBooksContext()
  const { showModal } = useModalContext()

  const {
    data: book,
    isLoading,
    error,
  } = useSWR(QUERY_KEYS.GET_BOOK_BY_ID, async () => {
    const { data } = await booksService.getById(Number(id))
    return data.data
  })

  const handleOpenDeleteConfirmationModal = () => {
    showModal<DeleteBookConfirmationProps>(MODALS.DELETE_BOOK_CONFIRMATION, {
      deleteBook: () => handleDeleteBook(book?.id ?? 0),
      bookName: book?.name ?? '',
    })
  }

  const renderNotFoundView = () => (
    <div className="px-3 flex flex-col items-center justify-center gap-4 h-full w-full mx-auto text-mainTextColor">
      <h1 className="text-5xl md:text-7xl">404</h1>
      <p>No book found</p>
      <Link
        href="/"
        className="flex items-center gap-2 text-sucess hover-opacity-desc"
      >
        <ArrowLeft />
        <span>Back to home page</span>
      </Link>
    </div>
  )

  const renderBookDetailView = () => (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-danger hover-opacity-desc absolute left-5 top-24"
      >
        <ArrowLeft />
        <span>Back</span>
      </Link>
      <div className="px-3 flex flex-col items-start gap-2 w-fit mx-auto text-mainTextColor mt-10">
        <div className="flex flex-col gap-2">
          {book &&
            Object.entries({ ...book, topic: book.topic.name }).map(
              ([key, value]) => (
                <div key={key + value} className="flex items-center gap-2">
                  <h3 className="capitalize text-xl font-semibold break-all">
                    {key}:{' '}
                  </h3>
                  <span className="">{value}</span>
                </div>
              ),
            )}
        </div>
        <button
          className="hover-opacity-desc text-danger"
          onClick={handleOpenDeleteConfirmationModal}
        >
          <span className="hidden md:inline">Delete</span>
          <Trash size={15} strokeWidth={3} className="md:hidden" />
        </button>
      </div>
    </>
  )

  return (
    <main className="flex-1 py-4 px-2 md:p-6 bg-primary">
      {!isLoading && (!book || error)
        ? renderNotFoundView()
        : renderBookDetailView()}
    </main>
  )
}

export default dynamic(() => Promise.resolve(BookDetail), {
  ssr: false,
})
