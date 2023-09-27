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
    />
  )
}

export default SearchBookInput
