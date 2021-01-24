import { useImageOverlay } from '@/providers/imageOverlayProvider'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { CopyRight } from './copyRight'
import styles from './layout.module.css'
import { Logo } from './logo'
import { TagList } from './tagList'
import { Theme, ThemeSwitch } from './theme'
import { Toc } from './toc'

export const Layout: React.VFC<{
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
        <ImageOverlay />
      </div>
    </Theme>
  )
}

const ImageOverlay: React.VFC = () => {
  const { src, updateSrc } = useImageOverlay()

  if (!src) return null

  return (
    <div className={styles.overlay} onClick={() => updateSrc('')}>
      <div className={styles.overlayImgWrapper}>
        <Image src={src} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}
