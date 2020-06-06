type PostType = FrontMatterType & {
  contentHtml: string
}

export type FrontMatterType = {
  title: string
  date: string
  tag?: string[] | string
}

export default PostType
