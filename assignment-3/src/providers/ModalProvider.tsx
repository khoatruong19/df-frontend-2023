/* eslint-disable import/no-cycle */
import {
  createContext,
  useState,
  cloneElement,
  useContext,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'
import AddBook from '../components/modals/AddBook'
import ModalLayout from '../components/ModalLayout'
import DeleteBookConfirmation from '../components/modals/DeleteBookConfirmation'

export enum MODALS {
  ADD_BOOK = 'add-book',
  DELETE_BOOK_CONFIRMATION = 'delet-book-confirmation',
}

type ModalContextValues = {
  showModal: <T extends {} = {}>(name: MODALS, props: T) => void
  showModalComponent: (element: ReactElement) => void
  closeModal: () => void
}

const MODAL_ELEMENTS: Record<MODALS, ReactElement> = {
  [MODALS.ADD_BOOK]: <AddBook books={[]} setBooks={() => {}} />,
  [MODALS.DELETE_BOOK_CONFIRMATION]: (
    <DeleteBookConfirmation bookName="" deleteBook={() => {}} />
  ),
}

const defaultModalContextValues: ModalContextValues = {
  showModal: () => {},
  showModalComponent: () => {},
  closeModal: () => {},
}

const ModalContext = createContext(defaultModalContextValues)

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [component, setComponent] = useState<ReactElement | null>(null)

  const showModal = (name: MODALS, props = {}) => {
    setOpen(true)
    setComponent(cloneElement(MODAL_ELEMENTS[name], props))
  }

  const showModalComponent = (element: ReactElement) => {
    setOpen(true)
    setComponent(element)
  }

  const closeModal = () => {
    setOpen(false)
    setComponent(null)
  }

  const value: ModalContextValues = useMemo(
    () => ({
      showModal,
      showModalComponent,
      closeModal,
    }),
    [],
  )

  return (
    <ModalContext.Provider value={value}>
      <ModalLayout isOpen={open} setIsOpen={setOpen}>
        {component}
      </ModalLayout>
      {children}
    </ModalContext.Provider>
  )
}
const useModalContext = () => useContext(ModalContext)

export { useModalContext }
export default ModalProvider
