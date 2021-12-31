import { ComponentMap } from 'mdx-bundler/client'
import Image from 'next/image'
import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { parse } from '../budoux'
import styles from './mdxComponents.module.css'

const CodeBlock: ComponentMap['pre'] = ({
  children: { props },
}: {
  // とりあえず…
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}) => {
  const { children, className = 'markup' } = props
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

export const getCustomComponents = (
  slug: string,
  setSrc?: (value: string) => void
): ComponentMap => {
  return {
    img: ({ src, alt }) => {
      const imgSrc = `/posts/${slug}/${src}`
      return (
        <Image
          src={imgSrc}
          alt={alt}
          width={1170}
          height={658.125}
          objectFit="contain"
          onClick={() => {
            setSrc(imgSrc)
          }}
        />
      )
    },
    pre: CodeBlock,
    p: ({ children, ...props }) => {
      return (
        <p className={styles.p} {...props}>
          {typeof children === 'string' ? parse(children) : children}
        </p>
      )
    },
    h1: ({ children }) => (
      <h1
        className={`${styles.heading} ${styles.h1}`}
        id={typeof children === 'string' && children}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={`${styles.heading} ${styles.h2}`}
        id={typeof children === 'string' && children}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => {
      return (
        <h3
          className={`${styles.heading} ${styles.h3}`}
          id={typeof children === 'string' && children}
        >
          {children}
        </h3>
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

    // use `parse()` from budoux
    em: ({ children, ...props }) => {
      if (typeof children === 'string') {
        return <em {...props}>{parse(children)}</em>
      }
      return <em {...props}>{children}</em>
    },
    a: ({ children, ...props }) => {
      if (typeof children === 'string') {
        return <a {...props}>{parse(children)}</a>
      }
      return <a {...props}>{children}</a>
    },
    li: ({ children, ...props }) => {
      if (typeof children === 'string') {
        return <li {...props}>{parse(children)}</li>
      }
      return <li {...props}>{children}</li>
    },
  }
}
