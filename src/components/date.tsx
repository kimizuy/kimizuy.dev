import { parseISO, format } from 'date-fns'
import { Meta } from '@/types/post'

type Props = {
  date: Meta['date']
}

export default function Date(p: Props) {
  return (
    <>
      published at <Time value={p.date.published} />
      <br />
      {p.date.updated && 'updated at ' + <Time value={p.date.updated} />}
    </>
  )
}

function Time({ value }: { value: string }) {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}
