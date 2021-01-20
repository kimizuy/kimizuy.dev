import Link from 'next/link'

const Tag: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <>
      <Link href="/tags/[tag]" as={`/tags/${tag}`}>
        <a>#{tag}</a>
      </Link>{' '}
    </>
  )
}

export default Tag
