"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import styles from "./ContentLayout.module.css";

interface Props {
  children: ReactNode;
  home?: boolean;
  sideBarItem?: JSX.Element;
}

export function ContentLayout({ children, home, sideBarItem }: Props) {
  const variants: Variants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
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
        <motion.nav variants={variants} className={styles.sideBar}>
          <div
            className={`${styles.sideBarItemWrapper} ${!home && styles.sticky}`}
          >
            {sideBarItem}
          </div>
        </motion.nav>
      </motion.div>
    </AnimatePresence>
  );
}
