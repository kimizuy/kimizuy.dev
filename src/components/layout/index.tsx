import { NAME, SITE_TITLE } from '@/lib/constants'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './index.module.css'
import { ThemeSwitch } from './themeSwitch'

export const Layout: React.VFC<{
  children: React.ReactNode
  sideBarItem?: JSX.Element
}> = ({ children, sideBarItem }) => {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', setFillHeight)
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
            <div className={styles.sticky}>{sideBarItem}</div>
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

const ImageOverlay: React.VFC = () => {
  const { src, setSrc } = useImageOverlay()

  if (!src) return null

  return (
    <div className={styles.overlay} onClick={() => setSrc('')}>
      <div className={styles.overlayImgWrapper}>
        <Image src={src} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}

const Logo: React.VFC = () => {
  return (
    <Link href="/">
      <div className={styles.logo}>
        <div className={styles.logoImgWrapper}>
          <Image
            src="/profile.jpg"
            alt={NAME}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className={styles.logoTitle}>{SITE_TITLE}</h1>
      </div>
    </Link>
  )
}

const CopyRight: React.VFC = () => {
  return (
    <div className={styles.copyRight}>
      <p>
        {`© 2020, Built with `}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </p>
      <p>
        {`createdBy `}
        <a
          href="https://twitter.com/kimizuy"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kimizuy
        </a>
        {` & `}
        <a
          href="https://github.com/kimizuy/blog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repo
        </a>
      </p>
      <p>This site uses Google Analytics.</p>
    </div>
  )
}
