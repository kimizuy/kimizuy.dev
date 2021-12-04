import Image from 'next/image'
import Link from 'next/link'
import styles from './cardList.module.css'
import { TagLinks } from './tagLinks'
import { Date } from '@/components/date'
import { Preview } from '@/types/post'

type Props = {
  previews: Preview[]
}

export const CardList: React.VFC<Props> = (p: Props) => {
  return (
    <ul
      // Enable :active for iOS
      onTouchStart={() => {
        return ''
      }}
      className={styles.cardList}
    >
      {p.previews.map((preview) => (
        <li key={preview.slug} className={styles.listItem}>
          <Card preview={preview} key={preview.slug} />
        </li>
      ))}
    </ul>
  )
}

const Card: React.VFC<{ preview: Preview }> = ({ preview }) => {
  const { slug, frontmatter } = preview
  const src = `/posts/${slug}/${frontmatter.image}`

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.imgWrapper}>
          <Image src={src} alt={slug} layout="fill" />
        </div>
        <div className={styles.frontmatter}>
          <Link href={`/posts/${slug}`}>
            <a className={styles.title}>{frontmatter.title}</a>
          </Link>
        </div>
      </div>
      <div className={styles.tagsAndDate}>
        <TagLinks tags={frontmatter.tags} />
        <Date publishedAt={frontmatter.publishedAt} />
      </div>
    </div>
  )
}
