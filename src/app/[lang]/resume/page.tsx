import { Download } from "lucide-react";
import { Suspense } from "react";
import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/mdx-component";
import { Toc } from "@/components/toc";
import { getDoc } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { type PageProps } from "../layout";

type Props = PageProps;

export function generateMetadata({ params }: Props) {
  const dictionary = getDictionary(params.lang);

  return {
    title: dictionary.resume,
  };
}

export default async function Page({ params: { lang } }: Props) {
  const { code } = await getDoc("resume", lang);
  const dictionary = getDictionary(lang);

  return (
    <>
      <h1 className="sr-only">{dictionary.resume}</h1>
      <ContentLayout
        sideBarItem={
          <>
            <Toc headingSelector="h2" />
            <a
              href={`/Kimizu_Yamasaki_Resume_${lang}.pdf`}
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
            <MDXComponent code={code} />
          </Suspense>
        </div>
      </ContentLayout>
    </>
  );
}
