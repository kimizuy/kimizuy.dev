import { Meta } from '@/types/post'

type Props = {
  meta: Meta
}

export default function SEO({ meta }: Props) {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={meta.description} />
      <meta property="og:image" content={`https://kimizuy.dev${meta.image}`} />
      <meta name="og:title" content={meta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <title>{meta.title}</title>
    </>
  )
}
