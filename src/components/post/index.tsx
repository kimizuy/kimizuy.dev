import { Post } from "../../utils/post";
import { Date } from "../Date";
import { TagList } from "../TagList";
import { ArticleEnd } from "./ArticleEnd";
import styles from "./index.module.css";
import { MDXComponent } from "./MDXComponent";

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
      <main className="post">
        <MDXComponent code={code} />
      </main>
      <footer>
        <ArticleEnd />
      </footer>
    </>
  );
}
