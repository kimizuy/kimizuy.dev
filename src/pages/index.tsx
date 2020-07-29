import Head from 'next/head'
import Layout, { siteTitle } from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'
import Date from '@/components/date'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import { Meta } from '@/types/post'

type Post = { link: string; module: { default: any; meta: Meta } }

const posts: Post[] = getAllPostPreviews()

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ link, module: { default: Excerpt, meta } }) => (
            <li className={utilStyles.listItem} key={link}>
              <Link href={link}>
                <a>{meta.title}</a>
              </Link>
              <br />
              <Excerpt />
              <small className={utilStyles.lightText}>
                <Date dateString={meta.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
