import { useTheme } from '@/providers/themeProvider'
import styles from './themeSwitch.module.css'

export const ThemeSwitch: React.VFC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        Theme Switch
        <input
          type="checkbox"
          checked={theme !== 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={styles.slider}
        />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </div>
  )
}
