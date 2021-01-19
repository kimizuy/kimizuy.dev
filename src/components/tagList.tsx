import styles from './tagList.module.css'
import Link from 'next/link'
import getAllTags from '@/lib/getAllTags'

const tags = getAllTags()

const TagList: React.VFC = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <TagButton key={tag} tag={tag} />
        ))}
      </ul>
    </section>
  )
}

const TagButton: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href="/tags/[tag]" as={`/tags/${tag}`}>
      <li className={styles.tag}>#{tag}</li>
    </Link>
  )
}

export default TagList
