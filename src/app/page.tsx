import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex flex-col gap-8 text-xl">
        <Link href="/blog">Blog</Link>
        <a
          href="https://github.com/kimizuy"
          target="_blank"
          className="flex items-center gap-1"
        >
          GitHub
          <ExternalLink />
        </a>
        <a
          href="https://twitter.com/kimizuy"
          target="_blank"
          className="flex items-center gap-1"
        >
          Twitter
          <ExternalLink />
        </a>
      </div>
    </div>
  );
}
