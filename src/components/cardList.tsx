import styles from './cardList.module.css'
import { Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'
import Tag from './tag'
import utilStyles from './utils.module.css'

type Props = {
  previews: Preview[]
}

const CardList: React.FC<Props> = (p: Props) => {
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

const Card: React.FC<{ preview: Preview }> = ({ preview }) => {
  const { link, meta } = preview

  return (
    <li className={styles.card}>
      <Link href={link}>
        <div className={styles.imgWrapper}>
          <img src={meta.image} loading="lazy" />
        </div>
      </Link>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>
          <Link href={link}>
            <a>{meta.title}</a>
          </Link>
        </div>
        <div className={`${styles.marginTopAuto} ${utilStyles.lightText}`}>
          {meta.tag.map((t) => (
            <Tag key={t} tag={t} />
          ))}
          <br />
          <Date date={meta.date} />
        </div>
      </div>
    </li>
  )
}

export default CardList
