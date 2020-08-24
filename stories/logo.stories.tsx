import Logo from '../src/components/logo'
import styles from '../src/components/logo.module.css'

export default { title: 'Logo' }

export const logo = () => <Logo />

export const image = () => (
  <img className={styles.headerImage} src="/images/profile.jpg" />
)
