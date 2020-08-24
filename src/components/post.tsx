import Date from '@/components/date'
import Layout from '@/components/layout'
import styles from './post.module.css'
import { Meta } from '@/types/post'
import Head from 'next/head'
import Tag from './tag'
import SEO from './SEO'

export default function Post({
  meta,
  children,
}: {
  meta: Meta
  children: React.ReactNode
}) {
  return (
    <Layout>
      <Head>
        <SEO meta={meta} />
      </Head>
      <article className={styles.container}>
        <h1 className={styles.headingXl}>{meta.title}</h1>
        <div className={styles.lightText}>
          {meta.tag.map((t) => (
            <Tag key={t} tag={t} />
          ))}
          <br />
          <Date date={meta.date} />
        </div>
        {children}
      </article>
    </Layout>
  )
}
