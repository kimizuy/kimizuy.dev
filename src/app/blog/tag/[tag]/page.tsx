import { type Metadata } from "next";
import { CardList } from "../../../../components/card-list";
import { ContentLayout } from "../../../../components/content-layout";
import { TagList } from "../../../../components/tag-list";
import { SITE_URL } from "../../../../utils/constants";
import { getAllPosts, getAllTags } from "../../../../utils/post";

export async function generateStaticParams() {
  const tags = (await getAllTags()).map((tag) => ({ tag }));

  return tags;
}

export type Props = { params: { tag: string } };

export function generateMetadata({ params }: Props): Metadata {
  const title = params.tag;

  return {
    title,
    description: `Posts tagged with ${title}`,
    twitter: {
      title,
    },
    openGraph: {
      url: new URL(`/blog/tag/${params.tag}`, SITE_URL),
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
    <ContentLayout home sideBarItem={<TagList tags={tags} />}>
      <h1>#{params.tag}</h1>
      <CardList posts={filteredPostsByTag} />
    </ContentLayout>
  );
}
