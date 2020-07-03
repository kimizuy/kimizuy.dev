import { getFileNames, getFrontMatter } from "./util"

const fileNames = getFileNames()

export function getSelectedTagData(selectedTag: string) {
  const selectedTagData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const frontMatter = getFrontMatter(fileName)
    const tag = frontMatter.tag
    if (tag === selectedTag || tag?.includes(selectedTag)) {
      return {
        slug,
        ...frontMatter,
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
    const { tag } = getFrontMatter(fileName)
    return { params: { tag } }
  })

  return tags
}
