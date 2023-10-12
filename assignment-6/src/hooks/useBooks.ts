import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {} from 'next/router'
import { useCallback, useEffect } from 'react'
import { KeyedMutator } from 'swr'
import { useAuthContext } from '../providers/AuthProvider'
import booksService from '../services/books'
import { validatePageParam } from '../utils/helpers'
import {
  Book,
  BooksMetadata,
  CreateBookInput,
  UpdateBookInput,
} from '../utils/types'

type UseBooksProps = {
  mutate: KeyedMutator<{
    data: Book[]
    metadata: BooksMetadata
  }>
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

  const handleAddBook = async (value: CreateBookInput) => {
    try {
      await booksService.create(value)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateBook = async (value: UpdateBookInput) => {
    try {
      await booksService.update(value)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBook = async (id: number) => {
    try {
      await booksService.delete(id)
      mutate()
      if (pathname !== '/') router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const syncFilterParamsWithUrl = useCallback(
    ({ pageNumber, searchKey }: { pageNumber: number; searchKey: string }) => {
      if (!isLogin || isLoading) return
      const filterParams = new URLSearchParams({
        key: searchKey.trim(),
        page: `${pageNumber}`,
      }).toString()
      router.replace(`?${filterParams}`)
    },
    [isLogin, isLoading, totalPages],
  )

  useEffect(() => {
    const keyParam = searchKeyParam ?? ''
    const formatPageParam = validatePageParam(`${pageParam ?? '1'}`, totalPages)

    syncFilterParamsWithUrl({
      pageNumber: formatPageParam,
      searchKey: keyParam,
    })
  }, [pageParam, searchKeyParam, isLoading])

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
