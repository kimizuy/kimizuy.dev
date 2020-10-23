import fs from 'fs'
import { Feed } from 'feed'
import ReactDOMServer from 'react-dom/server'
import { dateSortDesc } from '@/lib/utils'
import { Meta } from '@/types/post'
import mdx from '@mdx-js/mdx'
import path from 'path'

export type Preview = { link: string; module: { default: any; meta: Meta } }

const importAll = (r) => {
  return r.keys().map((fileName) => ({
    link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
    module: r(fileName),
  }))
}

const getAllPostPreviews = (): Preview[] => {
  return importAll(
    require.context('../src/pages/posts/', true, /\.mdx$/)
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

const getallposts = () => {
  const directory = path.join(process.cwd(), 'src', 'pages', 'posts')
  const files = fs.readdirSync(directory)

  files.forEach((v) => console.log(v))
}
getallposts()

const generate = () => {
  const previews = getAllPostPreviews()

  const feed = new Feed({
    title: 'Blog – kimizuy',
    id: 'https://blog.kimizuy.dev',
    link: 'https://blog.kimizuy.dev',
    copyright: 'All rights reserved 2020, kimizuy',
    feedLinks: 'https://blog.kimizuy.dev/feed.xml',
  })

  previews.forEach(async ({ link, module: { default: Content, meta } }) => {
    // const Jsx = await mdx(Content)

    feed.addItem({
      title: meta.title,
      id: link,
      link: `https://blog.kimizuy.dev${link}`,
      date: new Date(meta.date.published),
      description: meta.description,
    })
  })

  const rss = feed.rss2()

  fs.writeFileSync('./.next/static/feed.xml', rss)
}

generate()
