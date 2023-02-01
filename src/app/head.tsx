import { PROFILE_IMAGE, SITE_TITLE, SITE_URL } from "../utils/constants";

export default function Head() {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kimizuy" />
      <meta name="twitter:creator" content="@kimizuy" />
      <meta name="twitter:title" content={SITE_TITLE} />
      <meta name="twitter:description" content="kimizuy のブログです" />
      <meta name="twitter:image" content={PROFILE_IMAGE} />
      <meta property="og:url" content={`${SITE_URL}`} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content="kimizuy のブログです" />
      <meta property="og:image" content={PROFILE_IMAGE} />

      <title>kimizuy blog</title>
      <meta name="description" content="kimizuy のブログです" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
