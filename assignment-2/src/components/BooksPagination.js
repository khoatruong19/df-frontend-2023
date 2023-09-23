import React from 'react';

const BooksPagination = ({ totalPages, page, setPage }) => {
  return (
    <section id="books-pagination">
      {page > 0 && (
        <div onClick={() => setPage((prev) => prev - 1)}>
          <i className="fa-solid fa-arrow-left"></i>
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
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      )}
    </section>
  );
};

export default BooksPagination;
