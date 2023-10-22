import Image from "next/image";
import Link from "next/link";
import { NAME, SITE_TITLE } from "../utils/constants";
import styles from "./logo.module.css";

export function Logo() {
  return (
    <Link href="/" className={styles.container}>
      <Image
        src="/profile.jpg"
        alt={NAME}
        width={48}
        height={48}
        priority
        className="rounded-full object-contain"
      />
      <span className={styles.title}>{SITE_TITLE}</span>
    </Link>
  );
}
