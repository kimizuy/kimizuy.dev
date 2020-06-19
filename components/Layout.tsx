import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import Header from "./Header"
import NavButton from "./NavButton"

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
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Body>
        <HeaderGrid>
          <HeaderArea>
            <Header home={home} name={name} siteTitle={siteTitle} />
          </HeaderArea>
        </HeaderGrid>
        <MainGrid>
          <MainArea>{children}</MainArea>
        </MainGrid>
        {!home && <BackToHome />}
      </Body>
    </>
  )
}

const Body = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main";
`

const HeaderGrid = styled.div`
  grid-area: header;
`

const MainGrid = styled.main`
  grid-area: main;
`

const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 1rem 0;
`

const MainArea = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 60rem;
  margin: 1rem auto 4rem;
  padding: 0 1rem;
`

const NavArea = styled.aside`
  max-width: 20%;
  overflow-wrap: break-word;
  background-color: #eee;
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
