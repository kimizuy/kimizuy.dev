import { PROFILE_IMAGE, SITE_URL } from "../../../utils/constants";
import { PageProps } from "./page";

export default async function Head({ params }: PageProps) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const tag = `#${params.tag}`;

  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <title>{tag}</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kimizuy" />
      <meta name="twitter:creator" content="@kimizuy" />
      <meta name="twitter:title" content={`${tag} – kimizuy blog`} />
      {!isDevelopment && <meta name="twitter:image" content={PROFILE_IMAGE} />}
      <meta property="og:url" content={`${SITE_URL}/tags/${params.tag}`} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={`${tag} – kimizuy blog`} />
      {!isDevelopment && <meta property="og:image" content={PROFILE_IMAGE} />}
    </>
  );
}
