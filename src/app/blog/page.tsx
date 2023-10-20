import { CardList } from "../../components/card-list";
import { ContentLayout } from "../../components/content-layout";
import { TagList } from "../../components/tag-list";
import { getAllPosts } from "../../utils/post";

export default async function Page() {
  const posts = await getAllPosts();
  const tags = [
    ...new Set(
      posts.map((post) => post.frontmatter.tags).flatMap((tag) => tag),
    ),
  ];

  return (
    <ContentLayout
      home
      sideBarItem={
        <>
          <TagList tags={tags} />
          {/* <Tweet /> */}
        </>
      }
    >
      <CardList posts={posts} />
    </ContentLayout>
  );
}
