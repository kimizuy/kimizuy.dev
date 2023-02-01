import { getMDXExport } from "mdx-bundler/client";
import { notFound } from "next/navigation";
import { bundleMDX } from "../libs/mdx-bundler";
import { isFrontmatter, isMDXExport } from "../libs/type-predicates";
import { POST_FILE_PATHS } from "./constants";
import { dateSortDesc, getErrorMessage } from "./helper";

export async function getPost(slug: string) {
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
    notFound();
  }
}

export type Post = Awaited<ReturnType<typeof getPost>>;

export async function getAllPosts() {
  const posts = await Promise.all(POST_FILE_PATHS.map((slug) => getPost(slug)));
  const sortedByDate = posts.sort((a, b) =>
    dateSortDesc(a.frontmatter.publishedAt, b.frontmatter.publishedAt)
  );
  return sortedByDate;
}

export const getAllTags = async () => {
  const allTags = await getAllPosts().then((post) =>
    post.map((v) => v.frontmatter.tags)
  );
  const uniqueTags = [...new Set(allTags.flatMap((tag) => tag))];
  return uniqueTags;
};
