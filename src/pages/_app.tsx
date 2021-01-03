import '@/styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@/providers/themeProvider'
import { ImageOverlayProvider } from '@/providers/imageOverlayProvider'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <ImageOverlayProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ImageOverlayProvider>
    </>
  )
}

export default App
