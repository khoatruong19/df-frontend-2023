export type BookTopic = {
  code: string
  id: number
  name: string
}

export type Book = {
  id: number
  name: string
  author: string
  topic: BookTopic
}

export type NewBook = Omit<Book, 'id'>

export type GetBookResponse = {
  success: boolean
  message: string
  book?: Book
}

export type LoginInput = {
  email: string
  password: string
}

export type LoginResponse = {
  email: string
  accessToken: string
}

export type CreateBookInput = {
  author: string
  name: string
  topicId: number
}

export type UpdateBookInput = CreateBookInput & { id: number }
