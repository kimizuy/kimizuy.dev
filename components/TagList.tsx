import Link from "next/link"
import { Fragment } from "react"

type Props = { tags: (string | undefined)[] }

export function TagList(props: Props) {
  return (
    <>
      {props.tags.map((tag, i) => {
        if (!tag) return null

        return (
          <Fragment key={tag}>
            <Link href="/tags/[tag]" as={`/tags/${tag}`} key={tag}>
              <a>{tag}</a>
            </Link>
            {props.tags.length - 1 !== i ? " / " : null}
          </Fragment>
        )
      })}
    </>
  )
}
