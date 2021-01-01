import { Meta } from '@/types/post'
import { Feed } from 'feed'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { dateSortDesc } from '../src/lib/utils'

const importAll = (r) => {
  return r.keys().map((fileName) => ({
    link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
    module: r(fileName),
  }))
}

const getAllPostPreviews = async (): Promise<
  { link: string; module: { default: any; meta: Meta } }[]
> => {
  return await Promise.all(
    importAll(
      require.context('../src/pages/posts/?rss', true, /\.mdx$/)
    ).sort((a, b) =>
      dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
    )
  )
}

const generate = async () => {
  const feed = new Feed({
    title: 'Blog – kimizuy',
    id: 'https://blog.kimizuy.dev',
    link: 'https://blog.kimizuy.dev',
    copyright: 'All rights reserved 2020, kimizuy',
    feedLinks: 'https://blog.kimizuy.dev/feed.xml',
  })

  const posts = await getAllPostPreviews()

  posts.forEach(({ link, module: { default: MDXDocument, meta } }) => {
    const html = ReactDOMServer.renderToStaticMarkup(<MDXDocument />)

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
