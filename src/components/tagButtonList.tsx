import Link from 'next/link'
import styles from './tagButtonList.module.css'
import { Preview } from '@/types/post'

type Props = {
  previews: Preview[]
}

export const TagButtonList: React.VFC<Props> = ({ previews }) => {
  const tags = [
    ...new Set(previews.map((v) => v.frontmatter.tags).flatMap((tag) => tag)),
  ]

  return (
    <ul className={styles.tagButtonList}>
      {tags.map((tag) => (
        <li key={tag} className={styles.listItem}>
          <TagButton tag={tag} />
        </li>
      ))}
    </ul>
  )
}

const TagButton: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <Link scroll={false} href="/tags/[tag]" as={`/tags/${tag}`} passHref>
      <button className={styles.tagButton}>#{tag}</button>
    </Link>
  )
}
