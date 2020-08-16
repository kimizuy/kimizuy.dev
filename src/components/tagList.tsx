import styles from './tagList.module.css'
import Link from 'next/link'

type Props = {
  tags: string[]
}

export default function TagList(p: Props) {
  return (
    <ul className={styles.container}>
      {p.tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  )
}

function Tag({ tag }: { tag: string }) {
  return (
    <Link href="/tags/[tag]" as={`/tags/${tag}`}>
      <li>
        <a className={`${styles.tag}`}>#{tag}</a>
      </li>
    </Link>
  )
}
