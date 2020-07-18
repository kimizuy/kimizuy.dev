import matter from "gray-matter"
import { FrontMatter, Post } from "../types/post"
import { getFileContents, getFileNames } from "./util"

const fileNames = getFileNames()

export function getSelectedTagPosts(selectedTag: string) {
  const selectedTagPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fileContents = getFileContents(slug)
    const frontMatter = matter(fileContents).data as FrontMatter
    if (
      frontMatter.tag === selectedTag ||
      frontMatter.tag?.includes(selectedTag)
    ) {
      return {
        slug,
        ...(frontMatter as FrontMatter),
      }
    }
  })

  return selectedTagPosts
    .filter((post): post is Post => post !== undefined)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllTags() {
  const tags = fileNames.flatMap((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fileContents = getFileContents(slug)
    const { tag } = matter(fileContents).data as FrontMatter
    return { params: { tag } }
  })

  return tags
}
