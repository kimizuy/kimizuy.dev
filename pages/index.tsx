import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Date from "../components/Date"
import Layout from "../components/Layout"
import { SITETITLE } from "../lib/constants"
import { getSortedPostsData } from "../lib/posts"
import utilStyles from "../styles/utils.module.css"
import { PostsData } from "../types/post"

type Props = { postsDataList: PostsData[] }

export default function Home({ postsDataList }: Props) {
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
        <ul className={utilStyles.list}>
          {postsDataList.map(({ slug, date, title }) => (
            <li className={utilStyles.listItem} key={slug}>
              <Link href="/posts/[slug]" as={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDataList = getSortedPostsData()

  return {
    props: {
      postsDataList,
    },
  }
}
