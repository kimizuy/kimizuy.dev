import styles from './preview.module.css'
import { Meta } from '@/types/post'
import Link from 'next/link'

type Props = {
  data: {
    link: string
    excerpt?: any
    meta: Meta
  }
}

export default function Preview({ data }: Props) {
  return (
    <li>
      <Link href={data.link}>
        <a>{data.meta.title}</a>
      </Link>
    </li>
  )
}
