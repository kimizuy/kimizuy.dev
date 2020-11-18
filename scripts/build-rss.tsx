import fs from 'fs'
import { Feed } from 'feed'
import getAllPostPreviews from '../src/lib/getAllPostPreviews'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/components/post'
import ReactDOMServer from 'react-dom/server'

const feed = new Feed({
  title: 'Blog – kimizuy',
  id: 'https://blog.kimizuy.dev',
  link: 'https://blog.kimizuy.dev',
  copyright: 'All rights reserved 2020, kimizuy',
  feedLinks: 'https://blog.kimizuy.dev/feed.xml',
})

getAllPostPreviews().forEach(({ link, module: { default: Content, meta } }) => {
  const mdx = (
    <MDXProvider components={mdxComponents}>
      <Content />
    </MDXProvider>
  )
  const html = ReactDOMServer.renderToStaticMarkup(mdx)

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
