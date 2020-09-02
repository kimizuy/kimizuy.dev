import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/layout'
import { Preview } from '@/types/post'
import getAllTags from '@/lib/getAllTags'
import getSelectedTagPreviews from '@/lib/getSelectedTagPreviews'
import CardList from '@/components/cardList'

type Props = {
  selectedTag: string
  selectedTagPreviews: Preview[]
}

export default function Tag({ selectedTag, selectedTagPreviews }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <h1>#{selectedTag}</h1>
      <section>
        <CardList previews={selectedTagPreviews} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags().map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedTag = params.tag as string
  const selectedTagPreviews = getSelectedTagPreviews(selectedTag)
  return {
    props: {
      selectedTag,
      selectedTagPreviews,
    },
  }
}
