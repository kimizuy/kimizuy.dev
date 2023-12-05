import { type Metadata } from "next";
import { CardList } from "@/components/card-list";
import { ContentLayout } from "@/components/content-layout";
import { TagList } from "@/components/tag-list";
import { getAllPosts, getAllTags } from "@/utils/fetchers";
import { type PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = PageProps;

export default async function Page({ params }: Props) {
  const posts = await getAllPosts(params.lang);
  const tags = await getAllTags();

  return (
    <ContentLayout home sideBarItem={<TagList tags={tags} />}>
      <CardList posts={posts} />
    </ContentLayout>
  );
}
