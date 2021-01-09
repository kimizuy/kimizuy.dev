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

const CardList: React.VFC<Props> = (p: Props) => {
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

const Card: React.VFC<{ preview: Preview }> = ({ preview }) => {
  const {
    link,
    module: { meta },
  } = preview

  return (
    <Link href={link}>
      <li className={styles.card}>
        <div className={styles.imgWrapper}>
          <Image src={meta.image} layout="fill" />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{meta.title}</div>
          <LightText className={`${styles.marginTopAuto}`}>
            {meta.tags.map((t) => (
              <Tag key={t} tag={t} />
            ))}
            <br />
            <Date date={meta.date} />
          </LightText>
        </div>
      </li>
    </Link>
  )
}

export default CardList
