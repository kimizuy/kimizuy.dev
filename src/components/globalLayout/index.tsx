import { useEffect } from 'react'
import { ImageOverlay } from './imageOverlay'
import styles from './index.module.css'
import { Logo } from './logo'
import { ThemeSwitch } from './themeSwitch'
import { CopyRight } from './copyRight'

export const Layout: React.VFC<{
  children: React.ReactNode
  home?: boolean
  sideBarItem?: JSX.Element
}> = ({ children, home = false, sideBarItem }) => {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', setFillHeight, { passive: true })
    return () => window.removeEventListener('resize', setFillHeight)
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <ThemeSwitch />
      </header>
      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.article}>{children}</section>
          <aside className={styles.sideBar}>
            <div
              className={`${styles.sideBarItemWrapper} ${
                home ? '' : styles.sticky
              }`}
            >
              {sideBarItem}
            </div>
          </aside>
        </div>
      </main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
      <ImageOverlay />
    </div>
  )
}
