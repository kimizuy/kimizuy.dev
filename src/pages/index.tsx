import Head from 'next/head'
import Layout from '@/components/layout'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import { Preview } from '@/types/post'
import { SITETITLE } from '@/lib/constants'
import CardList from '@/components/cardList'

const previews: Preview[] = getAllPostPreviews()

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{SITETITLE}</title>
      </Head>
      <section>
        <CardList previews={previews} />
      </section>
    </Layout>
  )
}
