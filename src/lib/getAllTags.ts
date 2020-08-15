import { Meta } from '@/types/post'
import { dateSortDesc } from './utils'

function importAll(r) {
  return r.keys().map((fileName) => r(fileName).meta) as Meta[]
}

export default function getAllTags() {
  const metas = importAll(
    require.context('../pages/posts/?preview', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.date, b.date))
  return [...new Set(metas.flatMap((meta) => meta.tag))]
}
