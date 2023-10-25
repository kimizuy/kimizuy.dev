/* eslint-disable @typescript-eslint/no-var-requires */
// ref: https://github.com/vercel/next.js/blob/canary/examples/blog/scripts/gen-rss.js
const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

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
      const frontmatter = matter(content);

      feed.item({
        title: frontmatter.data.title,
        url: `/blog/post/${name}`,
        date: frontmatter.data.publishedAt,
        description: frontmatter.data.description,
        categories: frontmatter.data.tags,
        author: "kimizuy",
      });
    }),
  );

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}

generate();
