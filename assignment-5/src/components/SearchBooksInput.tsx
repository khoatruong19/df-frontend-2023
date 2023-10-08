import React from 'react'

type SearchBookInputProps = {
  searchBooksKey: string
  setSearchBooksKey: React.Dispatch<React.SetStateAction<string>>
}

const SearchBookInput = ({
  searchBooksKey,
  setSearchBooksKey,
}: SearchBookInputProps) => {
  return (
    <input
      value={searchBooksKey}
      onChange={(e) => setSearchBooksKey(e.target.value)}
      id="search"
      type="text"
      placeholder="Search books by name or author"
      className="placeholder:text-sm md:placeholder:text-base px-2 py-3 shadow-md rounded-md outline-none text-black md:min-w-[300px]"
    />
  )
}

export default SearchBookInput
