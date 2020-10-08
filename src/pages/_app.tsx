import '@/styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
