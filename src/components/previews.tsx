import styles from './previews.module.css'
import { Meta, Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'

type Props = {
  previews: Preview[]
}

export default function Previews(p: Props) {
  return (
    <ul className={styles.list}>
      {p.previews.map(({ link, module: { default: Excerpt, meta } }) => (
        <li className={styles.listItem} key={link}>
          <Link href={link}>
            <a>{meta.title}</a>
          </Link>
          <br />
          <Excerpt />
          <small className={styles.lightText}>
            <Date dateString={meta.date} />
          </small>
        </li>
      ))}
    </ul>
  )
}
