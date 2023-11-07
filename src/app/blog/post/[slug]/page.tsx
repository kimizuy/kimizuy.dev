import "@/styles/prism-vsc-dark-plus.css";
import { type Metadata } from "next";
import { ContentLayout } from "@/components/content-layout";
import { OverlayImage } from "@/components/overlay-image";
import { Post } from "@/components/post";
import { Toc } from "@/libs/toc";
import { OverlayImageProvider } from "@/providers/overlay-image-provider";
import { POST_FILE_PATHS } from "@/utils/constants";
import { getPost } from "@/utils/post";

export function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));

  return slugs;
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter, cover } = await getPost(params.slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    twitter: {
      title: frontmatter.title,
      images: `/${cover}`,
      card: "summary",
    },
    openGraph: {
      url: `/blog/post/${params.slug}`,
      title: frontmatter.title,
      images: `/${cover}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);

  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Toc />}>
        <Post {...post} />
      </ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
