import React from "react"
import Link from "next/link"

type Props = { tags: string[] }

export function TagList(props: Props) {
  return (
    <>
      {props.tags.map((tag, index) => {
        return (
          <Link href="/tags/[tag]" as={`/tags/${tag}`}>
            <a href={"/tags/" + tag} key={index}>
              {tag}
            </a>
          </Link>
        )
      })}
    </>
  )
}
