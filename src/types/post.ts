export type Meta = {
  title: string
  description: string
  date: {
    published: string
    updated?: string
  }
  tags: string[]
  image: string
}

export type Preview = {
  slug: string
  module: { default: () => JSX.Element; meta: Meta }
}
