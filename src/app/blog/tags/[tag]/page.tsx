// import { getAllPosts, getAllTags } from "../../../../utils/post";

import { ContentLayout } from "../../../../components/content-layout";

// export async function generateStaticParams() {
//   const tags = (await getAllTags()).map((tag) => ({ tag }));
//   return tags;
// }

// export type PageProps = InferGenerateStaticParamsType<
//   typeof generateStaticParams
// >;

// export async function generateMetadata({
//   params,
// }: PageProps)
//   : Promise<Metadata> {
//   const title = params.tag;

//   return {
//     title,
//     openGraph: {
//       url: new URL(`/tags/${params.tag}`, SITE_URL),
//       title,
//     },
//   };
// }

// export default async function Page({ params }: PageProps) {
export default async function Page() {
  // const posts = await getAllPosts();
  // const tags = [
  //   ...new Set(
  //     posts.map((post) => post.frontmatter.tags).flatMap((tag) => tag),
  //   ),
  // ];
  // const filteredPostsByTag = posts.filter(({ frontmatter }) =>
  //   frontmatter.tags.includes(params.tag),
  // );

  return (
    <ContentLayout home sideBarItem={<>{/* <TagList tags={tags} /> */}</>}>
      {/* <h1>#{params.tag}</h1>
      <CardList posts={filteredPostsByTag} /> */}
    </ContentLayout>
  );
}
