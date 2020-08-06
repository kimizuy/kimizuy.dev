import Head from 'next/head'
import Layout from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'
import Link from 'next/link'
import Date from '@/components/date'
import getAllPostPreviews from '@/lib/getAllPostPreviews'
import { Preview } from '@/types/post'
import { SITETITLE } from '@/lib/constants'
import Previews from '@/components/previews'

const previews: Preview[] = getAllPostPreviews()

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{SITETITLE}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          <a href="https://github.com/kimizuy">kimizuy</a> のブログです。
        </p>
      </section>
      <section className={`${utilStyles.padding1px}`}>
        <h2>Blog</h2>
        <Previews previews={previews} />
      </section>
    </Layout>
  )
}
