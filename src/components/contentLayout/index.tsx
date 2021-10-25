import styles from './index.module.css'

export const ContentLayout = ({
  children,
  home,
  sideBarItem,
}: {
  children: React.ReactNode
  home?: boolean
  sideBarItem?: JSX.Element
}) => {
  return (
    <div className={styles.container}>
      <section className={styles.article}>{children}</section>
      <aside className={styles.sideBar}>
        <div
          className={`${styles.sideBarItemWrapper} ${
            home ? '' : styles.sticky
          }`}
        >
          {sideBarItem}
        </div>
      </aside>
    </div>
  )
}
