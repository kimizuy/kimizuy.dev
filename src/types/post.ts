export type Meta = {
  title: string
  date: string
  // tag: string[]
  image?: any
}

export type Preview = { link: string; module: { default: any; meta: Meta } }
