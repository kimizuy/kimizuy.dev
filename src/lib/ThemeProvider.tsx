import { useState, createContext, useContext, useEffect } from 'react'

type Theme = 'light' | 'dark'
type ThemeContext = { theme: Theme; toggleTheme: () => void }

const ThemeContext = createContext<ThemeContext>({} as ThemeContext)
export const useTheme = (): ThemeContext => useContext(ThemeContext)

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => {
    const currentTheme = (localStorage.getItem('theme') || theme) as Theme
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', nextTheme) // setState は非同期で state は即座に更新されないため、このタイミングで保存する
    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
