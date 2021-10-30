import { dateSortDesc } from './utils'
import type { Meta } from '@/types/post'

const importAll = (r): Meta[] => {
  return r.keys().map((fileName) => r(fileName).meta)
}

export const getAllTags = (): string[] => {
  const metas = importAll(
    require.context('../pages/posts/', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.date.published, b.date.published))
  return [...new Set(metas.flatMap((meta) => meta.tags))]
}
