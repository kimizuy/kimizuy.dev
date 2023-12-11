import { ChevronRight, Github } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { Link } from "@/components/link";
import { MDXComponent } from "@/components/mdx-component";
import { getAllPosts, getDoc } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { type PageProps } from "./layout";

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("home", lang);
  const recentPosts = (await getAllPosts()).slice(0, 3);
  const dictionary = getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl [&_section+section]:mt-12">
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <MDXComponent code={code} />
        </Suspense>
      </section>

      <section className="[&>*+*]:mt-4">
        <h2 className="text-xl font-bold">{dictionary.project}</h2>
        <div className="flex items-center gap-4 overflow-y-hidden overflow-x-scroll pb-2 pr-2 sm:gap-8">
          <ProjectCard
            name="PolitasTV Search"
            imageAlt=""
            imageSrc="/projects/politastv-search.png"
            url="https://www.politastv-search.com/"
          />
          <ProjectCard
            name={
              <>
                <Github size={20} />
                kimizuy.dev
              </>
            }
            imageAlt=""
            imageSrc="/projects/kimizuy.dev.png"
            url="https://github.com/kimizuy/kimizuy.dev"
          />
          <ProjectCard
            name="Twitter clone app"
            imageAlt=""
            imageSrc="/projects/twitter-clone.png"
            url="https://twitter-clone-kimizuy.vercel.app/"
          />
          <ProjectCard
            name="@kimizuy/react-chartjs"
            imageAlt=""
            imageSrc="/projects/react-chartjs.png"
            url="https://www.npmjs.com/package/@kimizuy/react-chartjs"
          />
        </div>
      </section>

      <section className="grid [&>*+*]:mt-4">
        <h2 className="text-xl font-bold">{dictionary.recentPosts}</h2>
        <ul className="grid gap-2">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/post/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" className="flex items-end place-self-end">
          {dictionary.allPosts}
          <ChevronRight />
        </Link>
      </section>
    </div>
  );
}

type ProjectCardProps = {
  name: JSX.Element | string;
  imageAlt: string;
  imageSrc: string;
  url: string;
};

function ProjectCard({ name, imageAlt, imageSrc, url }: ProjectCardProps) {
  return (
    <div className="grid h-32 shrink-0">
      <Image alt={imageAlt} src={imageSrc} width={160} height={160} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 self-end"
      >
        {name}
      </a>
    </div>
  );
}
