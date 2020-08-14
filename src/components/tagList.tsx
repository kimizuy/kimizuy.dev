import styles from './tagList.module.css'
import Link from 'next/link'

type Props = {
  tags: string[]
}

export default function TagList(p: Props) {
  return (
    <div className={styles.container}>
      {p.tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  )
}

function Tag({ tag }: { tag: string }) {
  return (
    <Link href="/tags/[tag]" as={`/tags/${tag}`}>
      <button className={`${styles.tag}`}>#{tag}</button>
    </Link>
  )
}
