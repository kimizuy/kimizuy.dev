import { parseISO, format } from 'date-fns'
import { Meta } from '@/types/post'

type Props = {
  date: Meta['date']
}

const Date: React.FC<Props> = (p) => {
  return (
    <>
      published at <Time value={p.date.published} />
      <br />
      {p.date.updated && 'updated at ' + <Time value={p.date.updated} />}
    </>
  )
}

const Time: React.FC<{ value: string }> = ({ value }) => {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}

export default Date
