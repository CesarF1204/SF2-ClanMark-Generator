import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export type Theme = 'dark' | 'light'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
