import { readFileSync } from "fs";
import { bundleMDX as _bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
import { visit } from "unist-util-visit";
import { POSTS_PATH } from "../utils/constants";
import "./mdx-bundler.css";

export async function bundleMDX(slug: string) {
  const postFilePath = path.join(POSTS_PATH, slug, "index.mdx");
  const source = readFileSync(postFilePath, "utf-8");
  const cwd = path.join(POSTS_PATH, slug);
  const imagesUrl = path.join("_posts", slug);

  const result = await _bundleMDX({
    source,
    cwd,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        // ref: https://www.timjfoster.com/posts/mdx-bundler-with-images
        remarkMdxImages,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          // ref: https://neos21.net/blog/2020/11/14-01.html
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

        // ref: https://github.com/CanRau/canrau.com
        () => {
          return (tree) => {
            visit(tree, "element", (node, index, parent) => {
              if (!node) return;

              let [token, type] = node.properties?.className || [];

              if (token === "code-line" && type === "line-number") {
                const lineNumber = node.properties.line;
                const numberDigit = String(parent.children.length).length;

                node.children.unshift({
                  type: "element",
                  tagName: "span",
                  properties: {
                    style: { minWidth: `${numberDigit}ch` },
                  },
                  children: [
                    {
                      type: "text",
                      value: lineNumber,
                    },
                  ],
                });
              }
            });
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
