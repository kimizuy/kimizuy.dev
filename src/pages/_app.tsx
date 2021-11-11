import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import '@/styles/global.css'
import * as gtag from '../lib/gtag'
import { GlobalLayout } from '@/components/globalLayout'
import { ImageOverlayProvider } from '@/providers/imageOverlayProvider'
import { ThemeProvider } from '@/providers/themeProvider'

type GetLayout = (page: ReactNode) => ReactNode

export type Page<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout
}

type MyAppProps<P = object> = AppProps<P> & {
  Component: Page<P>
}

const defaultGetLayout: GetLayout = (page: ReactNode): ReactNode => page

const App = ({ Component, pageProps }: MyAppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const getLayout = Component.getLayout ?? defaultGetLayout

  return (
    <>
      <Head>
        {/* https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS 2.0"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom 1.0"
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON Feed"
          href="/feed.json"
        /> */}
      </Head>
      <ImageOverlayProvider>
        <ThemeProvider>
          <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
        </ThemeProvider>
      </ImageOverlayProvider>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
