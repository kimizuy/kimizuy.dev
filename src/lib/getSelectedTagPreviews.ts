import { getAllPostPreviews } from './getAllPostPreviews'

// FIXME
export const getSelectedTagPreviews = (selectedTag: string) => {
  // issue: https://github.com/vercel/next.js/issues/11993
  return JSON.parse(
    JSON.stringify(
      getAllPostPreviews().filter(({ module: { meta } }) =>
        meta.tags.includes(selectedTag)
      )
    )
  )
}
