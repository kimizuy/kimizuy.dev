import { ArrowRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { exit } from "process";
import { MDXComponent } from "@/components/post/mdx-component";
import { bundleDoc } from "@/libs/mdx-bundler";
import { getErrorMessage } from "@/utils/helper";
import { getAllPosts } from "@/utils/post";

export default async function Home() {
  const { code: home } = await getHome();
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl [&_section+section]:mt-12">
      <section>
        <h1 className="text-2xl font-bold">Hi, I&apos;m kimizuy 👋</h1>
        <MDXComponent code={home} />
      </section>

      <section className="[&>*+*]:mt-4">
        <h2 className="text-xl font-bold">My own projects</h2>
        <div className="flex items-center gap-4 overflow-x-auto sm:gap-8">
          <div className="grid h-32 shrink-0">
            <Image
              alt=""
              src="/projects/politastv-search.png"
              width={160}
              height={160}
            />
            <a
              href="https://politastv-search.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-end"
            >
              PolitasTV Search
            </a>
          </div>
          <div className="grid h-32 shrink-0">
            <Image
              alt=""
              src="/projects/kimizuy.dev.png"
              width={160}
              height={160}
            />
            <a
              href="https://github.com/kimizuy/kimizuy.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 self-end"
            >
              kimizuy.dev
              <Github size={20} />
            </a>
          </div>
          <div className="grid h-32 shrink-0">
            <Image
              alt=""
              src="/projects/react-chartjs.png"
              width={160}
              height={160}
            />
            <a
              href="https://www.npmjs.com/package/@kimizuy/react-chartjs"
              target="_blank"
              rel="noopener noreferrer"
              className="self-end"
            >
              @kimizuy/react-chartjs
            </a>
          </div>
        </div>
      </section>

      <section className="grid [&>*+*]:mt-4">
        <h2 className="text-xl font-bold">Recent Posts (Japanese)</h2>
        <ul className="grid gap-2">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/post/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="flex items-center place-self-end">
          All posts
          <ArrowRight />
        </Link>
      </section>
    </div>
  );
}

const getHome = async () => {
  try {
    const result = await bundleDoc("home");

    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    exit(1);
  }
};
