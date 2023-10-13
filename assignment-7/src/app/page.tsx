'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const BooksSection = dynamic(() => import('../components/BooksSection'), {
  ssr: false,
})
export default function Home() {
  return (
    <main className="min-h-screen py-4 px-2 md:p-6 bg-primary">
      <BooksSection />
    </main>
  )
}
