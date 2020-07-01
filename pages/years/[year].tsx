import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { getAllYears, getSelectedYearData } from "../../lib/years"
import utilStyles from "../../styles/utils.module.css"
import { FrontMatterType } from "../../types/post"
import Layout from "../../components/Layout"
import Date from "../../components/Date"

type Props = {
  selectedYear: string
  selectedYearPostsData: (FrontMatterType & { id: string })[]
}

export default function Year({ selectedYear, selectedYearPostsData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{selectedYear}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>{selectedYear}</h2>
        <ul className={utilStyles.list}>
          {selectedYearPostsData.map(({ id, date, title, tag }) => (
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
  const paths = getAllYears()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedYear = params?.year as string
  const selectedYearPostsData = getSelectedYearData(selectedYear)
  return {
    props: {
      selectedYear,
      selectedYearPostsData,
    },
  }
}
