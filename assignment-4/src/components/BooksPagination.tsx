import React from 'react'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { useBooksContext } from '../providers/BooksProvider'

const BooksPagination = () => {
  const { totalPages, page, setPage } = useBooksContext()

  return (
    <section
      id="books-pagination"
      className="flex items-center justify-center gap-2 max-w-[300px] mx-auto mt-4"
    >
      <button
        className={`${
          page > 0 ? 'opacity-100' : 'opacity-0 cursor-default'
        } bg-transparent hover:text-secondary`}
        onClick={() => setPage((prev) => prev - 1)}
        disabled={!(page > 0)}
      >
        <ArrowLeftCircle size={30} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((item, idx) => (
        <button
          onClick={() => setPage(idx)}
          key={item}
          className={`${idx === page ? 'selected' : ''} page-button`}
        >
          {item}
        </button>
      ))}
      <button
        className={`${
          page < totalPages - 1 ? 'opacity-100' : 'opacity-0 cursor-default'
        } bg-transparent hover:text-secondary`}
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!(page < totalPages - 1)}
      >
        <ArrowRightCircle size={30} />
      </button>
    </section>
  )
}

export default BooksPagination
