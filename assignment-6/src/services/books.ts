import axiosClient from '../lib/axiosClient'
import {
  Book,
  CreateBookInput,
  LoginInput,
  LoginResponse,
} from '../utils/types'

const booksService = {
  getAll: () => axiosClient.get<{ data: Book[] }>('/books'),
  create: (data: LoginInput) =>
    axiosClient.post<{ data: CreateBookInput }>('/books', data),
  me: (token: string) =>
    axiosClient.get<{ data: LoginResponse }>('/me', {
      headers: { Booksorization: `Bearer ${token}` },
    }),
}

export default booksService
