import { dateSortDesc } from './util'
import { Preview } from '@/types/post'

function importAll(r) {
  return r.keys().map((fileName) => ({
    link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
    module: r(fileName),
  }))
}

export default function getAllPostPreviews(): Preview[] {
  return importAll(
    require.context('../pages/posts/?preview', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.module.meta.date, b.module.meta.date))
}
