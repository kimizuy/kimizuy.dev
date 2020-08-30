import Date from '@/components/date'
import Layout from '@/components/layout'
import { Meta } from '@/types/post'
import { Components, MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from './post.module.css'
import Tag from './tag'
import utilStyles from './utils.module.css'

const mdxComponents: Components = {
  img: (props) => <img className={styles.image} loading="lazy" {...props} />,
}

export default function Post({
  meta,
  children,
}: {
  meta: Meta
  children: React.ReactNode
}) {
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
        <meta
          name="twitter:image"
          content={`https://blog.kimizuy.dev${meta.image}`}
        />
        <meta
          property="og:url"
          content={`https://blog.kimizuy.dev${router.pathname}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} – kimizuy blog`} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content={`https://blog.kimizuy.dev${meta.image}`}
        />
        <meta name="description" content={meta.description}></meta>
      </Head>
      <article className={styles.container}>
        <h1 className={styles.headingXl}>{meta.title}</h1>
        <div className={utilStyles.lightText}>
          {meta.tag.map((t) => (
            <Tag key={t} tag={t} />
          ))}
          <br />
          <Date date={meta.date} />
        </div>
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </article>
    </Layout>
  )
}
