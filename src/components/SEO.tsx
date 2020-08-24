import { Meta } from '@/types/post'
import { SITETITLE } from '@/lib/constants'
import profile from '../../public/images/profile.jpg'

type Props = {
  meta?: Meta
}

export default function SEO({ meta }: Props) {
  if (!meta) {
    return (
      <>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="kimizuy のブログです" />
        <meta property="og:image" content={`https://kimizuy.dev${profile}`} />
        <meta name="og:title" content={SITETITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </>
    )
  }

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
