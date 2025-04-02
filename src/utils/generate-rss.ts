/* eslint-disable @typescript-eslint/no-var-requires */
// ref: https://github.com/vercel/next.js/blob/canary/examples/blog/scripts/gen-rss.js
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import RSS from "rss";
import { isFrontmatter } from "./valibot";

async function generate() {
	const feed = new RSS({
		title: "kimizuy blog",
		site_url: "https://kimizuy.dev",
		feed_url: "https://kimizuy.dev/feed.xml",
	});

	const posts = await fs.readdir(path.join(process.cwd(), "_posts"));

	await Promise.all(
		posts.map(async (name) => {
			const content = await fs.readFile(
				path.join(process.cwd(), "_posts", name, "index.mdx"),
			);
			const { data } = matter(content);
			if (!isFrontmatter(data)) return;
			feed.item({
				title: data.title,
				url: `/blog/post/${name}`,
				date: data.publishedAt,
				description: data.description,
				categories: data.tags,
				author: "kimizuy",
			});
		}),
	);

	await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

void generate();
