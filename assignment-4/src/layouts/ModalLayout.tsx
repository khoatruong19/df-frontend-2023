import React, { ReactNode, useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

type ModalLayoutProps = {
  children: ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalLayout = (props: ModalLayoutProps) => {
  const { children, isOpen, setIsOpen } = props

  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => setIsOpen(false))

  return (
    <div
      id="modals"
      className={`items-center justify-center ${!isOpen ? 'hidden' : 'flex'} `}
    >
      <div ref={wrapperRef} className="bg-white rounded-md">
        {children}
      </div>
    </div>
  )
}

export default ModalLayout
