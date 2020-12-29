import styles from './layout.module.css'
import Logo from './logo'
import CopyRight from './copyRight'
import Link from 'next/link'
import LightText from './lightText'
import { useTheme } from '@/lib/ThemeProvider'

const Layout: React.VFC<{
  children: React.ReactNode
  home?: boolean
}> = ({ children, home }) => {
  return (
    <Theme>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo />
          <ThemeSwitch />
        </header>
        <main className={styles.main}>
          {children}
          {!home && (
            <>
              <Mention />
              <BackToHome />
            </>
          )}
        </main>
        <footer className={styles.footer}>
          <CopyRight />
        </footer>
      </div>
    </Theme>
  )
}

const Mention = () => {
  return (
    <LightText className={`${styles.margin1}`}>
      指摘や不明点があれば筆者の
      <Link href="https://twitter.com/kimizuy">
        <a>Twitter</a>
      </Link>
      までおねがいします。
    </LightText>
  )
}

const BackToHome = () => {
  return (
    <div className={styles.margin1}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  )
}

export default Layout

const Theme: React.VFC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div className={`${theme === 'dark' ? styles.dark : styles.light}`}>
      {children}
    </div>
  )
}

const ThemeSwitch: React.VFC = () => {
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
