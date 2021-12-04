import path from 'path'
import { readFileSync } from 'fs'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import Head from 'next/head'
import { Page } from '../_app'
import styles from './slug.module.css'
import { postFilePaths, POSTS_PATH } from '@/lib/mdx'
import { ContentLayout } from '@/components/contentLayout'
import { isFrontmatter } from '@/lib/typePredicates'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { getCustomComponents } from '@/components/post/mdxComponents'
import { SITE_URL } from '@/lib/constants'
import { ArticleEnd } from '@/components/post/articleEnd'
import { Toc } from '@/components/post/toc'
import { TagLinks } from '@/components/tagLinks'
import { Date } from '@/components/date'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Home: Page<Props> = ({ slug, code, frontmatter }) => {
  const { setSrc } = useImageOverlay()
  const Component = useMemo(() => getMDXComponent(code), [code])
  const customComponents = getCustomComponents(slug, setSrc)

  return (
    <ContentLayout sideBarItem={<Toc />}>
      <Head>
        <title>{frontmatter.title} – kimizuy blog</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta
          name="twitter:title"
          content={`${frontmatter.title} – kimizuy blog`}
        />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/posts/${slug}/${frontmatter.image}`}
        />
        <meta property="og:url" content={`${SITE_URL}/${slug}`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${frontmatter.title} – kimizuy blog`}
        />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:image"
          content={`${SITE_URL}/posts/${slug}/${frontmatter.image}`}
        />
        <meta name="description" content={frontmatter.description}></meta>
      </Head>
      <article>
        <header>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <div className={styles.meta}>
            <TagLinks tags={frontmatter.tags} />
            <Date publishedAt={frontmatter.publishedAt} />
          </div>
        </header>
        <main className="post">
          <Component components={customComponents} />
        </main>
        <footer>
          <ArticleEnd />
        </footer>
      </article>
    </ContentLayout>
  )
}

export const getStaticPaths = async () => {
  const paths = postFilePaths.map((slug) => {
    return {
      params: {
        slug,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const { slug } = context.params
  const postFilePath = path.join(POSTS_PATH, slug, 'index.mdx')
  const source = readFileSync(postFilePath, 'utf-8')
  const { code, frontmatter } = await bundleMDX(source)

  return {
    props: {
      slug,
      code,
      frontmatter: isFrontmatter(frontmatter) ? frontmatter : null,
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Home
