export type BookTopic = 'Programming' | 'Database' | 'DevOps'

export type Book = {
  id: string
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
