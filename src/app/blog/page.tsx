import { CardList } from "../../components/CardList";
import { ContentLayout } from "../../components/ContentLayout";
import { TagList } from "../../components/TagList";
import { getAllPosts } from "../../utils/post";

export default async function Page() {
  const posts = await getAllPosts();
  const tags = [
    ...new Set(
      posts.map((post) => post.frontmatter.tags).flatMap((tag) => tag)
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
