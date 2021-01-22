import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import React from 'react'
import styles from './codeBlock.module.css'

const CodeBlock: React.VFC<{
  children: string
  className: string
}> = ({ children, className }) => {
  const splited = className.replace(/language-/, '').split(':')
  const language = splited[0] as Language
  const fileName = splited[splited.length - 1]

  return (
    <div className={styles.container}>
      <span className={styles.fileName}>{fileName}</span>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className={styles.line}
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
    </div>
  )
}

export default CodeBlock
