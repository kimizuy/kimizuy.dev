import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Tweet as _Tweet } from 'react-static-tweets'
import useSWR from 'swr'
import profile from '../../public/profile.jpg'
import { Page } from './_app'
import { ContentLayout } from '@/components/contentLayout'
import { TagButtonList } from '@/components/tagButtonList'
import { SITE_URL } from '@/lib/constants'
import { getPreviews } from '@/lib/mdx'
import { CardList } from '@/components/cardList'
import { generateRSSFeed } from '@/lib/rss'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: Page<Props> = ({ previews }) => {
  return (
    // FIXME: fetchTweet.ts
    // <SWRConfig
    //   value={{
    //     fallback,
    //     fetcher: (url: string) => fetch(url).then((res) => res.json()),
    //   }}
    // >
    <ContentLayout
      home
      sideBarItem={
        <>
          <TagButtonList previews={previews} />
          <Tweet />
        </>
      }
    >
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta name="twitter:title" content="kimizuy blog" />
        <meta name="twitter:description" content="kimizuy のブログです" />
        <meta name="twitter:image" content={`${SITE_URL}${profile}`} />
        <meta property="og:url" content="${SITE_URL}" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="kimizuy blog" />
        <meta property="og:description" content="kimizuy のブログです" />
        <meta property="og:image" content={`${SITE_URL}${profile}`} />
        <title>kimizuy blog</title>
        <meta name="description" content="kimizuy のブログです" />
      </Head>
      <CardList previews={previews} />
    </ContentLayout>
    // </SWRConfig>
  )
}

const Tweet = () => {
  const { data } = useSWR('/api/tweet', { refreshInterval: 10000 })
  if (!data) return null
  return <_Tweet id={data.tweetId} ast={data.tweetAst} />
}

export const getStaticProps = async () => {
  try {
    // const tweet = await fetchTweet()
    const previews = await getPreviews()

    generateRSSFeed(previews)

    return {
      // props: { fallback: { '/api/tweet': tweet ? tweet : null }, previews },
      props: { previews },
      // revalidate: 10,
    }
  } catch (err) {
    console.error(err)
  }
}

Home.getLayout = (page) => {
  return <>{page}</>
}

// eslint-disable-next-line import/no-default-export
export default Home
