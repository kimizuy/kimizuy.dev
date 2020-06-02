import Link from "next/link"

type Props = { tags: (string | undefined)[] }

export function TagList(props: Props) {
  return (
    <>
      {props.tags.map(tag => {
        if (!tag) return null

        return (
          <Link href="/tags/[tag]" as={`/tags/${tag}`}>
            <a>{tag}</a>
          </Link>
        )
      })}
    </>
  )
}
