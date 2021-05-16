import Link from 'next/link'
import styles from './tagLinks.module.css'

type Props = {
  tags: string[]
}

export const TagLinks: React.VFC<Props> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Link href="/tags/[tag]" as={`/tags/${tag}`} key={tag}>
          <a className={styles.tag}>#{tag}</a>
        </Link>
      ))}
    </div>
  )
}
