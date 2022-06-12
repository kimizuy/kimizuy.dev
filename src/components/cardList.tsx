import Image from 'next/image'
import Link from 'next/link'
import { motion, Transition, Variants } from 'framer-motion'
import { FC } from 'react'
import styles from './cardList.module.css'
import { TagLinks } from './tagLinks'
import { Date } from '@/components/date'
import { Preview } from '@/types/post'

type Props = {
  previews: Preview[]
}

export const CardList: React.VFC<Props> = (p: Props) => {
  const transition: Transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  }
  const variants: Variants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition,
    },
  }

  return (
    <motion.ul
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        enter: { transition: { staggerChildren: 0.05 } },
        exit: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className={styles.cardList}
      // Enable :active for iOS
      onTouchStart={() => {
        return ''
      }}
    >
      {p.previews.map((preview) => (
        <motion.li
          variants={variants}
          key={preview.slug}
          className={styles.listItem}
        >
          <Card preview={preview} />
        </motion.li>
      ))}
    </motion.ul>
  )
}

const Card: FC<{ preview: Preview }> = ({ preview }) => {
  const { slug, frontmatter } = preview
  const src = `/posts/${slug}/${frontmatter.image}`

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.imgWrapper}>
          <Image src={src} alt={slug} layout="fill" />
        </div>
        <div className={styles.frontmatter}>
          <Link scroll={false} href={`/posts/${slug}`}>
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
