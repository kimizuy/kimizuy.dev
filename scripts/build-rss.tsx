import getAllPostPreviews from '@/lib/getAllPostPreviews'
import { Feed } from 'feed'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'

const generate = () => {
  const feed = new Feed({
    title: 'Blog – kimizuy',
    id: 'https://blog.kimizuy.dev',
    link: 'https://blog.kimizuy.dev',
    copyright: 'All rights reserved 2020, kimizuy',
    feedLinks: 'https://blog.kimizuy.dev/feed.xml',
  })

  const posts = getAllPostPreviews('rss')

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
