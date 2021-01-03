import Date from '@/components/date'
import Layout from '@/components/layout'
import { SITE_URL } from '@/lib/constants'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Meta } from '@/types/post'
import { Components, MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CodeBlock from './codeBlock'
import LightText from './lightText'
import styles from './post.module.css'
import Tag from './tag'

const mdxComponents: Components = {
  img: (props) => {
    const { updateSrc } = useImageOverlay()

    return (
      <Image
        src={props.src}
        width={1170}
        height={658.125}
        objectFit="contain"
        className={styles.img}
        onClick={() => {
          updateSrc(props.src)
        }}
      />
    )
  },
  code: CodeBlock,
}

const Post: React.VFC<{
  meta: Meta
  children: React.ReactNode
}> = ({ meta, children }) => {
  const router = useRouter()

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
            {meta.tags.map((t) => (
              <Tag key={t} tag={t} />
            ))}
            <br />
            <Date date={meta.date} />
          </LightText>
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </article>
      </Layout>
      <ImageOverlay />
    </div>
  )
}

export default Post

const ImageOverlay: React.VFC = () => {
  const { src, updateSrc } = useImageOverlay()

  if (!src) return null

  return (
    <div className={styles.overlay} onClick={() => updateSrc('')}>
      <div className={styles.imgWrapper}>
        <Image src={src} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}
