import { Date } from '@/components/date'
import { TagLinks } from '@/components/tagLinks'
import { SITE_URL } from '@/lib/constants'
import { Meta } from '@/types/post'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ArticleEnd } from './articleEnd'
import styles from './index.module.css'
import { MDXComponents } from './mdxComponents'
import { Toc } from './toc'
import { ContentLayout } from '../contentLayout'

export const Post: React.VFC<{
  meta: Meta
  children: React.ReactNode
}> = ({ meta, children }) => {
  const router = useRouter()

  return (
    <ContentLayout sideBarItem={<Toc />}>
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
      <article>
        <header>
          <h1 className={styles.title}>{meta.title}</h1>
          <div className={styles.meta}>
            <TagLinks tags={meta.tags} />
            <Date date={meta.date} />
          </div>
        </header>
        <main className="post">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </main>
        <footer>
          <ArticleEnd />
        </footer>
      </article>
    </ContentLayout>
  )
}
