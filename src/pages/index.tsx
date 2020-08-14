import Head from 'next/head'
import Layout from '@/components/layout'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import { SITETITLE } from '@/lib/constants'
import CardList from '@/components/cardList'
import getAllTags from '@/lib/getAllTags'
import TagList from '@/components/tagList'

const previews = getAllPostPreviews()
const tags = getAllTags()

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{SITETITLE}</title>
      </Head>
      <section>
        <TagList tags={tags} />
        <CardList previews={previews} />
      </section>
    </Layout>
  )
}
