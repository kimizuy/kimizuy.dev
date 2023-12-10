import { readFileSync } from "fs";
import { getMDXExport } from "mdx-bundler/client";
import { micromark } from "micromark";
import path from "path";
import { cache } from "react";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { DOCS_PATH, POST_FILE_PATHS, POSTS_PATH } from "./constants";
import { getErrorMessage } from "./helpers";
import { i18nConfig, type Locale } from "./i18n-config";
import { bundleMDX, getFilePath } from "./mdx-bundler";
import { translateWithDeepl } from "./translate-with-deepl";
import { isFrontmatter, isMDXExport } from "./valibot";

export const getPost = cache(async (slug: string, lang: Locale) => {
  try {
    const filePath = getFilePath(path.join(POSTS_PATH, slug));
    const source = readFileSync(filePath, "utf-8");
    const cwd = path.join(POSTS_PATH, slug);
    const imagesUrl = path.join("_posts", slug);
    const translated = await translateMarkdownSource({
      source,
      lang,
      context: "My blog post on web technologies",
    });
    const { code, matter } = await bundleMDX({
      source: translated,
      cwd,
      imagesUrl,
    });
    const frontmatter = matter.data;
    const exported: unknown = getMDXExport(code);
    if (!isFrontmatter(frontmatter) || !isMDXExport(exported)) {
      throw new Error(`Invalid format in "${filePath}".`);
    }
    const translatedTitle = await translateWithDeepl({
      text: frontmatter.title,
      targetLang: lang,
    });
    const translatedDescription = await translateWithDeepl({
      text: frontmatter.description,
      targetLang: lang,
      context: frontmatter.title,
    });
    const { cover } = exported;

    return {
      code,
      frontmatter: {
        ...frontmatter,
        title: translatedTitle,
        description: translatedDescription,
      },
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

export const getAllPosts = cache(async (lang: Locale) => {
  const posts = await Promise.all(
    POST_FILE_PATHS.map(async (slug) => await getPost(slug, lang)),
  );
  const sortedDescByDate = posts.sort(
    (a, b) =>
      b.frontmatter.publishedAt.getTime() - a.frontmatter.publishedAt.getTime(),
  );

  return sortedDescByDate;
});

export const getAllTags = cache(async () => {
  const allTags = (await getAllPosts(i18nConfig.defaultLocale)).flatMap(
    (post) => post.frontmatter.tags,
  );

  return [...new Set(allTags)];
});

export const getDoc = cache(
  async (doc: "home" | "resume" | "project-history", lang: Locale) => {
    try {
      const filePath = getFilePath(path.join(DOCS_PATH, doc));
      const source = readFileSync(filePath, "utf-8");
      const cwd = path.join(DOCS_PATH, doc);
      const imagesUrl = path.join("_docs", doc);
      const translated = await translateMarkdownSource({ source, lang });
      const { code } = await bundleMDX({ source: translated, cwd, imagesUrl });

      return { code };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
      process.exit(1);
    }
  },
);

type TranslateMarkdownSourceOptions = {
  source: string;
  lang: Locale;
  context?: string;
};

const translateMarkdownSource = async ({
  source,
  lang,
  context,
}: TranslateMarkdownSourceOptions) => {
  let inFrontmatter = false;
  let inCodeBlock = false;
  const returnSymbolPattern = /\u21A9/;
  const htmlTagPattern = /<[^>]+>/;

  async function processBatch(batch: string[]) {
    return Promise.all(
      batch.map(async (line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return line;

        if (trimmedLine.startsWith("---")) {
          inFrontmatter = !inFrontmatter;

          return line;
        }

        if (trimmedLine.startsWith("```")) {
          inCodeBlock = !inCodeBlock;

          return line;
        }

        if (
          inFrontmatter ||
          inCodeBlock ||
          trimmedLine.startsWith("export") ||
          returnSymbolPattern.test(trimmedLine) ||
          htmlTagPattern.test(trimmedLine)
        ) {
          return line;
        }

        const html = turnMarkdownIntoHtml(line);
        const translatedHtml = await translateWithDeepl({
          text: html,
          targetLang: lang,
          context,
          shouldHandleHtml: true,
        });
        const translatedMarkdown = await turnHtmlIntoMarkdown(translatedHtml);

        return translatedMarkdown;
      }),
    );
  }

  async function manageBatches(allLines: string[]) {
    let result: string[] = [];
    for (let i = 0; i < allLines.length; i += 50) {
      const batch = allLines.slice(i, i + 50);
      const translatedBatch = await processBatch(batch);
      result = result.concat(translatedBatch);
    }

    return result;
  }

  const lines = source.split("\n");
  const translatedLines = await manageBatches(lines);

  return translatedLines.join("\n");
};

const turnMarkdownIntoHtml = (markdown: string) => micromark(markdown);

const turnHtmlIntoMarkdown = async (html: string) => {
  const processed = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify, { resourceLink: true })
    .process(html);

  return processed.toString();
};
