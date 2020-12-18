import '@/styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default App
