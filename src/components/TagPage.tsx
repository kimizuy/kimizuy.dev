import React from "react"
import { TagList } from "./TagList"
import Link from "next/link"

type Props = {
  tagName: string
  pages: { slug: string; title: string }[]
}

export function TagPage(props: Props) {
  return (
    <>
      <div>
        <TagList tags={[props.tagName]} />
      </div>
      <div>
        {props.pages.map((page) => {
          return (
            <div key={page.slug}>
              <Link href={`/${page.slug}`}>{page.title}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
