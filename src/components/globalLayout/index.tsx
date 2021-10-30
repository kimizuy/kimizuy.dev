import { useEffect } from 'react'
import { CopyRight } from './copyRight'
import { ImageOverlay } from './imageOverlay'
import styles from './index.module.css'
import { Logo } from './logo'
import { ThemeSwitch } from './themeSwitch'

export const GlobalLayout: React.VFC<{
  children: React.ReactNode
}> = ({ children }) => {
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
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
      <ImageOverlay />
    </div>
  )
}
