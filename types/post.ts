type PostType = MetaPostType & {
  contentHtml: string
}

export type MetaPostType = {
  title: string
  date: string
  tag?: string[] | string
}

export default PostType
