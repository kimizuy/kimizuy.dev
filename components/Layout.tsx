import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import { useRouter } from "next/dist/client/router"

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
        {home ? (
          <Header name={name} siteTitle={siteTitle} />
        ) : (
          <Linkable
            onClick={() => {
              router.push("/")
            }}
          >
            <Header name={name} siteTitle={siteTitle} />
          </Linkable>
        )}
        <main>{children}</main>
        {!home && (
          <BackToHome>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </BackToHome>
        )}
      </Body>
      {home && <Sidebar>WIP</Sidebar>}
    </Container>
  )
}

const Container = styled.div`
  max-width: 48rem;
  padding: 0 1rem;
  margin: 1rem auto 4rem;
  display: flex;
  justify-content: space-between;
`

const Body = styled.div``

const Sidebar = styled.aside`
  margin: 3rem 0;
  width: 20%;
  word-break: break-all;
`

const Flex = styled.div`
  display: flex;
`

const HeaderImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
`

const HeaderTitle = styled.h1`
  font-weight: 800;
  margin: auto 0.5rem;
`

const Linkable = styled.div`
  cursor: pointer;
  display: inline-block;
`

const BackToHome = styled.div`
  margin: 3rem 0 0;
`

function Header({ name, siteTitle }: { name: string; siteTitle: string }) {
  return (
    <Flex>
      <HeaderImage src="/images/profile.jpg" alt={name} />
      <HeaderTitle>{siteTitle}</HeaderTitle>
    </Flex>
  )
}
