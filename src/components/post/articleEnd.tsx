import Link from 'next/link'
import styles from './articleEnd.module.css'

export const ArticleEnd: React.VFC = () => {
  return (
    <div className={styles.articleEndContainer}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <a href="https://twitter.com/kimizuy" target="_blank" rel="noreferrer">
        Discuss on Twitter
      </a>
    </div>
  )
}
