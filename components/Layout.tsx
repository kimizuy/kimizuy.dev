import Head from "next/head"
import Link from "next/link"
import styles from "./layout.module.css"
import Logo from "./Logo"

const name = "kimizuy"
export const siteTitle = `kimizuy blog`

export default function Layout({
  children,
  home,
  navItem,
}: {
  children: React.ReactNode
  home?: boolean
  navItem?: JSX.Element
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
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={styles.header}>
        <Logo home={home} name={name} siteTitle={siteTitle} />
      </header>
      <main className={styles.main}>{children}</main>
      <nav className={styles.nav}>nav</nav>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
