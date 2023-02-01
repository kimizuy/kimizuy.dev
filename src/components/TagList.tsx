import Link from "next/link";
import styles from "./TagList.module.css";

type Props = {
  tags: string[];
};

export function TagList({ tags }: Props) {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <li key={tag} className={styles.item}>
          <Link href={`/tags/${tag}`} className={styles.link}>
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
