export type Meta = {
  title: string
  date: string
  // description: string
  // image?: string
}

export type Preview = { link: string; module: { default: any; meta: Meta } }
