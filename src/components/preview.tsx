import styles from './preview.module.css'
import { Meta } from '@/types/post'
import Link from 'next/link'

type Props = {
  link: string
  excerpt: any
  meta: Meta
}

export default function Preview(p: Props) {
  return (
    <li>
      <Link href={p.link}>
        <a>{p.meta.title}</a>
      </Link>
    </li>
  )
}
