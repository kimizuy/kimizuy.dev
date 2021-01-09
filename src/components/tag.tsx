import Link from 'next/link'

const Tag: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <span>
      <Link href="/tags/[tag]" as={`/tags/${tag}`}>
        <a>#{tag}</a>
      </Link>{' '}
    </span>
  )
}

export default Tag
