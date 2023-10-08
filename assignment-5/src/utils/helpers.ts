/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from './types'

export const saveBooksToLocalStorage = (books: Book[]) =>
  localStorage.setItem('books', JSON.stringify(books))

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) => {
  let timeout
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, delay)
    return result
  }
}

export const validatePageParam = (pageParam: string, totalPages: number) => {
  let formatPageParam = Number(pageParam) || 1
  if (formatPageParam < 1 || formatPageParam >= totalPages) formatPageParam = 1

  return formatPageParam
}
