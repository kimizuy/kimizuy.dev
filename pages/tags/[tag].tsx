import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Date from "../../components/date"
import Layout from "../../components/layout"
import { getAllTags, getSelectedTagData } from "../../lib/tags"
import utilStyles from "../../styles/utils.module.css"
import { FrontMatterType } from "../../types/post"

type Props = {
  selectedTag: string
  selectedTagPostsData: (FrontMatterType & { id: string })[]
}

export default function Tag({ selectedTag, selectedTagPostsData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{selectedTag}</h2>
        <ul className={utilStyles.list}>
          {selectedTagPostsData.map(({ id, date, title, tag }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
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
