import { Metadata } from "next";
import "../../../../styles/prism-vsc-dark-plus.css";
import type { InferGenerateStaticParamsType } from "../../../../types/next";
import { POST_FILE_PATHS, SITE_URL } from "../../../../utils/constants";

export async function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));
  return slugs;
}

export type PageProps = InferGenerateStaticParamsType<
  typeof generateStaticParams
>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // const { frontmatter, cover } = await getPost(params.slug);
  // const image = new URL(cover, SITE_URL);

  return {
    // title: frontmatter.title,
    openGraph: {
      url: new URL(`/posts/${params.slug}`, SITE_URL),
      // title: frontmatter.title,
      // images: image,
    },
  };
}

export default async function Page({ params }: PageProps) {
  // const post = await getPost(params.slug);

  // return <Post {...post} />;
  return <div>{params.slug}</div>;
}
