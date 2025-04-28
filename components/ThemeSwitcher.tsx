
'use client'

import { useEffect, useState } from 'react'

const themes = ['sky', 'blue', 'indigo']

type Theme = typeof themes[number]

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false)
  const [theme, setTheme] = useState<Theme>('sky')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme
    const storedMode = localStorage.getItem('dark') === 'true'
    if (storedTheme) setTheme(storedTheme)
    setIsDark(storedMode)
    document.documentElement.classList.toggle('dark', storedMode)
    document.documentElement.setAttribute('data-theme', storedTheme || 'sky')
  }, [])

  const toggleDark = () => {
    const newMode = !isDark
    setIsDark(newMode)
    localStorage.setItem('dark', String(newMode))
    document.documentElement.classList.toggle('dark', newMode)
  }

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleDark}
        className="text-sm px-4 py-2 rounded-lg border dark:border-gray-600 border-gray-300"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>

      <select
        value={theme}
        onChange={(e) => switchTheme(e.target.value as Theme)}
        className="px-2 py-1 border border-gray-300 rounded-lg text-sm dark:bg-gray-800 dark:text-white"
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
