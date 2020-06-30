import Date from "components/Date"
import Layout, { siteTitle } from "components/Layout"
import { TagList } from "components/TagList"
import { format, parseISO } from "date-fns"
import { getSortedPostsData } from "lib/posts"
import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import utilStyles from "styles/utils.module.css"
import { FrontMatterType } from "types/post"

type Props = {
  allPostsData: (FrontMatterType & { id: string })[]
}

export default function Home({ allPostsData }: Props) {
  const tags = [...new Set(allPostsData.flatMap((v) => v.tag))]
  const years = [
    ...new Set(allPostsData.map((v) => format(parseISO(v.date), "yyyy"))),
  ]

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Front-end Engineer</p>
        <p>
          <a href="https://github.com/kimizuy">GitHub</a>
          {" / "}
          <a href="https://twitter.com/kimizuy">Twitter</a>
        </p>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <TagList tags={tags} />
        <p>
          {years.map((year) => (
            <Link href="/years/[year]" as={`/years/${year}`} key={year}>
              <a>{year}</a>
            </Link>
          ))}
        </p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tag }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <LightText>
                <Date dateString={date} />
                <br />
                {typeof tag === "string" ? tag : tag?.join(", ")}
              </LightText>
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

const LightText = styled.div`
  margin: 0 0;
  font-size: 0.8rem;
  color: #999;
`
