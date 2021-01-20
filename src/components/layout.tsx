import TagList from '@/components/tagList'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CopyRight from './copyRight'
import styles from './layout.module.css'
import Logo from './logo'
import { Theme, ThemeSwitch } from './theme'
import Toc from './toc'

const Layout: React.VFC<{
  children: React.ReactNode
  home?: boolean
}> = ({ children, home }) => {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', setFillHeight)
    return () => window.removeEventListener('resize', setFillHeight)
  }, [])

  return (
    <Theme>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo />
          <ThemeSwitch />
        </header>
        <main className={styles.main}>
          <div className={styles.mainContainer}>
            <section className={styles.content}>
              {children}
              {!home && <Mention />}
            </section>
            <aside className={styles.sideBar}>
              <div className={styles.sticky}>
                {home && <TagList />}
                {!home && <Toc />}
              </div>
            </aside>
          </div>
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
    <div className={styles.mentionContainer}>
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
    </div>
  )
}

export default Layout
