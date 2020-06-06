import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Date from "../components/date"
import Layout, { siteTitle } from "../components/layout"
import { TagList } from "../components/TagList"
import { getSortedPostsData } from "../lib/posts"
import utilStyles from "../styles/utils.module.css"
import { FrontMatterType } from "../types/post"
import { format, parseISO } from "date-fns"

type Props = {
  allPostsData: (FrontMatterType & { id: string })[]
}

export default function Home({ allPostsData }: Props) {
  const tags = [...new Set(allPostsData.flatMap(v => v.tag))]
  const years = [
    ...new Set(allPostsData.map(v => format(parseISO(v.date), "yyyy"))),
  ]

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Front-end Engineer</p>
        <p>
          <a href="https://github.com/kimizuy">GitHub</a> /{" "}
          <a href="https://twitter.com/kimizuy">Twitter</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <TagList tags={tags} />
        {years.map(year => (
          <Link href="/years/[year]" as={`/years/${year}`} key={year}>
            <a>{year}</a>
          </Link>
        ))}
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tag }) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
