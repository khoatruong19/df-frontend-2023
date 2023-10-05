/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { ChevronsLeftRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useModalContext } from '../../providers/ModalProvider'
import { Book, BookTopic, NewBook } from '../../utils/types'
import { useBooksContext } from '../../providers/BooksProvider'

export const TOPICS: BookTopic[] = ['Programming', 'Database', 'DevOps']
const DEFAULT_FORM_VALUES: NewBook = {
  name: '',
  author: '',
  topic: TOPICS[0],
}

export type BookFormProps = {
  updateBookData?: Book | null
}

const BookForm = ({ updateBookData = null }: BookFormProps) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES)
  const [openTopicOptions, setOpenTopicOptions] = useState(false)
  const { closeModal } = useModalContext()
  const { handleAddBook, handleUpdateBook } = useBooksContext()

  const nameInputRef = useRef<HTMLInputElement | null>(null)

  const actionType = updateBookData ? 'EDIT' : 'ADD'

  const handleToggleOpenTopicOptions = () =>
    setOpenTopicOptions((prev) => !prev)

  const handleSelectTopic = (topic: BookTopic) => {
    setFormValues((prev) => ({ ...prev, topic }))
    setOpenTopicOptions(false)
  }

  const handleOnChangeFormField = (field: keyof NewBook, value: string) =>
    setFormValues((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!updateBookData) {
      handleAddBook(formValues)
    } else handleUpdateBook({ id: updateBookData.id, ...formValues })

    closeModal()
    setFormValues(DEFAULT_FORM_VALUES)
  }

  useEffect(() => {
    if (!nameInputRef || !nameInputRef.current) return
    nameInputRef.current.focus()
  }, [nameInputRef])

  useEffect(() => {
    if (!updateBookData) return

    const { id, ...rest } = updateBookData

    setFormValues(rest)
  }, [updateBookData])

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-3">
        {actionType === 'ADD' ? 'Add book' : 'Edit book'}
      </h2>
      <form onSubmit={handleSubmit} id="add-book-form">
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
          {actionType === 'ADD' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default BookForm
