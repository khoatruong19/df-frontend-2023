import React from 'react'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'

type BooksPaginationProps = {
  totalPages: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const BooksPagination = ({
  totalPages,
  page,
  setPage,
}: BooksPaginationProps) => {
  return (
    <section
      id="books-pagination"
      className="flex items-center justify-center gap-2 max-w-[300px] mx-auto mt-4"
    >
      {page > 0 && (
        <button
          className="bg-transparent hover:text-secondary"
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowLeftCircle size={30} />
        </button>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((item, idx) => (
        <button
          onClick={() => setPage(idx)}
          key={item}
          className={`${idx === page ? 'selected' : ''} page-button`}
        >
          {item}
        </button>
      ))}
      {page < totalPages - 1 && (
        <button
          className="bg-transparent hover:text-secondary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ArrowRightCircle size={30} />
        </button>
      )}
    </section>
  )
}

export default BooksPagination
