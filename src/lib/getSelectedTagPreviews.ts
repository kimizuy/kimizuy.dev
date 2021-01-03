import getAllPostPreviews from './getAllPostPreviews'

// FIXME
const getSelectedTagPreviews: any = (selectedTag: string) => {
  // issue: https://github.com/vercel/next.js/issues/11993
  return JSON.parse(
    JSON.stringify(
      getAllPostPreviews().filter(({ module: { meta } }) =>
        meta.tags.includes(selectedTag)
      )
    )
  )
}

export default getSelectedTagPreviews
