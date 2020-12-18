import styles from './layout.module.css'
import Logo from './logo'
import CopyRight from './copyRight'
import Link from 'next/link'
import LightText from './lightText'

const Layout: React.VFC<{
  children: React.ReactNode
  home?: boolean
}> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
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

export default Layout
