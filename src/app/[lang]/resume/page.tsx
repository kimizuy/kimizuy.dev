import { Download } from "lucide-react";
import { type Metadata } from "next";
import { Suspense } from "react";
import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/mdx-component";
import { Toc } from "@/components/toc";
import { getDoc } from "@/utils/fetchers";
import { type PageProps } from "../layout";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = PageProps;

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("resume", lang);

  return (
    <ContentLayout
      sideBarItem={
        <>
          <Toc headingSelector="h2" />
          <a
            href="/Kimizu Yamasaki - Resume.pdf"
            download
            className="mt-12 flex items-center justify-end gap-1 text-xs"
            target="_blank"
          >
            <Download size={16} />
            Download as PDF
          </a>
        </>
      }
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="toc-content">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXComponent code={code} lang={lang} />
        </Suspense>
      </div>
    </ContentLayout>
  );
}
