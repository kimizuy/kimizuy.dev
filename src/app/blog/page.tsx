import { type Metadata } from "next";
import { CardList } from "../../components/card-list";
import { ContentLayout } from "../../components/content-layout";
import { TagList } from "../../components/tag-list";
import { getAllPosts, getAllTags } from "../../utils/post";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Page() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <ContentLayout home sideBarItem={<TagList tags={tags} />}>
      <CardList posts={posts} />
    </ContentLayout>
  );
}
