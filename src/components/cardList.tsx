import { Date } from '@/components/date'
import { Preview } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'
import styles from './cardList.module.css'
import { TagLinks } from './tagLinks'

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
  const {
    slug,
    module: { meta },
  } = preview

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <Image src={meta.image} alt={slug} layout="fill" />
      </div>
      <div className={styles.meta}>
        <div>
          <Link href={`/posts/${slug}`}>
            <a className={styles.title}>{meta.title}</a>
          </Link>
        </div>
        <div className={styles.tagsAndDate}>
          <TagLinks tags={meta.tags} />
          <Date date={meta.date} />
        </div>
      </div>
    </div>
  )
}
