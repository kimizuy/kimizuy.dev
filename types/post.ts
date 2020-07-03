export type FrontMatter = {
  title: string
  date: string
  tag?: string[] | string
}

export type PostsData = { slug: string } & FrontMatter
