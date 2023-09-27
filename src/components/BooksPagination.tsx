/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'

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
    <section id="books-pagination">
      {page > 0 && (
        <div onClick={() => setPage((prev) => prev - 1)}>
          <i className="fa-solid fa-arrow-left" />
        </div>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((item, idx) => (
        <div
          onClick={() => setPage(idx)}
          key={item}
          className={idx === page ? 'page-selected' : ''}
        >
          {item}
        </div>
      ))}
      {page < totalPages - 1 && (
        <div onClick={() => setPage((prev) => prev + 1)}>
          <i className="fa-solid fa-arrow-right" />
        </div>
      )}
    </section>
  )
}

export default BooksPagination
