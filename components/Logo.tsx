import { useRouter } from "next/dist/client/router"
import styles from "./logo.module.css"
import utilStyles from "../styles/utils.module.css"

type Props = {
  home?: boolean
  name: string
  siteTitle: string
}

export default function (p: Props) {
  const router = useRouter()

  return (
    <div
      className={`${styles.container} ${p.home ? "" : styles.pointer}`}
      onClick={() => {
        router.push("/")
      }}
    >
      <div className={utilStyles.horizontal}>
        <img
          className={styles.headerImage}
          src="/images/profile.jpg"
          alt={p.name}
        />
        <h1 className={styles.headerTitle}>{p.siteTitle}</h1>
      </div>
    </div>
  )
}
