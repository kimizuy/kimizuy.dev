import Date from "components/Date"
import Layout, { siteTitle } from "components/Layout"
import { TagList } from "components/TagList"
import { format, parseISO } from "date-fns"
import { getSortedPostsData } from "lib/posts"
import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"
import styles from "styles/post.module.css"
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
    <Layout>
      <div className="post-feed">
        {allPostsData.map(({ id, date, title, tag }) => {
          return (
            <article className={styles.post} key={id}>
              <header className={styles.postheader}>
                <h2 className="post-title">
                  <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a rel="bookmark">{title}</a>
                  </Link>
                </h2>
                <div className="post-meta">
                  Published on <Date dateString={date} />
                </div>
              </header>

              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a className="post-thumbnail">
                  {/* <img
                      className="thumbnail"
                      src={post.page.image}
                      alt="{post.page.title}"
                    /> */}
                  image
                </a>
              </Link>

              <div className="post-content">description</div>
              <p className="read-more">
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a className="read-more-link">
                    Keep reading{" "}
                    <span
                      className="icon-arrow-right"
                      aria-hidden="true"
                    ></span>
                  </a>
                </Link>
              </p>
            </article>
          )
        })}
      </div>
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
