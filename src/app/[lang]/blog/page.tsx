import { CardList } from "@/components/card-list";
import { ContentLayout } from "@/components/content-layout";
import { TagList } from "@/components/tag-list";
import { getAllPosts, getAllTags } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { type PageProps } from "../layout";

export function generateMetadata({ params }: Props) {
  const dictionary = getDictionary(params.lang);

  return {
    title: dictionary.blog,
  };
}

type Props = PageProps;

export default async function Page({ params }: Props) {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const dictionary = getDictionary(params.lang);

  return (
    <>
      <h1 className="sr-only">{dictionary.blog}</h1>
      <ContentLayout home sideBarItem={<TagList tags={tags} />}>
        <CardList posts={posts} />
      </ContentLayout>
    </>
  );
}
