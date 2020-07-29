import Date from '@/components/date'
import Layout from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'
import { Meta } from '@/types/post'
import Head from 'next/head'

export default function Post({ meta, children }: { meta: Meta; children: React.ReactNode }) {
  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{meta.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={meta.date} />
        </div>
        {children}
      </article>
    </Layout>
  )
}
