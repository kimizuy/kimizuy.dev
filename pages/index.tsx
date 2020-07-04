import { GetStaticProps } from "next"
import Head from "next/head"
import Layout from "../components/Layout"
import PostList from "../components/PostList"
import { SITETITLE } from "../lib/constants"
import { getSortedPostsData } from "../lib/posts"
import utilStyles from "../styles/utils.module.css"
import { Post } from "../types/post"

type Props = { posts: Post[] }

export default function Home({ posts }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{SITETITLE}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>フロントエンドエンジニヤー</p>
        <p>
          <a href="https://twitter.com/kimizuy">Twitter</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <PostList posts={posts} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData()

  return {
    props: {
      posts,
    },
  }
}
