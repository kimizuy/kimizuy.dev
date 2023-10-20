import { Post } from "../../utils/post";
import { Date } from "../date";
import { TagList } from "../tag-list";
import { ArticleEnd } from "./article-end";
import styles from "./index.module.css";
import { MDXComponent } from "./mdx-component";

type Props = Post;

export function Post({ code, frontmatter }: Props) {
  return (
    <>
      <header>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <div className={styles.meta}>
          <TagList tags={frontmatter.tags} />
          <Date publishedAt={frontmatter.publishedAt} />
        </div>
      </header>
      <main className="toc-content">
        <MDXComponent code={code} />
      </main>
      <footer>
        <ArticleEnd />
      </footer>
    </>
  );
}
