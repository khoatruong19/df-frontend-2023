import { createContext, useState, cloneElement, useContext } from 'react';
import AddBook from '../components/modals/AddBook';
import ModalLayout from '../components/ModalLayout';
import DeleteBookConfirmation from '../components/modals/DeleteBookConfirmation';

export const MODALS = {
  ADD_BOOK: 'add-book',
  DELETE_BOOK_CONFIRMATION: 'delet-book-confirmation',
};

const MODAL_ELEMENTS = {
  [MODALS.ADD_BOOK]: <AddBook />,
  [MODALS.DELETE_BOOK_CONFIRMATION]: <DeleteBookConfirmation />,
};

const defaultModalContextValues = {
  showModal: () => {},
  showModalComponent: () => {},
  closeModal: () => {},
};

const ModalContext = createContext(defaultModalContextValues);

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(null);

  const showModal = (name, props = {}) => {
    setOpen(true);
    setComponent(cloneElement(MODAL_ELEMENTS[name], props));
  };

  const showModalComponent = (element, props = {}) => {
    setOpen(true);
    setComponent(cloneElement(element, props));
  };

  const closeModal = () => {
    setOpen(false);
    setComponent(null);
  };

  const value = {
    showModal,
    showModalComponent,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      <ModalLayout isOpen={open} setIsOpen={setOpen}>
        {component}
      </ModalLayout>
      {children}
    </ModalContext.Provider>
  );
};
const useModalContext = () => useContext(ModalContext);

export { useModalContext };
export default ModalProvider;
