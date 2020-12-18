import { useRouter } from 'next/dist/client/router'
import styles from './logo.module.css'
import { NAME, SITE_TITLE } from '@/lib/constants'
import profile from '../../public/profile.jpg'
import Image from 'next/image'

const Logo: React.VFC = () => {
  const router = useRouter()

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push('/')
      }}
    >
      <div className={styles.imgWrapper}>
        <Image src={profile} alt={NAME} layout="fill" objectFit="contain" />
      </div>
      <h1 className={styles.headerTitle}>{SITE_TITLE}</h1>
    </div>
  )
}

export default Logo
