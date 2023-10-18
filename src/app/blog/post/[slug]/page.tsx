import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../../../styles/prism-vsc-dark-plus.css";
import type { InferGenerateStaticParamsType } from "../../../../types/next";
import { SITE_URL } from "../../../../utils/constants";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

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
  console.log(params.slug, allPosts);
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  console.log(post);

  return (
    <div>
      <div>{post.title}</div>
      {/* <div>{post.image}</div> */}
      {/* <div>{post.title}</div> */}
    </div>
  );
}
