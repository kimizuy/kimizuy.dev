import { dateSortDesc } from './utils'
import { Preview } from '@/types/post'

function importAll(r): Preview[] {
  return r.keys().map(
    (fileName): Preview => ({
      link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
      meta: r(fileName).meta,
    })
  )
}

export default function getAllPostPreviews(): Preview[] {
  return importAll(
    require.context('../pages/posts/', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.meta.dates.published, b.meta.dates.published))
}
