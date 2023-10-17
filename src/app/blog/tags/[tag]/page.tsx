import { Metadata } from "next";
import { CardList } from "../../../../components/CardList";
import { ContentLayout } from "../../../../components/ContentLayout";
import { TagList } from "../../../../components/TagList";
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
    openGraph: {
      url: new URL(`/tags/${params.tag}`, SITE_URL),
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
