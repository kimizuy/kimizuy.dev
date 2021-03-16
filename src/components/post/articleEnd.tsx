import Link from 'next/link'
import styles from './articleEnd.module.css'

export const ArticleEnd: React.VFC = () => {
  return (
    <div className={styles.articleEndContainer}>
      <div>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
      <div>
        <Link href="https://twitter.com/kimizuy">
          <a>Discuss on Twitter</a>
        </Link>
      </div>
    </div>
  )
}
