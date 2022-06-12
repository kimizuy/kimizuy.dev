import { motion, Transition, Variants } from 'framer-motion'
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
  const transition: Transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
  }
  const variants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition },
    exit: {
      opacity: 0,
      transition,
    },
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      // variants={{
      //   enter: { transition: { staggerChildren: 0.5 } },
      //   exit: { transition: { staggerChildren: 0.5 } },
      // }}
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
