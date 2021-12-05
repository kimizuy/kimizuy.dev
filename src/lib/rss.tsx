import { writeFileSync } from 'fs'
import ReactDOMServer from 'react-dom/server'
import { Feed } from 'feed'
import { getMDXComponent } from 'mdx-bundler/client'
import { SITE_TITLE, SITE_URL, NAME } from './constants'
import { Preview } from '@/types/post'
import { getCustomComponents } from '@/components/post/mdxComponents'

export const generateRSSFeed = (previews: Preview[]) => {
  const feed = new Feed({
    title: SITE_TITLE,
    description: 'Latest posts on kimizuy blog.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'ja',
    image: `${SITE_URL}/favicon-32x32.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, kimizuy`,
    feedLinks: {
      rss: `${SITE_URL}/feed.xml`,
      json: `${SITE_URL}/feed.json`,
      atom: `${SITE_URL}/atom.xml`,
    },
    author: {
      name: NAME,
      link: 'https://twitter.com/kimizuy',
    },
  })

  previews.forEach(({ slug, code, frontmatter }) => {
    const postPath = `${SITE_URL}/posts/${slug}`
    const Component = getMDXComponent(code)
    const customComponents = getCustomComponents(slug)
    const html = ReactDOMServer.renderToStaticMarkup(
      <Component components={customComponents} />
    )
    const postText = `<p><em>(The post <a href="${SITE_URL}/${postPath}">${frontmatter.title}</a> appeared first on <a href="${SITE_URL}">kimizuy blog</a>.)</em></p>`

    feed.addItem({
      title: frontmatter.title,
      id: postPath,
      link: postPath,
      description: frontmatter.description,
      content: html + postText,
      date: new Date(frontmatter.publishedAt),
      image: `${postPath}/${frontmatter.image}`,
    })
  })

  writeFileSync('public/feed.xml', feed.rss2())
  writeFileSync('public/feed.atom', feed.atom1())
  writeFileSync('public/feed.json', feed.json1())
}
