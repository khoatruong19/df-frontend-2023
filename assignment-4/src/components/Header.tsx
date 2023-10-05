import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className="bg-white flex items-center justify-center border-b-2">
      <nav className="w-full p-4 flex items-center justify-between text-black">
        <h1 className="text-2xl font-semibold">Bookstore</h1>
        <a
          href="https://github.com/khoatruong19"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
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
      </nav>
    </header>
  )
}

export default Header
