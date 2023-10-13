'use client'

import React, { useEffect, useState } from 'react'
import './styles.css'

const CustomeThemeSwitch = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'

    return localStorage.getItem('theme') ?? 'light'
  })

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <label htmlFor="theme" className="theme">
      <span className="theme__toggle-wrap">
        <input
          onChange={handleToggleTheme}
          id="theme"
          className="theme__toggle cursor-pointer"
          type="checkbox"
          role="switch"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
        />
        <span className="theme__fill" />
        <span className="theme__icon">
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
          <span className="theme__icon-part" />
        </span>
      </span>
    </label>
  )
}

export default CustomeThemeSwitch
