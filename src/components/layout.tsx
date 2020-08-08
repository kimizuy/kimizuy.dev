import Head from 'next/head'
import { NAME, SITETITLE } from '../lib/constants'
import styles from './layout.module.css'
import Logo from './logo'
import BackToHome from './backToHome'
import CopyRight from './copyRight'

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
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            SITETITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITETITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <Logo name={NAME} siteTitle={SITETITLE} />
      </header>
      <main className={styles.main}>
        <section className={styles.content}>
          {children}
          {!home && <BackToHome />}
        </section>
        <section className={styles.nav}>nav</section>
      </main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
    </div>
  )
}
