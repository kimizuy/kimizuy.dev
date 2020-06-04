import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"
import { MetaPostType } from "../types/post"

const postsDirectory = path.join(process.cwd(), "_posts")

export function getSelectedTagData(selectedTag: string) {
  const fileNames = fs.readdirSync(postsDirectory)
  const selectedTagData = fileNames.map(fileName => {
    const id = fileName.replace(/\.mdx$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const tag = matterResult.data["tag"] as string | string[]
    if (tag === selectedTag || tag.includes(selectedTag)) {
      return {
        id,
        ...(matterResult.data as MetaPostType),
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
  const fileNames = fs.readdirSync(postsDirectory)
  const tags = fileNames.flatMap(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    const tag = matterResult.data["tag"] as string | string[]
    return tag
  })

  return tags.map(tag => {
    return {
      params: {
        tag,
      },
    }
  })
}
