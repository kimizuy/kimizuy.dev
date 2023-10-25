import { Download } from "lucide-react";
import Link from "next/link";
import { exit } from "process";
import { MDXComponent } from "@/components/post/mdx-component";
import { bundleDoc } from "@/libs/mdx-bundler";
import { getErrorMessage } from "@/utils/helper";

export default async function Page() {
  const { code } = await getResume();

  return (
    <section className="mx-auto max-w-3xl">
      <MDXComponent code={code} />
      <Link
        href="/Kimizu Yamasaki - Resume.pdf"
        download
        className="mt-12 flex items-center justify-end gap-1"
      >
        Download as PDF
        <Download size={20} />
      </Link>
    </section>
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
