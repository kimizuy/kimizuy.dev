import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Components } from '@mdx-js/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { CodeBlock } from './codeBlock'
import styles from './mdxComponents.module.css'

export const MDXComponents: Components = {
  img: (props) => {
    const { updateSrc } = useImageOverlay()
    const src: string = props.src
    const srcName = src.split('/')[src.split('/').length - 1].split('.')[0]

    return (
      <div className={styles.imgWrapper}>
        <Image
          src={src}
          alt={srcName}
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
  p: (props) => <p className={styles.p}>{props.children}</p>,
  h1: (props) => {
    return (
      <h1 id={props.children} className={styles.h1}>
        {props.children}
      </h1>
    )
  },
  h2: (props) => {
    return (
      <h2 id={props.children} className={styles.h2}>
        {props.children}
      </h2>
    )
  },
  h3: (props) => {
    return (
      <h3 id={props.children} className={styles.h3}>
        {props.children}
      </h3>
    )
  },
  ul: (props) => <ul className={styles.ul}>{props.children}</ul>,
  ol: (props) => <ol className={styles.ol}>{props.children}</ol>,
}
