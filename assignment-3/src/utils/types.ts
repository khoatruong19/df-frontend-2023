export type BookTopic = 'Programming' | 'Database' | 'DevOps'

export type Book = {
  id: string
  name: string
  author: string
  topic: BookTopic
}

export type NewBook = Omit<Book, 'id'>
