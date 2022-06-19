import { loadDefaultJapaneseParser } from 'budoux'
import { ReactNode } from 'react'
import styles from './budoux.module.css'

const parser = loadDefaultJapaneseParser()

const isJa = (value: string) => {
  return value.match(
    /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/
  )
    ? true
    : false
}

const parse = (value: string) => {
  return parser.parse(value).map((v, i) => {
    if (!isJa(v)) return v
    return (
      <span className={styles.text} key={v + i}>
        {v}
      </span>
    )
  })
}

export const parseChildren = (value: ReactNode) => {
  if (typeof value === 'string') {
    return parse(value)
  }

  if (Array.isArray(value)) {
    return value.map((v) => parseChildren(v))
  }

  return value
}
