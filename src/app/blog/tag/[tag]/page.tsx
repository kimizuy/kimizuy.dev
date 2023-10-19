import { Metadata } from "next";
import { CardList } from "../../../../components/card-list";
import { ContentLayout } from "../../../../components/content-layout";
import { TagList } from "../../../../components/tag-list";
import { InferGenerateStaticParamsType } from "../../../../types/next";
import { SITE_URL } from "../../../../utils/constants";
import { getAllPosts, getAllTags } from "../../../../utils/post";

export async function generateStaticParams() {
  const tags = (await getAllTags()).map((tag) => ({ tag }));
  return tags;
}

export type PageProps = InferGenerateStaticParamsType<
  typeof generateStaticParams
>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const title = params.tag;

  return {
    title,
    twitter: {
      title,
    },
    openGraph: {
      url: new URL(`/blog/tag/${params.tag}`, SITE_URL),
      title,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const posts = await getAllPosts();
  const tags = [
    ...new Set(
      posts.map((post) => post.frontmatter.tags).flatMap((tag) => tag),
    ),
  ];
  const filteredPostsByTag = posts.filter(({ frontmatter }) =>
    frontmatter.tags.includes(params.tag),
  );

  return (
    <ContentLayout
      home
      sideBarItem={
        <>
          <TagList tags={tags} />
        </>
      }
    >
      <h1>#{params.tag}</h1>
      <CardList posts={filteredPostsByTag} />
    </ContentLayout>
  );
}
