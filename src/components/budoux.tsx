import { loadDefaultJapaneseParser } from 'budoux'
import { ReactNode } from 'react'
import styles from './budoux.module.css'

const parser = loadDefaultJapaneseParser()

const parse = (value: string) => {
  return parser.parse(value).map((v, i) => (
    <span className={styles.text} key={v + i}>
      {v}
    </span>
  ))
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
