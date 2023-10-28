"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Post } from "../utils/post";
import styles from "./card-list.module.css";
import { Date } from "./date";
import { TagList } from "./tag-list";

type Props = {
  posts: Post[];
};

export function CardList({ posts }: Props) {
  const variants: Variants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.ul
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{
        enter: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid gap-4 outline-none sm:grid-cols-[repeat(auto-fill,minmax(min(10rem,100%),1fr))]"
      // Enable :active for iOS
      onTouchStart={() => {
        return "";
      }}
    >
      {posts.map((post) => (
        <motion.li
          variants={variants}
          key={post.slug}
          className="border-b last:border-none sm:border-none"
        >
          <Card {...post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Card({ slug, frontmatter, cover }: Post) {
  return (
    <article className={styles.card}>
      <div>
        <div className={styles.imageWrapper}>
          <Image alt="" src={cover} fill className={styles.image} />
        </div>
        <Link href={`/blog/post/${slug}`} className={styles.title}>
          {frontmatter.title}
        </Link>
      </div>
      <div className={styles.meta}>
        <TagList tags={frontmatter.tags} />
        <Date publishedAt={frontmatter.publishedAt} />
      </div>
    </article>
  );
}
