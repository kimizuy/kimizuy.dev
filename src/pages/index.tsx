import Layout from '@/components/layout'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import CardList from '@/components/cardList'
import getAllTags from '@/lib/getAllTags'
import TagList from '@/components/tagList'
import Head from 'next/head'
import profile from '../../public/profile.jpg'

const previews = getAllPostPreviews()
const tags = getAllTags()

export default function Home() {
  return (
    <Layout home>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta name="twitter:title" content="kimizuy blog" />
        <meta name="twitter:description" content="kimizuy のブログです" />
        <meta
          name="twitter:image"
          content={`https://blog.kimizuy.dev${profile}`}
        />
        <meta property="og:url" content="https://blog.kimizuy.dev" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="kimizuy blog" />
        <meta property="og:description" content="kimizuy のブログです" />
        <meta
          property="og:image"
          content={`https://blog.kimizuy.dev${profile}`}
        />
        <title>kimizuy blog</title>
        <meta name="description" content="kimizuy のブログです" />
      </Head>
      <TagList tags={tags} />
      <CardList previews={previews} />
    </Layout>
  )
}
