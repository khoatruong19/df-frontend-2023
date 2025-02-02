import Image from 'next/image'
import React from 'react'
import CustomeThemeSwitch from './CustomThemeSwitch'

const Header = () => {
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
            <Image
              className="rounded-full object-cover"
              alt="avatar-img"
              width={40}
              height={40}
              src="https://avatars.githubusercontent.com/u/85026053?v=4"
            />
            <span className="font-semibold">Khoa Truong</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
