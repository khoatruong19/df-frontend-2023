import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {} from 'next/router'
import { useCallback, useEffect } from 'react'
import { KeyedMutator } from 'swr'
import { useAuthContext } from '../providers/AuthProvider'
import { validatePageParam } from '../utils/helpers'
import {
  BooksResponse,
  CreateBookRequest,
  UpdateBookRequest,
} from '../generated/model'
import * as booksService from '../generated/book/book'

type UseBooksProps = {
  mutate: KeyedMutator<BooksResponse>
  isLoading: boolean
  page: number
  searchBooksKey: string
  totalPages: number
}

const useBooks = (props: UseBooksProps) => {
  const {
    mutate = () => {},
    isLoading,
    page,
    searchBooksKey,
    totalPages,
  } = props

  const { isLogin } = useAuthContext()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchKeyParam = params.get('key')
  const pageParam = params.get('page')

  const handleNextPage = () => {
    if (page >= totalPages) return
    syncFilterParamsWithUrl({ pageNumber: page + 1, searchKey: searchBooksKey })
  }

  const handleBackPage = () => {
    if (page <= 1) return
    syncFilterParamsWithUrl({ pageNumber: page - 1, searchKey: searchBooksKey })
  }

  const handleSelectPage = (selectedPage: number) => {
    syncFilterParamsWithUrl({
      pageNumber: selectedPage,
      searchKey: searchBooksKey,
    })
  }

  const handleChangeSearchValue = (value: string) => {
    if (value === searchBooksKey) return
    syncFilterParamsWithUrl({ pageNumber: page, searchKey: value })
  }

  const handleAddBook = async (value: CreateBookRequest) => {
    try {
      await booksService.createBook(value)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateBook = async (
    value: UpdateBookRequest & { id: number },
  ) => {
    const { id, ...rest } = value
    try {
      await booksService.updateBook(id, rest)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBook = async (id: number) => {
    try {
      await booksService.deleteBook(id)
      mutate()
      if (pathname !== '/') router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const syncFilterParamsWithUrl = useCallback(
    ({ pageNumber, searchKey }: { pageNumber: number; searchKey: string }) => {
      if (!isLogin || isLoading) return
      if (pathname !== '/') {
        router.push('')
        return
      }
      const filterParams = new URLSearchParams({
        key: searchKey.trim(),
        page: `${pageNumber}`,
      }).toString()
      router.push(`?${filterParams}`)
    },
    [isLogin, isLoading, totalPages, pathname],
  )

  useEffect(() => {
    const keyParam = searchKeyParam ?? ''
    const formatPageParam = validatePageParam(`${pageParam ?? '1'}`, totalPages)

    syncFilterParamsWithUrl({
      pageNumber: formatPageParam,
      searchKey: keyParam,
    })
  }, [pageParam, searchKeyParam, isLoading, pathname])

  useEffect(() => {
    if (page > totalPages) {
      syncFilterParamsWithUrl({
        pageNumber: 1,
        searchKey: searchBooksKey,
      })
    }
  }, [totalPages, isLoading])

  return {
    handleAddBook,
    handleUpdateBook,
    handleDeleteBook,
    handleNextPage,
    handleBackPage,
    handleSelectPage,
    handleChangeSearchValue,
  }
}

export default useBooks
