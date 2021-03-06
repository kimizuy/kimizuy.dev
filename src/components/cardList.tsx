import { Date } from '@/components/date'
import { Preview } from '@/types/post'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './cardList.module.css'

type Props = {
  previews: Preview[]
}

export const CardList: React.VFC<Props> = (p: Props) => {
  return (
    <div
      onTouchStart={() => {
        return ''
      }} // Enable :active for iOS
      className={styles.cardList}
    >
      {p.previews.map((preview) => (
        <Card preview={preview} key={preview.link} />
      ))}
    </div>
  )
}

const Card: React.VFC<{ preview: Preview }> = ({ preview }) => {
  const {
    link,
    module: { meta },
  } = preview

  return (
    <Link href={link}>
      <a className={styles.card}>
        <div className={styles.imgWrapper}>
          <Image src={meta.image} alt={link} layout="fill" />
        </div>
        <div className={styles.contentWrapper}>
          <header>
            <h1>{meta.title}</h1>
          </header>
          <footer>
            <p className={styles.meta}>
              {meta.tags.map((tag) => (
                <>
                  <Link key={tag} href="/tags/[tag]" as={`/tags/${tag}`}>
                    <a className={styles.tag}>#{tag}</a>
                  </Link>{' '}
                </>
              ))}
              <Date date={meta.date} />
            </p>
          </footer>
        </div>
      </a>
    </Link>
  )
}
