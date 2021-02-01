import { Meta } from '@/types/post'
import { format, parseISO } from 'date-fns'

type Props = {
  date: Meta['date']
}

export const Date: React.VFC<Props> = (p) => {
  return (
    <>
      published at <Time value={p.date.published} />
      <br />
      {p.date.updated && 'updated at '}
      {p.date.updated && <Time value={p.date.updated} />}
    </>
  )
}

const Time: React.VFC<{ value: string }> = ({ value }) => {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}
