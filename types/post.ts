export type FrontMatter = {
  title: string
  date: string
  tag?: string[] | string
}

export type Post = { slug: string } & FrontMatter
