import "./mdx-bundler.css";
import { existsSync } from "fs";
import { type Root } from "hast";
import { isElement } from "hast-util-is-element";
import { bundleMDX as bundleMDXPrimitive } from "mdx-bundler";
import path from "path";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMdxImages from "remark-mdx-images";
import { SKIP, visit } from "unist-util-visit";

export async function bundleMDX(options: {
  source: string;
  cwd?: string;
  imagesUrl?: string;
}) {
  const { source, cwd, imagesUrl } = options;

  return await bundleMDXPrimitive({
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
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true }],

        customLineNumber,
      ];

      return options;
    },

    esbuildOptions: (options) => {
      if (!imagesUrl) return options;
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
}

const customLineNumber = () => (tree: Root) => {
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

export function getFilePath(targetFolderPath: string): string {
  const mdFilePath = path.join(targetFolderPath, "index.md");
  const mdxFilePath = path.join(targetFolderPath, "index.mdx");

  if (existsSync(mdFilePath)) {
    return mdFilePath;
  } else if (existsSync(mdxFilePath)) {
    return mdxFilePath;
  } else {
    throw new Error(
      `Neither index.md nor index.mdx file found for page: ${targetFolderPath}`
    );
  }
}
