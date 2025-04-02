import "@/styles/prism-vsc-dark-plus.css";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ContentLayout } from "@/components/content-layout";
import { Link } from "@/components/link";
import { MDXComponent } from "@/components/mdx-component";
import { OverlayImage } from "@/components/overlay-image";
import { OverlayImageProvider } from "@/components/overlay-image-provider";
import { Toc } from "@/components/toc";
import { POST_FILE_PATHS } from "@/utils/constants";
import { getPost } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { PageProps } from "../../../../../../.next/types/app/[lang]/layout";

export function generateStaticParams() {
  const slugs = POST_FILE_PATHS.map((slug) => ({ slug }));

  return slugs;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter, cover } = await getPost(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    twitter: {
      title: frontmatter.title,
      images: `/${cover}`,
      card: "summary",
    },
    openGraph: {
      url: `/blog/post/${slug}`,
      title: frontmatter.title,
      images: `/${cover}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  const { code, frontmatter } = await getPost(slug);
  const dictionary = getDictionary(lang);

  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Toc />}>
        <div className="grid gap-16">
          <header>
            <h1 className="text-3xl font-bold tracking-tighter">
              {frontmatter.title}
            </h1>
            <div className="mt-4 text-sm">
              <time dateTime={frontmatter.publishedAt.toISOString()}>
                {format(frontmatter.publishedAt, "yyyy-MM-dd")}
              </time>
            </div>
          </header>
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <main className="toc-content">
            <Suspense fallback={<div>Loading...</div>}>
              <MDXComponent code={code} slug={slug} />
            </Suspense>
          </main>
          <footer>
            <Link href="/blog" className="flex gap-1">
              <ChevronLeft />
              {dictionary.backToBlogTop}
            </Link>
          </footer>
        </div>
      </ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
