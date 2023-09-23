import React from 'react';
import SearchBookInput from './SearchBookInput';
import { MODALS, useModalContext } from '../providers/ModalProvider';

const BooksActions = (props) => {
  const { searchBooksKey, setSearchBooksKey, books, setBooks } = props;

  const { showModal } = useModalContext();

  return (
    <section id="actions">
      <SearchBookInput
        searchBooksKey={searchBooksKey}
        setSearchBooksKey={setSearchBooksKey}
      />
      <button onClick={() => showModal(MODALS.ADD_BOOK, { books, setBooks })}>
        Add book
      </button>
    </section>
  );
};

export default BooksActions;
