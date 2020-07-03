import remark from "remark"
import html from "remark-html"
import toc from "remark-toc"
import slug from "remark-slug"

export default async function (markdown: string) {
  const processedContent = await remark()
    .use(html)
    .use(toc, { tight: true })
    .use(slug)
    .process(markdown)
  const result = processedContent.toString()

  return result
}
