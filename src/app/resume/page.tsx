import { Download } from "lucide-react";
import { type Metadata } from "next";
import { exit } from "process";
import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/post/mdx-component";
import { bundleDoc } from "@/libs/mdx-bundler";
import { Toc } from "@/libs/toc";
import { getErrorMessage } from "@/utils/helper";

export const metadata: Metadata = {
  title: "Resume",
  robots: "noindex",
};

export default async function Page() {
  const { code } = await getResume();

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
            Download as PDF
            <Download size={16} />
          </a>
        </>
      }
    >
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="toc-content">
        <MDXComponent code={code} />
      </div>
    </ContentLayout>
  );
}

const getResume = async () => {
  try {
    const result = await bundleDoc("resume");

    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    exit(1);
  }
};
