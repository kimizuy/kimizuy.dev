import '@/styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@/lib/ThemeProvider'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default App
