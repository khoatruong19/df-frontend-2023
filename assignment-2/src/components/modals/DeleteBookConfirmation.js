import React from 'react';
import { useModalContext } from '../../providers/ModalProvider';

const DeleteBookConfirmation = ({ bookName, deleteBook }) => {
  const { closeModal } = useModalContext();

  const handleConfirmDelete = () => {
    deleteBook();
    closeModal();
  };

  return (
    <div className="delete-book-confirmation">
      <h2>Delete book</h2>
      <p className="confirmation-content">
        Do you want to delete <span id="delete-book-name">{bookName}</span>{' '}
        book?
      </p>
      <div className="confirmation-actions">
        <button className="delete" onClick={handleConfirmDelete}>
          Delete
        </button>
        <button className="cancel" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBookConfirmation;
