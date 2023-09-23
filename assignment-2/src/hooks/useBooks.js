import { useMemo, useState } from 'react';
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

const useBooks = () => {
  const [searchBooksKey, setSearchBooksKey] = useState('');
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) return JSON.parse(storedBooks);
    return DEFAULT_BOOKS;
  });

  const searchedBooks = useMemo(() => {
    return [...books].filter(
      (book) =>
        book.name.toLowerCase().includes(searchBooksKey) ||
        book.author.toLowerCase().includes(searchBooksKey)
    );
  }, [books, searchBooksKey]);

  const handleDeleteBook = (id) => {
    const existingBookIndex = books.findIndex((item) => item.id === id);
    if (existingBookIndex < 0) return;

    let tempBooks = [...books];
    tempBooks.splice(existingBookIndex, 1);
    setBooks(tempBooks);
    saveBooksToLocalStorage(tempBooks);
  };

  return {
    books,
    setBooks,
    searchBooksKey,
    setSearchBooksKey,
    searchedBooks,
    handleDeleteBook,
  };
};

export default useBooks;
