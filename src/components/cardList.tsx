import styles from './cardList.module.css'
import { Preview } from '@/types/post'
import Link from 'next/link'
import Date from '@/components/date'
import Tag from './tag'
import Image from 'next/image'
import LightText from './lightText'

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
          <Image src={meta.image} layout="fill" />
        </div>
      </Link>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>
          <Link href={link}>
            <a>{meta.title}</a>
          </Link>
        </div>
        <LightText className={`${styles.marginTopAuto}`}>
          {meta.tag.map((t) => (
            <Tag key={t} tag={t} />
          ))}
          <br />
          <Date date={meta.date} />
        </LightText>
      </div>
    </li>
  )
}

export default CardList
