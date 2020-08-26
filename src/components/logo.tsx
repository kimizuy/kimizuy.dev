import { useRouter } from 'next/dist/client/router'
import styles from './logo.module.css'
import { NAME, SITETITLE } from '@/lib/constants'
import profile from '../../public/profile.jpg'

export default function Logo() {
  const router = useRouter()

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push('/')
      }}
    >
      <img className={styles.headerImage} src={profile} alt={NAME} />
      <h1 className={styles.headerTitle}>{SITETITLE}</h1>
    </div>
  )
}
