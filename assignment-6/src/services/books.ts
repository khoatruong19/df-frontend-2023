import axiosClient from '../lib/axiosClient'
import {
  Book,
  BookTopic,
  BooksMetadata,
  BooksQueryParams,
  CreateBookInput,
  UpdateBookInput,
} from '../utils/types'
import { BOOKS_PER_PAGE } from '../utils/constants'

const booksService = {
  getAll: (
    params: BooksQueryParams = {
      page: 1,
      pageSize: BOOKS_PER_PAGE,
      query: '',
    },
  ) =>
    axiosClient.get<{ data: Book[]; metadata: BooksMetadata }>(
      `/books?${new URLSearchParams({
        page: `${params.page ?? 1}`,
        pageSize: `${params.pageSize ?? BOOKS_PER_PAGE}`,
        query: params.query ?? '',
      }).toString()}`,
    ),
  getById: (id: number) => axiosClient.get<{ data: Book }>(`/books/${id}`),
  create: (data: CreateBookInput) =>
    axiosClient.post<{ data: Book }>('/books', data),
  update: (data: UpdateBookInput) =>
    axiosClient.put<{ data: Book }>(`/books/${data.id}`, data),
  delete: (id: number) => axiosClient.delete<{ data: Book }>(`/books/${id}`),
  getTopics: () => axiosClient.get<{ data: BookTopic[] }>('/topics'),
}

export default booksService
