import { PropsWithChildren } from "react";
import { CopyRight } from "./copy-right";
import { Logo } from "./logo";
import styles from "./root-layout.module.css";

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo />
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
    </div>
  );
}
