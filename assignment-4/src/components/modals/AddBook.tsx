/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useRef, useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import { saveBooksToLocalStorage } from '../../utils/helpers'
import { useModalContext } from '../../providers/ModalProvider'
import { BookTopic, NewBook } from '../../utils/types'

export const TOPICS: BookTopic[] = ['Programming', 'Database', 'DevOps']
const DEFAULT_FORM_VALUES: NewBook = {
  name: '',
  author: '',
  topic: TOPICS[0],
}

const AddBook = ({ books, setBooks }) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES)
  const [openTopicOptions, setOpenTopicOptions] = useState(false)
  const { closeModal } = useModalContext()
  const nameInputRef = useRef<HTMLInputElement | null>(null)

  const handleToggleOpenTopicOptions = () =>
    setOpenTopicOptions((prev) => !prev)

  const handleSelectTopic = (topic: BookTopic) => {
    setFormValues((prev) => ({ ...prev, topic }))
    setOpenTopicOptions(false)
  }

  const handleOnChangeFormField = (field: keyof NewBook, value: string) =>
    setFormValues((prev) => ({ ...prev, [field]: value }))

  const handleAddBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const existingBook = books.find(
      ({ id, ...rest }) => JSON.stringify(formValues) === JSON.stringify(rest),
    )
    if (existingBook) return alert('This book is existing')

    const newBook = {
      id:
        formValues.author +
        formValues.name +
        new Date().getTime().toLocaleString(),
      ...formValues,
    }
    const tempBooks = [...books, newBook]

    setBooks(tempBooks)
    saveBooksToLocalStorage(tempBooks)
    closeModal()
    setFormValues(DEFAULT_FORM_VALUES)
  }

  useEffect(() => {
    if (!nameInputRef || !nameInputRef.current) return
    nameInputRef.current.focus()
  }, [nameInputRef])

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-3">Add book</h2>
      <form onSubmit={handleAddBookSubmit} id="add-book-form">
        <div className="field-control">
          <label>Name</label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Book name..."
            maxLength={100}
            required
            value={formValues.name}
            onChange={(e) => handleOnChangeFormField('name', e.target.value)}
          />
        </div>
        <div className="field-control">
          <label>Author</label>
          <input
            type="text"
            placeholder="Author..."
            maxLength={100}
            required
            value={formValues.author}
            onChange={(e) => handleOnChangeFormField('author', e.target.value)}
          />
        </div>
        <div className="field-control">
          <label>Topic</label>
          <div
            className="hover-opacity-desc p-2 border-2 rounded-md flex items-center justify-between"
            onClick={handleToggleOpenTopicOptions}
          >
            <span className="">{formValues.topic}</span>
            <div className="rotate-90">
              <ChevronsLeftRight size={15} strokeWidth={3} />
            </div>
          </div>
          {openTopicOptions && (
            <ul className="absolute top-16 border-2 shadow-lg rounded-md w-full z-20 bg-white">
              {TOPICS.map((topic) => (
                <li
                  className={`px-2 py-2.5 ${
                    formValues.topic === topic
                      ? 'bg-secondary/30'
                      : 'hover-opacity-desc hover:bg-secondary/30'
                  }`}
                  key={topic}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="mt-5 float-right hover-opacity-desc px-4 py-2 rounded-md text-white font-semibold bg-secondary"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default AddBook
