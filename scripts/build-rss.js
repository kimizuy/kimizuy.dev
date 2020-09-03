import fs from 'fs'
import RSS from 'rss'
import getAllPostPreviews from '../src/lib/getAllPostPreviews.ts'

const feed = new RSS({
  title: 'kimizuy blog',
  site_url: 'https://blog.kimizuy.dev',
  feed_url: 'https://blog.kimizuy.dev/feed.xml',
})

getAllPostPreviews().forEach(({ link, meta }) => {
  feed.item({
    title: meta.title,
    guid: link,
    url: `https://blog.kimizuy.dev/posts${link}`,
    date: meta.date.published,
    description: meta.description,
  })
})

fs.writeFileSync('./out/feed.xml', feed.xml({ indent: true }))
