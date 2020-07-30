import { useRouter } from 'next/dist/client/router'
import styles from './logo.module.css'

type Props = {
  name: string
  siteTitle: string
}

export default function Logo(p: Props) {
  const router = useRouter()

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push('/')
      }}
    >
      <img
        className={styles.headerImage}
        src="/images/profile.jpg"
        alt={p.name}
      />
      <h1 className={styles.headerTitle}>{p.siteTitle}</h1>
    </div>
  )
}
