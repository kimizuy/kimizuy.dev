import { CardList } from '@/components/cardList'
import { Layout } from '@/components/layout'
import { TagButtonList } from '@/components/tagButtonList'
import { SITE_URL } from '@/lib/constants'
import { getAllPostPreviews } from '@/lib/getAllPostPreviews'
import Head from 'next/head'
import profile from '../../public/profile.jpg'

const previews = getAllPostPreviews()

const Home: React.VFC = () => {
  return (
    <Layout sideBarItem={<TagButtonList />}>
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
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home
