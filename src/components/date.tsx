import { parseISO, format } from 'date-fns'
import { Dates } from '@/types/post'

type Props = {
  dates: Dates
}

export default function Date(p: Props) {
  return (
    <>
      published at <Time value={p.dates.published} />
      <br />
      {p.dates.updated && 'updated at ' + <Time value={p.dates.updated} />}
    </>
  )
}

function Time({ value }: { value: string }) {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}
