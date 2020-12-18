import Layout from '@/components/layout'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import CardList from '@/components/cardList'
import getAllTags from '@/lib/getAllTags'
import TagList from '@/components/tagList'
import Head from 'next/head'
import profile from '../../public/profile.jpg'
import { SITE_URL } from '@/lib/constants'

const previews = getAllPostPreviews()
const tags = getAllTags()

const Home: React.VFC = () => {
  return (
    <Layout home>
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
      <TagList tags={tags} />
      <CardList previews={previews} />
    </Layout>
  )
}

export default Home
