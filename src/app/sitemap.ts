import { type MetadataRoute } from "next";
import { POST_FILE_PATHS, SITE_URL } from "@/utils/constants";
import { getAllTags } from "@/utils/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const postPages: MetadataRoute.Sitemap = POST_FILE_PATHS.map((slug) => ({
    url: new URL(`/blog/post/${encodeURIComponent(slug)}`, SITE_URL).href,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const tags = await getAllTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: new URL(`/blog/tag/${encodeURIComponent(tag)}`, SITE_URL).href,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: new URL("/blog", SITE_URL).href,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...postPages,
    ...tagPages,
  ];
}
