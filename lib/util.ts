import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { FrontMatter } from "../types/post"

const postsDirectory = path.join(process.cwd(), "_posts")

export function getFileNames() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
}

export function getFileContents(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  return fileContents
}

export function getFrontMatter(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const frontMatter = matter(fileContents).data as FrontMatter

  return frontMatter
}
