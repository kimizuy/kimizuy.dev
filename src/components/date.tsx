import { format, parseISO } from 'date-fns'
import styles from './date.module.css'
import { Frontmatter } from '@/types/post'

type Props = {
  publishedAt: Frontmatter['publishedAt']
}

export const Date: React.VFC<Props> = (p) => {
  return (
    <div className={styles.date}>
      Published at <Time value={p.publishedAt} />
    </div>
  )
}

const Time: React.VFC<{ value: string }> = ({ value }) => {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}
