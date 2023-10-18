import { allPosts } from "contentlayer/generated";
import { defineDocumentType, makeSource } from "contentlayer/source-files";

type Post = (typeof allPosts)[number];
const getSlug = (doc: Post) => doc._raw.sourceFileName.replace(/\.mdx$/, "");
// const g = (doc: Post) => doc._raw.sourceFileName.replace(/\.mdx$/, "");

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" } },
    image: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/post/${post._raw.flattenedPath}`,
    },
    image: {
      type: "string",
      resolve: (post) => `/${getSlug(post)}/${post._raw.flattenedPath}.png`,
    },
  },
}));

export default makeSource({ contentDirPath: "_demo", documentTypes: [Post] });
