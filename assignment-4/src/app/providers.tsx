'use client'

import React from 'react'
import ModalProvider from '../providers/ModalProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}
