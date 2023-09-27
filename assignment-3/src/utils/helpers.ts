import { Book } from './types'

export const saveBooksToLocalStorage = (books: Book[]) =>
  localStorage.setItem('books', JSON.stringify(books))
