/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react'
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
    <div className="add-book">
      <h2>Add book</h2>
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
            className="topic-select-trigger"
            onClick={handleToggleOpenTopicOptions}
          >
            <span className="topic-select">{formValues.topic}</span>
            <div className="topic-select-icon">
              <i className="fa fa-caret-up fa-xs" />
              <i className="fa fa-caret-down fa-xs" />
            </div>
          </div>
          {openTopicOptions && (
            <ul className="topic-select-options">
              {TOPICS.map((topic) => (
                <li
                  className={formValues.topic === topic ? 'topic-selected' : ''}
                  key={topic}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AddBook
