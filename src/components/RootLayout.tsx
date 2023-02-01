import { PropsWithChildren } from "react";
import { CopyRight } from "./CopyRight";
import { Logo } from "./Logo";
import styles from "./RootLayout.module.css";

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
