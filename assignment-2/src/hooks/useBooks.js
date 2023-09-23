import { useEffect, useMemo, useState } from 'react';
import { saveBooksToLocalStorage } from '../utils/helpers';

const DEFAULT_BOOKS = [
  {
    id: 'sdfjsdfklj',
    name: 'Book 1',
    author: 'Khoa Truong',
    topic: 'Programming',
  },
  {
    id: 'qwerqwerqwer',
    name: 'Book 2',
    author: 'Khoa Truong',
    topic: 'DevOps',
  },
];

export const BOOKS_PER_PAGE = 5;

const useBooks = () => {
  const [searchBooksKey, setSearchBooksKey] = useState('');
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) return JSON.parse(storedBooks);
    return DEFAULT_BOOKS;
  });
  const [page, setPage] = useState(0);

  const searchedBooks = useMemo(() => {
    if (!!!searchBooksKey.length) return [...books];
    console.log('memo');

    return [...books].filter(
      (book) =>
        book.name.toLowerCase().includes(searchBooksKey) ||
        book.author.toLowerCase().includes(searchBooksKey)
    );
  }, [books, searchBooksKey]);

  const totalPages = Math.ceil(searchedBooks.length / BOOKS_PER_PAGE);
  const filteredBooks = [...searchedBooks].splice(
    page * BOOKS_PER_PAGE,
    BOOKS_PER_PAGE
  );

  const handleDeleteBook = (id) => {
    const existingBookIndex = books.findIndex((item) => item.id === id);
    if (existingBookIndex < 0) return;

    let tempBooks = [...books];
    tempBooks.splice(existingBookIndex, 1);
    setBooks(tempBooks);
    saveBooksToLocalStorage(tempBooks);
  };

  useEffect(() => {
    if (page !== 0) setPage(0);
  }, [totalPages]);
  console.log({
    books,
    searchedBooks,
    filteredBooks,
    totalPages,
    storedBooks: JSON.parse(localStorage.getItem('books')),
  });
  return {
    books,
    setBooks,
    searchBooksKey,
    setSearchBooksKey,
    filteredBooks,
    handleDeleteBook,
    totalPages,
    page,
    setPage,
  };
};

export default useBooks;
