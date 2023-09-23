import React, { useEffect, useRef } from 'react';
import BookRow from './BookRow';

const BooksTable = ({ books = [], deleteBook: deleteBookById }) => {
  const endBookRowRef = useRef(null);

  useEffect(() => {
    if (!endBookRowRef || !endBookRowRef.current) return;
    endBookRowRef.current.scrollIntoView();
  }, [books]);

  return (
    <section id="books">
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
                order={index + 1}
              />
            ))}
        </tbody>
        <div ref={endBookRowRef} className="end-book-row"></div>
      </table>
      {books.length === 0 && (
        <h1 className="no-books-message">No books found!</h1>
      )}
    </section>
  );
};

export default BooksTable;
