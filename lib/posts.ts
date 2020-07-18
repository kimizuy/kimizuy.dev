import matter from "gray-matter"
import { FrontMatter } from "../types/post"
import markdownToHtml from "./markdownToHtml"
import { getFileContents, getFileNames } from "./util"

const fileNames = getFileNames()

export function getSortedPostsData() {
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    const fileContents = getFileContents(slug)
    const { data } = matter(fileContents)
    return {
      slug,
      ...(data as FrontMatter),
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllSlugs() {
  const slugs = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    return { params: { slug } }
  })

  return slugs
}

export async function getPostData(slug: string) {
  const fileContents = getFileContents(slug)
  const { data, content } = matter(fileContents)
  const contentHtml = await markdownToHtml(content)

  return {
    slug,
    contentHtml,
    ...(data as FrontMatter),
  }
}
