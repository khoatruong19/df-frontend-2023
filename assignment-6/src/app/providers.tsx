'use client'

import React from 'react'
import ModalProvider from '../providers/ModalProvider'
import BooksProvider from '../providers/BooksProvider'
import AuthProvider from '../providers/AuthProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BooksProvider>
        <ModalProvider>{children}</ModalProvider>
      </BooksProvider>
    </AuthProvider>
  )
}
