import Head from "next/head"
import utilStyles from "styles/utils.module.css"
import Link from "next/link"
import styled from "styled-components"

const name = "kimizuy"
export const siteTitle = "kimizuy blog"

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
      <Header>
        {home ? (
          <>
            <HeaderHomeImage src="/images/profile.jpg" alt={name} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <HeaderImage src="/images/profile.jpg" alt={name} />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </Header>
      <main>{children}</main>
      {!home && (
        <BackToHome>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </BackToHome>
      )}
    </Container>
  )
}

const Container = styled.div`
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
`

const HeaderHomeImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
`

const BackToHome = styled.div`
  margin: 3rem 0 0;
`
