import getAllPostPreviews from './getAllPostPreviews'

// FIXME
const getSelectedTagPreviews: any = (selectedTag: string) => {
  // issue: https://github.com/vercel/next.js/issues/11993
  return JSON.parse(
    JSON.stringify(
      getAllPostPreviews().filter((preview) =>
        preview.module.meta.tag.includes(selectedTag)
      )
    )
  )
}

export default getSelectedTagPreviews
