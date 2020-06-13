import { parseISO, format } from "date-fns"

export default function ({ dateString }: { dateString: string }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>
}
