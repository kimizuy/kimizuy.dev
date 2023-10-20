import { getMDXExport } from "mdx-bundler/client";
import { exit } from "process";
import { cache } from "react";
import { bundleMDX } from "../libs/mdx-bundler";
import { isFrontmatter, isMDXExport } from "../libs/type-predicates";
import { POST_FILE_PATHS } from "./constants";
import { dateSortDesc, getErrorMessage } from "./helper";

export const getPost = cache(async (slug: string) => {
  try {
    const { code, frontmatter } = await bundleMDX(slug);
    const exported = getMDXExport(code);
    if (!isFrontmatter(frontmatter) || !isMDXExport(exported)) {
      throw new Error(`Invalid format in "${slug}/index.mdx".`);
    }
    const { cover } = exported;
    return { code, frontmatter, cover, slug };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(`${slug}: ${errorMessage}`);
    exit(1);
  }
});

export type Post = Awaited<ReturnType<typeof getPost>>;

export const getAllPosts = cache(async () => {
  const posts = await Promise.all(
    POST_FILE_PATHS.map(async (slug) => await getPost(slug)),
  );
  const sortedDescByDate = posts.sort((a, b) =>
    dateSortDesc(a.frontmatter.publishedAt, b.frontmatter.publishedAt),
  );
  return sortedDescByDate;
});

export const getAllTags = cache(async () => {
  const allTags = (await getAllPosts()).flatMap(
    (post) => post.frontmatter.tags,
  );
  return [...new Set(allTags)];
});
