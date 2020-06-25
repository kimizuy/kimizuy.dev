import { getFileNames, getFrontMatter } from "./util"

const fileNames = getFileNames()

export function getSelectedTagData(selectedTag: string) {
  const selectedTagData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "")
    const matterData = getFrontMatter(fileName)
    const tag = matterData.tag
    if (tag === selectedTag || tag?.includes(selectedTag)) {
      return {
        id,
        ...matterData,
      }
    }
  })

  return selectedTagData.filter(Boolean).sort((a, b) => {
    if (a!.date < b!.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllTags() {
  const tags = fileNames.flatMap((fileName) => {
    const matterData = getFrontMatter(fileName)
    const tag = matterData.tag
    return tag
  })

  return tags.map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })
}
