import axiosClient from '../lib/axiosClient'
import {
  Book,
  BookTopic,
  CreateBookInput,
  UpdateBookInput,
} from '../utils/types'

const booksService = {
  getAll: () => axiosClient.get<{ data: Book[] }>('/books'),
  getById: (id: number) => axiosClient.get<{ data: Book }>(`/books/${id}`),
  create: (data: CreateBookInput) =>
    axiosClient.post<{ data: Book }>('/books', data),
  update: (data: UpdateBookInput) =>
    axiosClient.put<{ data: Book }>(`/books/${data.id}`, data),
  delete: (id: number) => axiosClient.delete<{ data: Book }>(`/books/${id}`),
  getTopics: () => axiosClient.get<{ data: BookTopic[] }>('/topics'),
}

export default booksService
