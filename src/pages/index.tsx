import { CardList } from '@/components/cardList'
import { ContentLayout } from '@/components/contentLayout'
import { TagButtonList } from '@/components/tagButtonList'
import { SITE_URL } from '@/lib/constants'
import { fetchTweet } from '@/lib/fetchTweet'
import { getAllPostPreviews } from '@/lib/getAllPostPreviews'
import { InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Tweet as _Tweet } from 'react-static-tweets'
import useSWR, { SWRConfig } from 'swr'
import profile from '../../public/profile.jpg'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: NextPage<Props> = ({ fallback }) => {
  const previews = getAllPostPreviews()

  return (
    <SWRConfig
      value={{
        fallback,
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <ContentLayout
        home
        sideBarItem={
          <>
            <TagButtonList />
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
    </SWRConfig>
  )
}

const Tweet = () => {
  const { data } = useSWR('/api/tweet', { refreshInterval: 10000 })
  return <_Tweet id={data.tweetId} ast={data.tweetAst} />
}

export const getStaticProps = async () => {
  try {
    const tweet = await fetchTweet()

    return {
      props: { fallback: { '/api/tweet': tweet } },
      revalidate: 10,
    }
  } catch (err) {
    console.error(err)
  }
}

// eslint-disable-next-line import/no-default-export
export default Home
