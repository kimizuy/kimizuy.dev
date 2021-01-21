import Date from '@/components/date'
import Layout from '@/components/layout'
import { SITE_URL } from '@/lib/constants'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Meta } from '@/types/post'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LightText from './lightText'
import MDXComponents from './mdxComponents'
import styles from './post.module.css'
import Tag from './tag'

const Post: React.VFC<{
  meta: Meta
  children: React.ReactNode
}> = ({ meta, children }) => {
  const router = useRouter()

  return (
    <>
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
      <Layout>
        <article>
          <h1 className={styles.headingXl}>{meta.title}</h1>
          <LightText className={styles.lightText}>
            {meta.tags.map((t) => (
              <Tag key={t} tag={t} />
            ))}
            <br />
            <Date date={meta.date} />
          </LightText>
          <div className="post">
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </article>
        <ImageOverlay />
      </Layout>
    </>
  )
}

export default Post

const ImageOverlay: React.VFC = () => {
  const { src, updateSrc } = useImageOverlay()

  if (!src) return null

  return (
    <div className={styles.overlay} onClick={() => updateSrc('')}>
      <div className={styles.overlayImgWrapper}>
        <Image src={src} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}
