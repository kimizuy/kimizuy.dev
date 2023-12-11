import { type Metadata } from "next";
import { Suspense } from "react";
import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/mdx-component";
import { Toc } from "@/components/toc";
import { getDoc } from "@/utils/fetchers";
import { type PageProps } from "../../layout";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("project-history", lang);

  return (
    <ContentLayout
      sideBarItem={
        <>
          <Toc headingSelector="h2,h3" />
        </>
      }
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="toc-content">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXComponent code={code} />
        </Suspense>
      </div>
    </ContentLayout>
  );
}
