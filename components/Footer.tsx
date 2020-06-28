import styles from "styles/footer.module.scss"
import layoutStyles from "styles/layout.module.scss"

export default function () {
  return (
    <footer
      id="colophon"
      className={`${styles.siteFooter} ${layoutStyles.inner}`}
    >
      <div className="site-info">site info</div>
    </footer>
  )
}
