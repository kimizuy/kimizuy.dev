import { loadDefaultJapaneseParser } from 'budoux'
import { ReactNode } from 'react'
import styles from './budoux.module.css'

const parser = loadDefaultJapaneseParser()

const isJa = (value: string) => {
  const jaRegex =
    /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/

  return jaRegex.test(value)
}

const parseOnlyJa = (value: string) => {
  const parsed = parser.parse(value)
  const texts = parsed.map((v, i) => {
    if (!isJa(v)) return v

    return (
      <span className={styles.text} key={v + i}>
        {v}
      </span>
    )
  })

  return texts
}

export const parseChildren = (value: ReactNode) => {
  if (typeof value === 'string') return parseOnlyJa(value)

  if (Array.isArray(value)) return value.map((v) => parseChildren(v))

  return value
}
