import styles from './cardList.module.css'
import { Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'
import Tag from './tag'

type Props = {
  previews: Preview[]
}

export default function CardList(p: Props) {
  return (
    <section className={styles.container}>
      <ul className={styles.cardList}>
        {p.previews.map((preview) => (
          <Card preview={preview} key={preview.link} />
        ))}
      </ul>
    </section>
  )
}

function Card({ preview }: { preview: Preview }) {
  const { link, meta } = preview

  return (
    <li className={styles.card}>
      <Link href={link}>
        <div className={styles.imgWrapper}>
          <div className={styles.imgZoom}>
            <img src={meta.image} />
          </div>
        </div>
      </Link>
      <div className={styles.title}>
        <Link href={link}>
          <a>{meta.title}</a>
        </Link>
      </div>
      <div className={styles.lightText}>
        {meta.tag.map((t) => (
          <Tag key={t} tag={t} />
        ))}
        <br />
        <Date date={meta.date} />
      </div>
    </li>
  )
}
