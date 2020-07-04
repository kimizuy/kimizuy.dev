import { getFileNames, getFrontMatter } from "./util"
import { Post } from "../types/post"

const fileNames = getFileNames()

export function getSelectedTagPosts(selectedTag: string) {
  const selectedTagPosts = fileNames.map((fileName) => {
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

  return selectedTagPosts
    .filter((post): post is Post => post !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllTags() {
  const tags = fileNames.flatMap((fileName) => {
    const { tag } = getFrontMatter(fileName)
    return { params: { tag } }
  })

  return tags
}
