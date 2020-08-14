import getAllPostPreviews from './getAllPostPreviews'

export default function getSelectedTagPreviews(selectedTag: string) {
  // issue: https://github.com/vercel/next.js/issues/11993
  return JSON.parse(
    JSON.stringify(
      getAllPostPreviews().filter((preview) =>
        preview.module.meta.tag.includes(selectedTag)
      )
    )
  )
}
