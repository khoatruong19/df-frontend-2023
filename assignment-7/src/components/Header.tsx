'use client'

import React from 'react'
import CustomeThemeSwitch from './CustomThemeSwitch'
import { useAuthContext } from '../providers/AuthProvider'

const Header = () => {
  const { isLogin, email, avatar, logout } = useAuthContext()

  return (
    <header className="bg-test flex items-center justify-center border-b-2">
      <nav className="w-full p-4 flex items-center justify-between text-black">
        <h1 className="text-2xl font-semibold">Bookstore</h1>
        <div className="flex items-center">
          <CustomeThemeSwitch />
          <a
            href="https://github.com/khoatruong19"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 ml-[-15px]"
          >
            <img
              className="rounded-full object-cover w-10 h-10"
              alt="avatar-img"
              src={
                avatar || 'https://avatars.githubusercontent.com/u/85026053?v=4'
              }
            />
            <span className="font-semibold">{email}</span>
          </a>
          {isLogin && (
            <button
              onClick={logout}
              className="ml-2 bg-secondary text-mainTextColor p-2 rounded-md hover-opacity-desc text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header