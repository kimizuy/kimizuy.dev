import { loadDefaultJapaneseParser } from 'budoux'
import styles from './budoux.module.css'

export const parse = (text: string) => {
  const parser = loadDefaultJapaneseParser()
  return parser.parse(text).map((str) => (
    <span className={styles.text} key={str}>
      {str}
    </span>
  ))
}
