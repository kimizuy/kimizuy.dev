import Link from 'next/link'
import CopyRight from './copyRight'
import styles from './layout.module.css'
import Logo from './logo'
import { Theme, ThemeSwitch } from './theme'

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
          {!home && <Mention />}
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
    <>
      <div className={styles.mention}>
        指摘や不明点があれば筆者の
        <Link href="https://twitter.com/kimizuy">
          <a>Twitter</a>
        </Link>
        までおねがいします。
      </div>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    </>
  )
}

export default Layout
