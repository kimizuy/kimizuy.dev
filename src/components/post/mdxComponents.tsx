import { getSrcName } from '@/lib/utils'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import { Components } from '@mdx-js/react'
import Image from 'next/image'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { Fragment } from 'react'
import styles from './mdxComponents.module.css'

const CodeBlock: React.VFC<{
  children: string
  className: string
}> = ({ children, className = 'markup' }) => {
  const splited = className.replace(/language-/, '').split(':')
  const language = splited[0] as Language
  const fileName = splited[1]

  return (
    <div className={styles.codeBlock}>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.pre} ${
              !fileName && styles.noFileName
            }`}
            style={style}
          >
            {fileName && <span className={styles.fileName}>{fileName}</span>}
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className={styles.line}
              >
                <span className={styles.lineNo}>
                  {tokens.length > 1 ? i + 1 : ''}
                </span>
                <span className={styles.lineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export const MDXComponents: Components = {
  img: ({ src: imgSrc, ...props }) => {
    // Hooks を含む関数はアッパーケースで書くべきだが、とりあえず回避する
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { setSrc } = useImageOverlay()
    const { src } = imgSrc
    const srcName = getSrcName(src)

    return (
      <div className={styles.imgWrapper}>
        <Image
          src={src}
          alt={srcName}
          layout="responsive"
          objectFit="contain"
          width={1170}
          height={658.125}
          className={styles.img}
          onClick={() => {
            setSrc(src)
          }}
          {...props}
        />
      </div>
    )
  },
  pre: (props) => <Fragment {...props} />,
  code: CodeBlock,
  p: (props) => <p {...props} className={styles.p} />,
  h1: ({ children, props }) => {
    return (
      <h1
        id={children}
        className={`${styles.heading} ${styles.h1}`}
        {...props}
      />
    )
  },
  h2: ({ children, props }) => {
    return (
      <h2
        id={children}
        className={`${styles.heading} ${styles.h2}`}
        {...props}
      />
    )
  },
  h3: ({ children, props }) => {
    return (
      <h3
        id={children}
        className={`${styles.heading} ${styles.h3}`}
        {...props}
      />
    )
  },
  ul: (props) => <ul className={styles.ul} {...props} />,
  ol: (props) => <ol className={styles.ol} {...props} />,
  div: (props) => {
    if (props.className === 'footnotes') {
      return <div {...props} className={styles.footnotes} />
    }
    return <div {...props} />
  },
  blockquote: (props) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
}
