import { SITE_TITLE, SITE_URL } from "../../../utils/constants";
import { getPost } from "../../../utils/post";
import { PageProps } from "./page";

export default async function Head({ params }: PageProps) {
  const { frontmatter, cover } = await getPost(params.slug);
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <title>
        {/* FIXME: https://github.com/vercel/next.js/issues/45389 */}
        {/* {frontmatter.title} – {SITE_TITLE} */}
        {frontmatter.title}
      </title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kimizuy" />
      <meta name="twitter:creator" content="@kimizuy" />
      <meta
        name="twitter:title"
        content={`${frontmatter.title} – kimizuy blog`}
      />
      <meta name="twitter:description" content={frontmatter.description} />
      {!isDevelopment && (
        <meta name="twitter:image" content={`${SITE_URL}${cover}`} />
      )}
      <meta property="og:url" content={`${SITE_URL}/${params.slug}`} />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={`${frontmatter.title} – ${SITE_TITLE}`}
      />
      <meta property="og:description" content={frontmatter.description} />
      {!isDevelopment && (
        <meta property="og:image" content={`${SITE_URL}${cover}`} />
      )}
      <meta name="description" content={frontmatter.description}></meta>
    </>
  );
}
