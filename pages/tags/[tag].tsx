import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import utilStyles from "styles/utils.module.css"
import Date from "../../components/Date"
import Layout from "../../components/Layout"
import { getAllTags, getSelectedTagData } from "../../lib/tags"
import { PostsData } from "../../types/post"

type Props = {
  selectedTag: string
  postsDataList: PostsData[]
}

export default function Tag({ selectedTag, postsDataList }: Props) {
  return (
    <Layout>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{selectedTag}</h2>
        <ul className={utilStyles.list}>
          {postsDataList.map(({ slug, date, title, tag }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
              <small>{typeof tag === "string" ? tag : tag?.join(", ")}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedTag = params?.tag as string
  const selectedTagPostsData = getSelectedTagData(selectedTag)
  return {
    props: {
      selectedTag,
      selectedTagPostsData,
    },
  }
}
