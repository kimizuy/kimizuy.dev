export type Meta = {
  title: string
  description: string
  date: {
    published: string
    updated?: string
  }
  tag: string[]
  image: any
}

export type Preview = { link: string; meta: Meta }
