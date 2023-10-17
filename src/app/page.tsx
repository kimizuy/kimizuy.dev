import Link from "next/link";
import { Logo } from "../components/Logo";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Logo />
      <ul className={styles.list}>
        <li>
          <Link href="https://blog.kimizuy.dev">Blog</Link>
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
