import styles from './cardList.module.css'
import utilStyles from '@/styles/utils.module.css'
import { Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'
import profile from '../../public/images/profile.jpg'

type Props = {
  previews: Preview[]
}

export default function Previews(p: Props) {
  return (
    <div className={styles.container}>
      {p.previews.map((preview) => (
        <Card preview={preview} key={preview.link} />
      ))}
    </div>
  )
}

function Card({ preview }: { preview: Preview }) {
  const {
    link,
    module: { default: Excerpt, meta },
  } = preview

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <div className={styles.imgZoom}>
          <img src={profile} />
        </div>
      </div>
      <div className={styles.title}>
        <Link href={link}>
          <a>{meta.title}</a>
        </Link>
        <div className={utilStyles.lightText}>
          <Date dateString={meta.date} />
        </div>
      </div>
    </div>
  )
}
