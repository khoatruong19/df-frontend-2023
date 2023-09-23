import { useEffect, useMemo, useState } from 'react';
import BooksActions from './components/BooksActions';
import BooksTable from './components/BooksTable';
import Header from './components/Header';
import ModalProvider from './providers/ModalProvider';
import useBooks from './hooks/useBooks';

function App() {
  const {
    books,
    setBooks,
    searchBooksKey,
    setSearchBooksKey,
    searchedBooks,
    handleDeleteBook,
  } = useBooks();

  return (
    <>
      <Header />
      <ModalProvider>
        <main>
          <BooksActions
            searchBooksKey={searchBooksKey}
            setSearchBooksKey={setSearchBooksKey}
            books={books}
            setBooks={setBooks}
          />
          <BooksTable deleteBook={handleDeleteBook} books={searchedBooks} />
        </main>
      </ModalProvider>
    </>
  );
}

export default App;
