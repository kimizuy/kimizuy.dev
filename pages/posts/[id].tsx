import Layout from "components/Layout"
import { getAllPostIds, getPostData } from "lib/posts"
import Head from "next/head"
import Date from "components/Date"
import utilStyles from "styles/utils.module.css"
import { GetStaticProps, GetStaticPaths } from "next"
import PostType from "types/post"

type Props = {
  postData: PostType
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.lightText}>
          {typeof postData.tag === "string"
            ? postData.tag
            : postData.tag?.join(", ")}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string)
  return {
    props: {
      postData,
    },
  }
}
