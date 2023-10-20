import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col gap-8 text-xl">
        <Link href="/blog">Blog</Link>
        <Link href="https://github.com/kimizuy">GitHub</Link>
        <Link href="https://twitter.com/kimizuy">Twitter</Link>
      </div>
    </div>
  );
}
