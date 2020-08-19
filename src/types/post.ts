export type Meta = {
  title: string
  dates: Dates
  tag: string[]
  image: any
}

export type Preview = { link: string; meta: Meta }

export type Dates = {
  published: string
  updated?: string
}
