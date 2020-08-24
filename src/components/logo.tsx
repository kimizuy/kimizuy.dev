import { useRouter } from 'next/dist/client/router'
import styles from './logo.module.css'
import { NAME, SITETITLE } from '@/lib/constants'

export default function Logo() {
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
        alt={NAME}
      />
      <h1 className={styles.headerTitle}>{SITETITLE}</h1>
    </div>
  )
}
