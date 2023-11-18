import "./mdx-bundler.css";
import { readFileSync } from "fs";
import { type Root } from "hast";
import { isElement } from "hast-util-is-element";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
import { SKIP, visit } from "unist-util-visit";
import { POSTS_PATH } from "../utils/constants";

export async function bundlePost(slug: string) {
  const postFilePath = path.join(POSTS_PATH, slug, "index.mdx");
  const source = readFileSync(postFilePath, "utf-8");
  const cwd = path.join(POSTS_PATH, slug);
  const imagesUrl = path.join("_posts", slug);

  const result = await bundleMDX({
    source,
    cwd,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMdxImages, // ref: https://www.timjfoster.com/posts/mdx-bundler-with-images
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings, // ref: https://neos21.net/blog/2020/11/14-01.html
          {
            behavior: "prepend",
            properties: { className: "anchor", ariaHidden: true, tabIndex: -1 },
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: ["anchor-text"],
                ariaHidden: true,
              },
            },
          },
        ],
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true }],

        () => {
          return (tree: Root) => {
            customLineNumber(tree); // ref: https://github.com/CanRau/canrau.com
          };
        },
      ];

      return options;
    },

    esbuildOptions: (options) => {
      options.outdir = path.join(process.cwd(), "public", imagesUrl);
      options.loader = {
        ...options.loader,
        ".avif": "file",
        ".webp": "file",
        ".png": "file",
        ".jpg": "file",
        ".jpeg": "file",
        ".gif": "file",
      };
      options.publicPath = `/${imagesUrl}`;
      options.write = true;

      return options;
    },
  });

  return result;
}

export async function bundleDoc(doc: "home" | "resume" | "project-history") {
  const resumeFilePath = path.join(process.cwd(), "_docs", doc, "index.md");
  const source = readFileSync(resumeFilePath, "utf-8");
  const result = await bundleMDX({
    source,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: { className: "anchor", ariaHidden: true, tabIndex: -1 },
            content: {
              type: "element",
              tagName: "span",
              properties: {
                className: ["anchor-text"],
                ariaHidden: true,
              },
            },
          },
        ],
      ];

      return options;
    },
  });

  return result;
}

const customLineNumber = (tree: Root) => {
  visit(tree, "element", (node) => {
    if (!isElement(node, "span")) return;
    const classes = node.properties.className;
    if (!Array.isArray(classes)) return SKIP;
    const [token, type] = classes;
    if (!(token === "code-line" && type === "line-number")) return SKIP;
    const lineNumber = String(node.properties.line);
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {},
      children: [
        {
          type: "text",
          value: lineNumber,
        },
      ],
    });
  });
};
