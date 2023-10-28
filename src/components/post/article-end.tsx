import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TWITTER } from "../../utils/constants";

export function ArticleEnd() {
  return (
    <div className="mt-16 flex justify-between">
      <Link href="/blog" className="flex items-end">
        <ChevronLeft />
        Back to blog home
      </Link>
      <a href={TWITTER} target="_blank" rel="noreferrer">
        Discuss on Twitter
      </a>
    </div>
  );
}
