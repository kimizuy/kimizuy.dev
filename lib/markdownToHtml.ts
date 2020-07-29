import remark from "remark"
import html from "remark-html"
import toc from "remark-toc"
import slug from "remark-slug"
import prism from "@mapbox/rehype-prism"
import parse from "remark-parse"
import rehype from "remark-rehype"
import highlight from "remark-highlight.js"

export default async function (markdown: string) {
  const processedContent = await remark()
    .use(html)
    .use(toc, { tight: true })
    .use(slug)
    // .use(parse)
    // .use(rehype)
    // .use(prism)
    // .use(highlight)
    .process(markdown)
  const result = processedContent.toString()

  return result
}
