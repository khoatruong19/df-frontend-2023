import React from 'react';

const SearchBookInput = ({ searchBooksKey, setSearchBooksKey }) => {
  return (
    <input
      value={searchBooksKey}
      onChange={(e) => setSearchBooksKey(e.target.value)}
      id="search"
      type="text"
      placeholder="Search books by name or author"
    />
  );
};

export default SearchBookInput;
