import { type Post } from "@/utils/post";
import { Date } from "../date";
import { TagList } from "../tag-list";
import { ArticleEnd } from "./article-end";
import { MDXComponent } from "./mdx-component";

type Props = Post;

export function Post({ code, frontmatter }: Props) {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">
          {frontmatter.title}
        </h1>
        <div className="mt-4 text-sm">
          <TagList tags={frontmatter.tags} />
          <Date publishedAt={frontmatter.publishedAt} />
        </div>
      </header>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <main className="toc-content mt-8">
        <MDXComponent code={code} />
      </main>
      <footer className="mt-8">
        <ArticleEnd />
      </footer>
    </>
  );
}
