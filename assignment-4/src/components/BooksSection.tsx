import BooksActions from './BooksActions'
import BooksPagination from './BooksPagination'
import BooksTable from './BooksTable'

const BooksSection = () => {
  return (
    <>
      <BooksActions />
      <BooksTable />
      <BooksPagination />
    </>
  )
}

export default BooksSection
