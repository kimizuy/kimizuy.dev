import styles from './tagList.module.css'
import Link from 'next/link'

type Props = {
  tags: string[]
}

export default function TagList(p: Props) {
  return (
    <section className={styles.container}>
      <ul className={styles.tagList}>
        {p.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </ul>
    </section>
  )
}

function Tag({ tag }: { tag: string }) {
  return (
    <li className={styles.tag}>
      <Link href="/tags/[tag]" as={`/tags/${tag}`}>
        <a>#{tag}</a>
      </Link>
    </li>
  )
}
