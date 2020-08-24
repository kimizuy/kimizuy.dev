import Head from 'next/head'
import { NAME, SITETITLE } from '../lib/constants'
import styles from './layout.module.css'
import Logo from './logo'
import CopyRight from './copyRight'
import Link from 'next/link'
import profile from '../../public/images/profile.jpg'

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
        <meta property="og:image" content={`https://kimizuy.dev${profile}`} />
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
