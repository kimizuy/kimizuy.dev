export type Meta = {
  title: string
  description: string
  date: {
    published: string
    updated?: string
  }
  tags: string[]
  image: any
}

export type Preview = { link: string; module: { default: any; meta: Meta } }
