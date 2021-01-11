import Date from '@/components/date'
import Layout from '@/components/layout'
import { SITE_URL } from '@/lib/constants'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Meta } from '@/types/post'
import { Components, MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import CodeBlock from './codeBlock'
import LightText from './lightText'
import styles from './post.module.css'
import Tag from './tag'

const mdxComponents: Components = {
  img: (props) => {
    const { updateSrc } = useImageOverlay()

    return (
      // なぜか className が使えないので inline style を使う
      <div style={{ margin: '1rem auto' }}>
        <Image
          src={props.src}
          // https://nextjs.org/docs/api-reference/next/image#layout
          layout="responsive"
          objectFit="contain"
          width={1170}
          height={658.125}
          className={styles.img}
          onClick={() => {
            updateSrc(props.src)
          }}
        />
      </div>
    )
  },
  pre: (props) => <Fragment {...props} />,
  code: CodeBlock,
}

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
      <div className={styles.imgWrapper}>
        <Image src={src} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}
