import Image from "next/image";
import Link from "next/link";
import { NAME, SITE_TITLE } from "../utils/constants";
import styles from "./Logo.module.css";

export function Logo() {
  return (
    <Link href="/" className={styles.container}>
      <span className={styles.imageWrapper}>
        <Image
          src="/profile.jpg"
          alt={NAME}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
          className={styles.image}
        />
      </span>
      <h1 className={styles.title}>{SITE_TITLE}</h1>
    </Link>
  );
}
