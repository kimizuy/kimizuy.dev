import { type Metadata } from "next";
import { exit } from "process";
import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/post/mdx-component";
import { bundleDoc } from "@/libs/mdx-bundler";
import { Toc } from "@/libs/toc";
import { getErrorMessage } from "@/utils/helper";

export const metadata: Metadata = {
  title: "Project History",
  description: "Here is my entire project history",
  robots: "noindex",
};

export default async function Page() {
  const { code } = await getResume();

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
        <MDXComponent code={code} />
      </div>
    </ContentLayout>
  );
}

const getResume = async () => {
  try {
    const result = await bundleDoc("project-history");

    return result;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    exit(1);
  }
};
