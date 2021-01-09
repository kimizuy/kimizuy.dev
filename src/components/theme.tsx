import { useTheme } from '@/providers/themeProvider'
import styles from './theme.module.css'

export const Theme: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme()

  return (
    <div
      className={`${theme === 'dark' ? styles.dark : styles.light} ${
        styles.container
      }`}
    >
      {children}
    </div>
  )
}

export const ThemeSwitch: React.VFC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        Theme Switch
        <input
          type="checkbox"
          checked={theme === 'light'}
          onChange={toggleTheme}
          className={styles.slider}
        />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </div>
  )
}
