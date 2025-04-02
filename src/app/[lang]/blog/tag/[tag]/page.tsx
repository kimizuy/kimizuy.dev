import { type Metadata } from "next";
import { CardList } from "@/components/card-list";
import { ContentLayout } from "@/components/content-layout";
import { TagList } from "@/components/tag-list";
import { getAllPosts, getAllTags } from "@/utils/fetchers";
import { PageProps } from "../../../../../../.next/types/app/[lang]/layout";

export async function generateStaticParams() {
  const tags = (await getAllTags()).map((tag) => ({ tag }));

  return tags;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag: title } = await params;

  return {
    title,
    description: `Posts tagged with ${title}`,
    twitter: {
      title,
    },
    openGraph: {
      url: `/blog/tag/${title}`,
      title,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const filteredPostsByTag = posts.filter(({ frontmatter }) =>
    frontmatter.tags.includes(tag),
  );

  return (
    <>
      <ContentLayout home sideBarItem={<TagList tags={tags} />}>
        <h1 className="mb-6 text-4xl font-bold">#{tag}</h1>
        <CardList posts={filteredPostsByTag} />
      </ContentLayout>
    </>
  );
}
