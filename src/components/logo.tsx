import { useRouter } from 'next/dist/client/router'
import styles from './logo.module.css'
import { NAME, SITE_TITLE } from '@/lib/constants'
import profile from '../../public/profile.jpg'

const Logo: React.FC = () => {
  const router = useRouter()

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push('/')
      }}
    >
      <img className={styles.headerImage} src={profile} alt={NAME} />
      <h1 className={styles.headerTitle}>{SITE_TITLE}</h1>
    </div>
  )
}

export default Logo
