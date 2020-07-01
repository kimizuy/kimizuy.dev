import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { FrontMatterType } from "../types/post"

const postsDirectory = path.join(process.cwd(), "_posts")

export function getFileNames() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
}

export function getFrontMatter(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterData = matter(fileContents).data as FrontMatterType

  return matterData
}
