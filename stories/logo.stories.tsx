import Logo from "../components/Logo"
import styles from "../components/logo.module.css"

export default { title: "Logo" }

export const logo = () => <Logo name="kimizuy" siteTitle="kimizuy blog" />

export const image = () => (
  <img className={styles.headerImage} src="/images/profile.jpg" />
)
