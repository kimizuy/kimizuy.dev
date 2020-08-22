import Link from 'next/link'

export default function Tag({ tag }: { tag: string }) {
  return (
    <>
      <Link href="/tags/[tag]" as={`/tags/${tag}`}>
        <a>#{tag}</a>
      </Link>{' '}
    </>
  )
}
