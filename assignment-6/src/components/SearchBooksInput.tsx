'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useBooksContext } from '../providers/BooksProvider'

const SearchBookInput = () => {
  const { searchBooksKey, handleChangeSearchValue } = useBooksContext()

  const [value, setValue] = useState<string>(searchBooksKey)
  const debouncedValue = useDebounce<string>(value, 500)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    handleChangeSearchValue(debouncedValue)
  }, [debouncedValue, handleChangeSearchValue])

  return (
    <input
      value={value}
      onChange={handleOnChange}
      id="search"
      type="text"
      placeholder="Search books by name or author"
      className="placeholder:text-sm md:placeholder:text-base px-2 py-3 shadow-md rounded-md outline-none text-black md:min-w-[300px]"
    />
  )
}

export default SearchBookInput
