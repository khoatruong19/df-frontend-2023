/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { ChevronsLeftRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalContext } from '../../providers/ModalProvider'
import { Book, BookTopic } from '../../utils/types'
import { useBooksContext } from '../../providers/BooksProvider'
import { BookSchema, BookSchemaType } from '../../utils/schemas'

export const TOPICS: BookTopic[] = ['Programming', 'Database', 'DevOps']

export type BookFormProps = {
  updateBookData?: Book | null
}

const BookForm = ({ updateBookData = null }: BookFormProps) => {
  const [selectTopic, setSelectTopic] = useState(TOPICS[0])
  const [openTopicOptions, setOpenTopicOptions] = useState(false)
  const { closeModal } = useModalContext()
  const { handleAddBook, handleUpdateBook } = useBooksContext()

  const actionType = updateBookData ? 'EDIT' : 'ADD'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
  })
  const handleToggleOpenTopicOptions = () =>
    setOpenTopicOptions((prev) => !prev)

  const handleSelectTopic = (topic: BookTopic) => {
    setSelectTopic(topic)
    setOpenTopicOptions(false)
  }

  const onSubmit = (data) => {
    if (!updateBookData) {
      handleAddBook({ ...data, topic: selectTopic })
    } else
      handleUpdateBook({ id: updateBookData.id, ...data, topic: selectTopic })

    closeModal()
    reset()
    setSelectTopic(TOPICS[0])
  }

  useEffect(() => {
    if (!updateBookData) return

    const { id, ...rest } = updateBookData

    setValue('name', rest.name)
    setValue('author', rest.author)
    setSelectTopic(rest.topic)
  }, [updateBookData])

  useEffect(() => {
    if (!updateBookData) {
      reset()
      setSelectTopic(TOPICS[0])
    }
  }, [updateBookData])

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-3">
        {actionType === 'ADD' ? 'Add book' : 'Edit book'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} id="add-book-form">
        <div className="field-control">
          <label>Name</label>
          <input {...register('name')} type="text" placeholder="Book name..." />
          {errors.name && (
            <span className="text-xs text-red-400 font-semibold">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="field-control">
          <label>Author</label>
          <input type="text" placeholder="Author..." {...register('author')} />
          {errors.author && (
            <span className="text-xs text-red-400 font-semibold">
              {errors.author.message}
            </span>
          )}
        </div>
        <div className="field-control">
          <label>Topic</label>
          <div
            className="hover-opacity-desc p-2 border-2 rounded-md flex items-center justify-between"
            onClick={handleToggleOpenTopicOptions}
          >
            <span className="">{selectTopic}</span>
            <div className="rotate-90">
              <ChevronsLeftRight size={15} strokeWidth={3} />
            </div>
          </div>
          {openTopicOptions && (
            <ul className="absolute top-16 border-2 shadow-lg rounded-md w-full z-20 bg-white">
              {TOPICS.map((topic) => (
                <li
                  className={`px-2 py-2.5 ${
                    selectTopic === topic
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
