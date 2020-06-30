import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import _Header from "./_Header"
import _Footer from "./_Footer"
import styles from "styles/layout.module.scss"

const name = "kimizuy"
export const siteTitle = `${name} blog`

export default function ({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const router = useRouter()

  return (
    <>
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
      <_Header />
      <Content>
        <Main>{children}</Main>
        <_Footer />
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 2.5em 4vw 1.66667em;

  @media only screen and (min-width: 801px) {
    margin-right: 30vw;
  }

  @media only screen and (min-width: 1091px) {
    padding-left: 6vw;
    padding-right: 6vw;
  }

  @media only screen and (min-width: 1501px) {
    margin-right: 450px;
    padding-left: 130px;
    padding-right: 130px;
  }
`

const Main = styled.main`
  padding-bottom: 1.66667em;
`

function BackToHome() {
  return (
    <div style={{ margin: "0 0 1rem 1rem" }}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  )
}
