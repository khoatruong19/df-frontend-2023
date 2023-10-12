/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { ChevronsLeftRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book, BookTopic } from '../../utils/types'
import { useBooksContext } from '../../providers/BooksProvider'
import { BookSchema, BookSchemaType } from '../../utils/schemas'
import booksService from '../../services/books'
import { useModalContext } from '../../providers/ModalProvider'
import { QUERY_KEYS } from '../../utils/constants'

const DEFAULT_TOPIC: BookTopic = {
  id: 1,
  name: 'Programing',
  code: 'programming',
}

export type BookFormProps = {
  updateBookData?: Book | null
}

const BookForm = ({ updateBookData = null }: BookFormProps) => {
  const { data: topics } = useSWR(QUERY_KEYS.GET_ALL_TOPICS, async () => {
    const { data } = await booksService.getTopics()
    return data.data
  })
  const [selectTopic, setSelectTopic] = useState<BookTopic>(
    topics ? topics[0] : DEFAULT_TOPIC,
  )
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

  const onSubmit = (data: BookSchemaType) => {
    if (!updateBookData) {
      handleAddBook({ ...data, topicId: selectTopic.id })
    } else
      handleUpdateBook({
        id: updateBookData.id,
        ...data,
        topicId: selectTopic.id,
      })

    closeModal()
    reset()
    setSelectTopic(DEFAULT_TOPIC)
  }

  useEffect(() => {
    if (!updateBookData) return

    const { id, ...rest } = updateBookData

    setValue('name', rest.name)
    setValue('author', rest.author)
    setSelectTopic(rest.topic)
  }, [updateBookData, setValue])

  useEffect(() => {
    if (!updateBookData) {
      reset()
      setSelectTopic(DEFAULT_TOPIC)
    }
  }, [updateBookData, reset])

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
          <button
            type="button"
            className="hover-opacity-desc p-2 border-2 rounded-md flex items-center justify-between"
            onClick={handleToggleOpenTopicOptions}
          >
            <span className="">{selectTopic.name}</span>
            <div className="rotate-90">
              <ChevronsLeftRight size={15} strokeWidth={3} />
            </div>
          </button>
          {openTopicOptions && (
            <ul className="absolute top-16 border-2 shadow-lg rounded-md w-full z-20 bg-white">
              {topics &&
                topics.map((topic) => (
                  <li key={topic.code}>
                    <button
                      className={`px-2 py-2.5 w-full text-left ${
                        selectTopic === topic
                          ? 'bg-secondary/30'
                          : 'hover-opacity-desc hover:bg-secondary/30'
                      }`}
                      onClick={() => handleSelectTopic(topic)}
                    >
                      {topic.name}
                    </button>
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
