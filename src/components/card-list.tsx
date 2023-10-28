"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Post } from "../utils/post";
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
      className="grid grid-cols-[repeat(auto-fill,minmax(min(12rem,100%),1fr))] gap-4 outline-none"
      // Enable :active for iOS
      onTouchStart={() => {
        return "";
      }}
    >
      {posts.map((post) => (
        <motion.li variants={variants} key={post.slug}>
          <Card {...post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Card({ slug, frontmatter, cover }: Post) {
  return (
    <article className="relative flex h-full cursor-pointer flex-col justify-between rounded bg-slate-900 p-4 hover:shadow-[0_0_0_0.2rem] [&:hover_img]:scale-125 [&_img]:transition-transform">
      <div>
        <div className="relative block cursor-pointer overflow-hidden rounded-lg pb-[calc(9/16*100%)]">
          <Image
            alt=""
            src={cover}
            fill
            className="absolute h-full w-full object-cover"
          />
        </div>
        <div className="mt-4">
          <Link
            href={`/blog/post/${slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {frontmatter.title}
          </Link>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <TagList tags={frontmatter.tags} />
        <Date publishedAt={frontmatter.publishedAt} />
      </div>
    </article>
  );
}
