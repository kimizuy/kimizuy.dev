import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import RSS from 'rss'
import { dateSortDesc } from '../src/lib/utils'

const importAll = (r) => {
  return r.keys().map((fileName) => ({
    link: `/posts${fileName.substr(1).replace(/\/index\.mdx$/, '')}`,
    module: r(fileName),
  }))
}

const getAllPostPreviews = async () => {
  return importAll(
    require.context('../src/pages/posts/', true, /\.mdx$/)
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

const generate = async () => {
  const previews = await getAllPostPreviews()

  const feed = new RSS({
    title: 'Blog – kimizuy',
    site_url: 'https://blog.kimizuy.dev',
    feed_url: 'https://blog.kimizuy.dev/feed.xml',
  })

  previews.forEach(({ link, module: { default: Content, meta } }) => {
    const html = ReactDOMServer.renderToStaticMarkup(<Content />)

    feed.item({
      title: meta.title,
      guid: link,
      url: `https://blog.kimizuy.dev${link}`,
      date: meta.date.published,
      description: html,
    })
  })

  const rss = feed.xml({ indent: true })

  fs.writeFileSync('./.next/static/feed.xml', rss)
}

generate()
