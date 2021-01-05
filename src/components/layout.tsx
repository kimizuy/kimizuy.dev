import { useTheme } from '@/providers/themeProvider'
import Link from 'next/link'
import CopyRight from './copyRight'
import styles from './layout.module.css'
import LightText from './lightText'
import Logo from './logo'

const Layout: React.VFC<{
  children: React.ReactNode
  home?: boolean
}> = ({ children, home }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      className={`${theme === 'dark' ? styles.dark : styles.light} ${
        styles.container
      }`}
    >
      <header className={styles.header}>
        <Logo />
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
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

const ThemeSwitch = ({
  theme,
  toggleTheme,
}: {
  theme: string
  toggleTheme: () => void
}) => {
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

export default Layout
