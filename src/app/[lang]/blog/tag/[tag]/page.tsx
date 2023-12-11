import { type Metadata } from "next";
import { type PageProps } from "@/app/[lang]/layout";
import { CardList } from "@/components/card-list";
import { ContentLayout } from "@/components/content-layout";
import { TagList } from "@/components/tag-list";
import { getAllPosts, getAllTags } from "@/utils/fetchers";

export async function generateStaticParams() {
  const tags = (await getAllTags()).map((tag) => ({ tag }));

  return tags;
}

export type Props = { params: { tag: string } } & PageProps;

export function generateMetadata({ params }: Props): Metadata {
  const title = params.tag;

  return {
    title,
    description: `Posts tagged with ${title}`,
    twitter: {
      title,
    },
    openGraph: {
      url: `/blog/tag/${params.tag}`,
      title,
    },
  };
}

export default async function Page({ params }: Props) {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const filteredPostsByTag = posts.filter(({ frontmatter }) =>
    frontmatter.tags.includes(params.tag),
  );

  return (
    <>
      <ContentLayout home sideBarItem={<TagList tags={tags} />}>
        <h1 className="mb-6 text-4xl font-bold">#{params.tag}</h1>
        <CardList posts={filteredPostsByTag} />
      </ContentLayout>
    </>
  );
}
