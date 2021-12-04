export type Frontmatter = {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  image: string
}

export type Preview = {
  slug: string
  code: string
  frontmatter: Frontmatter
}
