import React from 'react';
import { MODALS, useModalContext } from '../providers/ModalProvider';

const BookRow = (props) => {
  const { order, name, author, topic, deleteBook } = props;

  const { showModal } = useModalContext();

  return (
    <tr>
      <td>{order}</td>
      <td className="book-name">{name}</td>
      <td className="book-author">{author}</td>
      <td>{topic}</td>
      <td
        className="book-actions"
        onClick={() =>
          showModal(MODALS.DELETE_BOOK_CONFIRMATION, {
            deleteBook,
            bookName: name,
          })
        }
      >
        Delete
      </td>
    </tr>
  );
};

export default BookRow;
