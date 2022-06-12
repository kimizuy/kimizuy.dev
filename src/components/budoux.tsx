import { loadDefaultJapaneseParser } from 'budoux'
import { ReactNode } from 'react'
import styles from './budoux.module.css'

const parse = (value: string) => {
  const parser = loadDefaultJapaneseParser()
  return parser.parse(value).map((v, i) => (
    <span className={styles.text} key={v + i}>
      {v}
    </span>
  ))
}

export const parseChildren = (value: ReactNode) => {
  if (typeof value === 'string') return parse(value)

  if (Array.isArray(value)) {
    return value.map((v) => {
      if (typeof v === 'string') {
        return parse(v)
      }
      return parseChildren(v)
    })
  }

  return value
}
