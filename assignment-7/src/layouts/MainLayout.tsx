'use client'

import { usePathname } from 'next/navigation'
import Header from '../components/Header'

const NO_HEADER_NAVBAR_PATHNAMES = ['/login']

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <>
      {!NO_HEADER_NAVBAR_PATHNAMES.includes(pathname) && <Header />}
      {children}
    </>
  )
}

export default MainLayout
