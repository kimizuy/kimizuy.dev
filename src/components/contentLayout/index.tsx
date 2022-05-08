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
      <article className={styles.article}>{children}</article>
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
