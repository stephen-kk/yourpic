
'use client'

import { useEffect, useState } from 'react'

const themeColors = {
  sky: 'sky',
  blue: 'blue',
  indigo: 'indigo'
} as const

type ThemeKey = keyof typeof themeColors

export function useTheme() {
  const [theme, setTheme] = useState<ThemeKey>('sky')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeKey
    if (stored && themeColors[stored]) {
      setTheme(stored)
    }
  }, [])

  return theme
}

export function useThemeClass(prefix: string, weight: number = 500) {
  const theme = useTheme()
  return `${prefix}-${themeColors[theme]}-${weight}`
}
