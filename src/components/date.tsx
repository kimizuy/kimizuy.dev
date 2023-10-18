import { format, parseISO } from "date-fns";
import { Frontmatter } from "../types/post";
import styles from "./date.module.css";

type Props = {
  publishedAt: Frontmatter["publishedAt"];
};

export function Date({ publishedAt }: Props) {
  return (
    <div className={styles.container}>
      Published at <Time value={publishedAt} />
    </div>
  );
}

function Time({ value }: { value: string }) {
  const date = parseISO(value);
  return <time dateTime={value}>{format(date, "yyyy/M/d")}</time>;
}
