import Head from 'next/head'
import { NAME, SITETITLE } from '../lib/constants'
import styles from './layout.module.css'
import Logo from './logo'
import CopyRight from './copyRight'
import Link from 'next/link'
// import Tag from './tagList'

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="kimizuy のブログです" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            SITETITLE
          )}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg&images=https%3A%2F%2Fmdx-logo.now.sh`}
        />
        <meta name="og:title" content={SITETITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <Logo name={NAME} siteTitle={SITETITLE} />
      </header>
      <main className={styles.main}>
        {children}
        {!home && <BackToHome />}
      </main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
    </div>
  )
}

function BackToHome() {
  return (
    <div className={styles.backToHome}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  )
}
