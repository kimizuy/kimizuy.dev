import fs from 'fs'
import { Feed } from 'feed'
import getAllPostPreviews from '../src/lib/getAllPostPreviews'

const feed = new Feed({
  title: 'Blog – kimizuy',
  id: 'https://blog.kimizuy.dev',
  link: 'https://blog.kimizuy.dev',
  copyright: 'All rights reserved 2020, kimizuy',
  feedLinks: 'https://blog.kimizuy.dev/feed.xml',
})

getAllPostPreviews().forEach(({ link, meta }) => {
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
