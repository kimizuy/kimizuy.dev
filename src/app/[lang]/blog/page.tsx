import { CardList } from "@/components/card-list";
import { ContentLayout } from "@/components/content-layout";
import { TagList } from "@/components/tag-list";
import { getAllPosts, getAllTags } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { PageProps } from "../../../../.next/types/app/[lang]/layout";

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = getDictionary(lang);

  return {
    title: dictionary.blog,
  };
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const dictionary = getDictionary(lang);

  return (
    <>
      <h1 className="sr-only">{dictionary.blog}</h1>
      <ContentLayout home sideBarItem={<TagList tags={tags} />}>
        <CardList posts={posts} />
      </ContentLayout>
    </>
  );
}
