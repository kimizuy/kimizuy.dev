import { readFileSync } from "fs";
import { getMDXExport } from "mdx-bundler/client";
import path from "path";
import { cache } from "react";
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
    const translated = await translateSource(
      source,
      lang,
      "My blog post on web technologies",
    );
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
    const translatedTitle = await translateWithDeepl(frontmatter.title, lang);
    const translatedDescription = await translateWithDeepl(
      frontmatter.description,
      lang,
      frontmatter.title,
    );
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
      const translated = await translateSource(source, lang);
      const { code } = await bundleMDX({ source: translated, cwd, imagesUrl });

      return { code };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error(errorMessage);
      process.exit(1);
    }
  },
);

const translateSource = async (
  source: string,
  lang: Locale,
  context?: string,
) => {
  const lines = source.split("\n");
  let inFrontmatter = false;
  let inCodeBlock = false;
  const translatedLines = await Promise.all(
    lines.map(async (line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return line; // Skip empty lines (including lines with only whitespace

      // Check for frontmatter start or end
      if (trimmedLine.startsWith("---")) {
        inFrontmatter = !inFrontmatter;

        return line;
      }

      // Check for code block start or end
      if (trimmedLine.startsWith("```")) {
        inCodeBlock = !inCodeBlock;

        return line;
      }

      // Skip translation for lines within code blocks or starting with `!` or `export`
      if (
        inFrontmatter ||
        inCodeBlock ||
        trimmedLine.startsWith("!") ||
        trimmedLine.startsWith("export") ||
        isReturnSymbol(trimmedLine)
      ) {
        return line;
      }

      // Translate the line here using your translation function
      const translatedLine = await translateWithDeepl(line, lang, context); // Replace this with your actual translation logic

      return translatedLine;
    }),
  );

  return translatedLines.join("\n");
};

function isReturnSymbol(char: string) {
  return char === "\u21A9";
}
