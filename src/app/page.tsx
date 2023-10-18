import Link from "next/link";
import { Logo } from "../components/logo";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Logo />
      <ul className={styles.list}>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <a href="https://github.com/kimizuy" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://twitter.com/kimizuy" target="_blank">
            Twitter
          </a>
        </li>
      </ul>
    </div>
  );
}
