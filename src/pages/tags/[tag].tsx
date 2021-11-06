import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Page } from '../_app'
import styles from './tag.module.css'
import { CardList } from '@/components/cardList'
import { ContentLayout } from '@/components/contentLayout'
import { TagButtonList } from '@/components/tagButtonList'
import { getAllTags } from '@/lib/getAllTags'
import { getSelectedTagPreviews } from '@/lib/getSelectedTagPreviews'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Tag: Page<Props> = ({ selectedTag, selectedTagPreviews }) => {
  return (
    <ContentLayout sideBarItem={<TagButtonList />}>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <h1 className={styles.tagTitle}>#{selectedTag}</h1>
      <section>
        <CardList previews={selectedTagPreviews} />
      </section>
    </ContentLayout>
  )
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string }>
) => {
  const selectedTag = context.params.tag
  const selectedTagPreviews = getSelectedTagPreviews(selectedTag)
  return {
    props: {
      selectedTag,
      selectedTagPreviews,
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Tag
