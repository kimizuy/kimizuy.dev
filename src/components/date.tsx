import { format } from "date-fns";
import { type Frontmatter } from "../types/post";

type Props = {
  publishedAt: Frontmatter["publishedAt"];
};

export function Date({ publishedAt }: Props) {
  return (
    <div className="text-slate-400">
      Published at <Time value={publishedAt} />
    </div>
  );
}

function Time({ value }: { value: Date }) {
  const date = format(value, "yyyy/M/d");

  return <time dateTime={date}>{date}</time>;
}
