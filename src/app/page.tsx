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
          <Link href="https://github.com/kimizuy">GitHub</Link>
        </li>
        <li>
          <Link href="https://twitter.com/kimizuy">Twitter</Link>
        </li>
      </ul>
    </div>
  );
}
