import { useState, createContext, useContext, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

const themeContext = createContext<ThemeContext>({} as ThemeContext)
export const useTheme = (): ThemeContext => useContext(themeContext)

export const ThemeProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      const currentTheme = localStorage.getItem('theme') as Theme
      setTheme(currentTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  )
}
