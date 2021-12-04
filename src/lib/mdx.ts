import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import { isFrontmatter } from './typePredicates'
import { dateSortDesc } from './utils'

export const POSTS_PATH = path.join(process.cwd(), 'data')

export const postFilePaths = readdirSync(POSTS_PATH)

export const getPreviews = async () =>
  await Promise.all(
    postFilePaths.map(async (slug) => {
      const postFilePath = path.join(POSTS_PATH, slug, 'index.mdx')
      const source = readFileSync(postFilePath, 'utf-8')
      const { code, frontmatter } = await bundleMDX(source)
      return {
        slug,
        code,
        frontmatter: isFrontmatter(frontmatter) ? frontmatter : null,
      }
    })
  ).then((value) =>
    value.sort((a, b) =>
      dateSortDesc(a.frontmatter.publishedAt, b.frontmatter.publishedAt)
    )
  )

export const getAllTags = async () => {
  const tags = await getPreviews().then((value) =>
    value.map((v) => v.frontmatter.tags)
  )
  return [...new Set(tags.flatMap((tag) => tag))]
}
