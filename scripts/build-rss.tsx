import fs from 'fs'
import { Feed } from 'feed'
import ReactDOMServer from 'react-dom/server'
import { dateSortDesc } from '@/lib/utils'
import { Meta } from '@/types/post'
import path from 'path'

export type Preview = { link: string; module: { default: any; meta: Meta } }

// const importAll = (r) => {
//   return r.keys().map((fileName) => ({
//     link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
//     module: r(fileName),
//   }))
// }

// const getAllPostPreviews = (): Preview[] => {
//   return importAll(
//     require.context('../src/pages/posts/', true, /\.mdx$/)
//   ).sort((a, b) =>
//     dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
//   )
// }

const getAllPostPreviews = async () => {
  const directory = path.join(process.cwd(), 'src', 'pages', 'posts')
  const files = fs.readdirSync(directory)

  const entries: { default: any; meta: Meta }[] = await Promise.all(
    files.map((file) => import(`../src/pages/posts/${file}`))
  )

  const posts = entries.map(({ default: Content, meta }, i) => ({
    link: `/posts/${files[i]}`,
    Content,
    meta,
  }))

  return posts.sort((a, b) =>
    dateSortDesc(a.meta.date.published, b.meta.date.published)
  )
}

const generate = async () => {
  const previews = await getAllPostPreviews()

  const feed = new Feed({
    title: 'Blog – kimizuy',
    id: 'https://blog.kimizuy.dev',
    link: 'https://blog.kimizuy.dev',
    copyright: 'All rights reserved 2020, kimizuy',
    feedLinks: 'https://blog.kimizuy.dev/feed.xml',
  })

  previews.forEach(({ link, Content, meta }) => {
    const html = ReactDOMServer.renderToStaticMarkup(<Content />)

    feed.addItem({
      title: meta.title,
      id: link,
      link: `https://blog.kimizuy.dev${link}`,
      date: new Date(meta.date.published),
      description: html,
    })
  })

  const rss = feed.rss2()

  fs.writeFileSync('./.next/static/feed.xml', rss)
}

generate()
