import { motion, Variants } from 'framer-motion'
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
  const variants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        enter: { transition: { staggerChildren: 0.2 } },
      }}
      className={styles.container}
    >
      <motion.article variants={variants} className={styles.article}>
        {children}
      </motion.article>
      <motion.aside variants={variants} className={styles.sideBar}>
        <div
          className={`${styles.sideBarItemWrapper} ${
            home ? '' : styles.sticky
          }`}
        >
          {sideBarItem}
        </div>
      </motion.aside>
    </motion.div>
  )
}
