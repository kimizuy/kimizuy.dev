import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import React from 'react'
import styles from './codeBlock.module.css'
import theme from 'prism-react-renderer/themes/vsDark'

const CodeBlock: React.VFC<{
  children: string
  className: string
}> = ({ children, className }) => {
  const language = className.replace(/language-/, '') as Language

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${styles.pre} ${className}`}
          style={{ ...style, padding: '20px' }}
        >
          {tokens.map((line, i) => (
            <div
              className={styles.line}
              key={i}
              {...getLineProps({ line, key: i })}
            >
              <span className={styles.lineNo}>{i + 1}</span>
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
  )
}

export default CodeBlock
