import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Page } from '../_app'
import styles from './tag.module.css'
import { CardList } from '@/components/cardList'
import { ContentLayout } from '@/components/contentLayout'
import { TagButtonList } from '@/components/tagButtonList'
import { getPreviews, getAllTags } from '@/lib/mdx'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Tag: Page<Props> = ({ previews, selectedTag, selectedTagPreviews }) => {
  return (
    <ContentLayout sideBarItem={<TagButtonList previews={previews} />}>
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
  const paths = await getAllTags().then((tags) =>
    tags.map((tag) => {
      return {
        params: {
          tag,
        },
      }
    })
  )

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ tag: string }>
) => {
  const previews = await getPreviews()
  const selectedTag = context.params.tag
  const selectedTagPreviews = previews.filter(({ frontmatter }) =>
    frontmatter.tags.includes(selectedTag)
  )

  return {
    props: {
      previews,
      selectedTag,
      selectedTagPreviews,
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Tag
