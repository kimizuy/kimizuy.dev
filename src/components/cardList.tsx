import styles from './cardList.module.css'
import { Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'

type Props = {
  previews: Preview[]
}

export default function CardList(p: Props) {
  return (
    <ul className={styles.container}>
      {p.previews.map((preview) => (
        <Card preview={preview} key={preview.link} />
      ))}
    </ul>
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
        <div className={styles.lightText}>
          <Date dateString={meta.date} />
        </div>
      </div>
    </li>
  )
}
