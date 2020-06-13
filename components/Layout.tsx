import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import Header from "./Header"

const name = "kimizuy"
export const siteTitle = `${name} blog`

export default function ({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <Container>
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
        <HeaderArea>
          <Header home={home} name={name} siteTitle={siteTitle} />
        </HeaderArea>
        <MainArea>{children}</MainArea>
        {!home && <BackToHome />}
        <NavArea>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </NavArea>
      </Body>
    </Container>
  )
}

const Container = styled.div`
  max-width: 48rem;
  padding: 0 1rem;
  margin: 1rem auto 4rem;
`

const Body = styled.div`
  display: grid;
  grid-template-rows: 4rem 1fr;
  grid-template-columns: 1fr 20%;
  grid-template-areas:
    "header header"
    "main nav";
`

const HeaderArea = styled.div`
  grid-area: header;
`

const MainArea = styled.main`
  grid-area: main;
  margin: 0 0 2rem;
`

const NavArea = styled.aside`
  grid-area: nav;
  overflow-wrap: break-word;
`

function BackToHome() {
  return (
    <div>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  )
}
