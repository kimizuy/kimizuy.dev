import Link from "next/link";
import { TWITTER } from "../../utils/constants";
import styles from "./ArticleEnd.module.css";

export function ArticleEnd() {
  return (
    <div className={styles.container}>
      <Link href="/">← Back to home</Link>
      <a href={TWITTER} target="_blank" rel="noreferrer">
        Discuss on Twitter
      </a>
    </div>
  );
}
