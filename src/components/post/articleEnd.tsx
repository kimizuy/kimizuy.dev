import Link from 'next/link'
import styles from './articleEnd.module.css'

export const ArticleEnd: React.VFC = () => {
  return (
    <div className={styles.articleEndContainer}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <Link href="https://twitter.com/kimizuy">
        <a>Discuss on Twitter</a>
      </Link>
    </div>
  )
}
