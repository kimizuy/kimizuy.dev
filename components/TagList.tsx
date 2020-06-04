import Link from "next/link"

type Props = { tags: (string | undefined)[] }

export function TagList(props: Props) {
  return (
    <>
      {props.tags.map((tag, i) => {
        if (!tag) return null

        return (
          <>
            <Link href="/tags/[tag]" as={`/tags/${tag}`} key={i}>
              <a>{tag}</a>
            </Link>
            {props.tags.length - 1 !== i ? " / " : null}
          </>
        )
      })}
    </>
  )
}
