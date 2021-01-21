import TagList from '@/components/tagList'
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
          <div className={styles.content}>
            <section className={styles.article}>{children}</section>
            <aside className={styles.sideBar}>
              <div className={styles.sticky}>
                {home && (
                  <div className={styles.tagListWrapper}>
                    <TagList />
                  </div>
                )}
                {!home && (
                  <div className={styles.tocWrapper}>
                    <Toc />
                  </div>
                )}
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

export default Layout
