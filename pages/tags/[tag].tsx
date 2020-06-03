import Layout, { siteTitle } from "../../components/layout"
import Head from "next/head"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"
import { GetStaticProps, GetStaticPaths } from "next"
import { MetaPostType } from "../../types/post"
import Link from "next/link"
import { getSelectedTagPostIds, getSortedPostsData } from "../../lib/tags"

// type Props = {
//   postData: PostType
// }

type SelectedTagPost = MetaPostType & { id: string }

type Props = {
  selectedTag: string
  selectedTagPosts: SelectedTagPost[]
}

export default function Home({ selectedTag, selectedTagPosts }: Props) {
  return (
    <Layout>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* <h2 className={utilStyles.headingLg}>Blog</h2> */}
        <ul className={utilStyles.list}>
          {selectedTagPosts.map(({ id, date, title, tag }) => (
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
  const paths = getSelectedTagPostIds()
  return {
    paths,
    fallback: false,
  }
}

// export const getStaticProps: GetStaticProps = async () => {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.tag as string)
  console.log(params?.id)
  return {
    props: {
      postData,
    },
  }
}
