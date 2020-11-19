import Date from '@/components/date'
import Layout from '@/components/layout'
import { SITE_URL } from '@/lib/constants'
import { Meta } from '@/types/post'
import { Components, MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LightText from './lightText'
import styles from './post.module.css'
import Tag from './tag'

export const mdxComponents: Components = {
  img: (props) => (
    // @ts-expect-error: "src" is required
    <Image {...props} width={1170} height={658.125} objectFit="contain" />
  ),
}

const Post: React.FC<{
  meta: Meta
  children: React.ReactNode
}> = ({ meta, children }) => {
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <title>{meta.title} – kimizuy blog</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta name="twitter:title" content={`${meta.title} – kimizuy blog`} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${SITE_URL}${meta.image}`} />
        <meta property="og:url" content={`${SITE_URL}${router.pathname}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} – kimizuy blog`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`${SITE_URL}${meta.image}`} />
        <meta name="description" content={meta.description}></meta>
      </Head>
      <article className={styles.container}>
        <h1 className={styles.headingXl}>{meta.title}</h1>
        <LightText>
          {meta.tag.map((t) => (
            <Tag key={t} tag={t} />
          ))}
          <br />
          <Date date={meta.date} />
        </LightText>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </article>
    </Layout>
  )
}

export default Post
