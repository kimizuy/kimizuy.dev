import "./mdx-bundler.css";
import { type Root } from "hast";
import { isElement } from "hast-util-is-element";
import { bundleMDX as bundleMDXPrimitive } from "mdx-bundler";
import path from "path";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import remarkGfm from "remark-gfm";
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
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true }],
        rehypeMdxImportMedia,
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
    const isOneDigit = lineNumber.length === 1;
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: { class: isOneDigit ? "mr-2ch" : "mr-1ch" },
      children: [
        {
          type: "text",
          value: lineNumber,
        },
      ],
    });
  });
};
