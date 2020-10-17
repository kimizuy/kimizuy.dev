import { dateSortDesc } from './utils'
import { Preview } from '@/types/post'

const importAll = (r): Preview[] => {
  return r.keys().map(
    (fileName): Preview => ({
      link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
      meta: r(fileName).meta,
    })
  )
}

const getAllPostPreviews = (): Preview[] => {
  return importAll(
    require.context('../pages/posts/', true, /\.mdx$/)
  ).sort((a, b) => dateSortDesc(a.meta.date.published, b.meta.date.published))
}

export default getAllPostPreviews
