import { dateSortDesc } from './utils'
import { Preview } from '@/types/post'

const importAll = (r): Preview[] => {
  return r.keys().map(
    (fileName): Preview => ({
      link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
      module: r(fileName),
    })
  )
}

const getAllPostPreviews = (query?: string): Preview[] => {
  return importAll(
    require.context(
      `./src/pages/posts/${query ? '?' + query : ''}`,
      true,
      /\.mdx$/
    )
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

export default getAllPostPreviews
