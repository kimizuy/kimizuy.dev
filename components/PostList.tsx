import Link from "next/link"
import utilStyles from "../styles/utils.module.css"
import { Post } from "../types/post"
import Date from "./Date"
import styles from "./postList.module.css"

type Props = { posts: Post[] }

export default function ({ posts }: Props) {
  return (
    <div>
      {posts.map(({ slug, date, title }) => (
        <div className={utilStyles.horizontal} key={slug}>
          <img
            src="/images/animal_chara_computer_inu.png"
            className={styles.image}
          />
          <div>
            <Link href="/posts/[slug]" as={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </div>
        </div>
      ))}
    </div>
  )
}
