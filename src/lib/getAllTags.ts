import type { Meta } from '@/types/post'
import { dateSortDesc } from './utils'

function importAll(r): Meta[] {
  return r.keys().map((fileName) => r(fileName).meta)
}

export default function getAllTags(): string[] {
  const metas = importAll(
    require.context('../pages/posts/?preview', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.date.published, b.date.published))
  return [...new Set(metas.flatMap((meta) => meta.tag))]
}
