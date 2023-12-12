"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/utils/helpers";

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
        className="flex flex-wrap-reverse gap-6"
      >
        <motion.article
          variants={variants}
          className="min-w-[66.7%] grow-[999] basis-0"
        >
          {children}
        </motion.article>
        <motion.nav variants={variants} className="grow basis-[12rem]">
          <div className={cn("[&>*+*]:mt-5", !home && "sticky top-28")}>
            {sideBarItem}
          </div>
        </motion.nav>
      </motion.div>
    </AnimatePresence>
  );
}
