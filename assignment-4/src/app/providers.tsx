'use client'

import React from 'react'
import ModalProvider from '../providers/ModalProvider'
import BooksProvider from '../providers/BooksProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BooksProvider>
      <ModalProvider>{children}</ModalProvider>
    </BooksProvider>
  )
}
