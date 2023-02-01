import { ContentLayout } from "../../../components/ContentLayout";
import { OverlayImage } from "../../../components/OverlayImage";
import { Post } from "../../../components/post";
import { Tocbot } from "../../../libs/tocbot";
import { OverlayImageProvider } from "../../../providers/OverlayImageProvider";
import "../../../styles/prism-vsc-dark-plus.css";
import type { InferGenerateStaticParamsType } from "../../../types/next";
import { POST_FILE_PATHS } from "../../../utils/constants";
import { getPost } from "../../../utils/post";

export async function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));
  return slugs;
}

export type PageProps = InferGenerateStaticParamsType<
  typeof generateStaticParams
>;

export default async function Page({ params }: PageProps) {
  const post = await getPost(params.slug);

  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Tocbot />}>
        <Post {...post} />
      </ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
