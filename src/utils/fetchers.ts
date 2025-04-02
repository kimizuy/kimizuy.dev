import { readFileSync } from "fs";
import { getMDXExport } from "mdx-bundler/client";
import path from "path";
import { cache } from "react";
import { DOCS_PATH, POST_FILE_PATHS, POSTS_PATH } from "./constants";
import { getErrorMessage } from "./helpers";
import { type Locale } from "./i18n-config";
import { bundleMDX } from "./mdx-bundler";
import { isFrontmatter, isMDXExport } from "./valibot";

export const getPost = cache(async (slug: string) => {
	try {
		const filePath = path.join(POSTS_PATH, slug, "index.mdx");
		const source = readFileSync(filePath, "utf-8");
		const cwd = path.join(POSTS_PATH, slug);
		const imagesUrl = path.join("_posts", slug);
		const { code, matter } = await bundleMDX({
			source,
			cwd,
			imagesUrl,
		});
		const frontmatter = matter.data;
		const exported: unknown = getMDXExport(code);
		if (!isFrontmatter(frontmatter) || !isMDXExport(exported)) {
			throw new Error(`Invalid format in "${filePath}".`);
		}
		const { cover } = exported;

		return {
			code,
			frontmatter,
			slug,
			cover,
		};
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		console.error(errorMessage);
		process.exit(1);
	}
});

export type Post = Awaited<ReturnType<typeof getPost>>;

export const getAllPosts = cache(async () => {
	const posts = await Promise.all(
		POST_FILE_PATHS.map(async (slug) => await getPost(slug)),
	);
	const sortedDescByDate = posts.sort(
		(a, b) =>
			b.frontmatter.publishedAt.getTime() - a.frontmatter.publishedAt.getTime(),
	);

	return sortedDescByDate;
});

export const getAllTags = cache(async () => {
	const allTags = (await getAllPosts()).flatMap(
		(post) => post.frontmatter.tags,
	);

	return [...new Set(allTags)];
});

export const getDoc = cache(async (doc: "home" | "resume", lang: Locale) => {
	try {
		const filePath = path.join(DOCS_PATH, doc, lang, "index.md");
		const source = readFileSync(filePath, "utf-8");
		const cwd = path.join(DOCS_PATH, doc);
		const imagesUrl = path.join("_docs", doc);
		const { code } = await bundleMDX({ source, cwd, imagesUrl });

		return { code };
	} catch (error) {
		const errorMessage = getErrorMessage(error);
		console.error(errorMessage);
		process.exit(1);
	}
});
