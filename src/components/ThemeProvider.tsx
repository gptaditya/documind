'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('documind-theme') as Theme | null
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = stored ?? (systemDark ? 'dark' : 'light')
    setTheme(resolved)
    applyTheme(resolved)
  }, [])

  function applyTheme(t: Theme) {
    const root = document.documentElement
    root.classList.add('transitioning')
    root.classList.toggle('dark', t === 'dark')
    setTimeout(() => root.classList.remove('transitioning'), 300)
  }

  function toggleTheme() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('documind-theme', next)
    applyTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
