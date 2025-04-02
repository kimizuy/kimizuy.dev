import { ContentLayout } from "@/components/content-layout";
import { MDXComponent } from "@/components/mdx-component";
import { Toc } from "@/components/toc";
import { getDoc } from "@/utils/fetchers";
import { getDictionary } from "@/utils/get-dictionary";
import { Download } from "lucide-react";
import { Suspense } from "react";
import type { PageProps } from "../../../../.next/types/app/[lang]/page";

export async function generateMetadata({ params }: PageProps) {
	const { lang } = await params;
	const dictionary = getDictionary(lang);

	return {
		title: dictionary.resume,
	};
}

export default async function Page({ params }: PageProps) {
	const { lang } = await params;
	const { code } = await getDoc("resume", "en-US");
	const dictionary = getDictionary(lang);

	return (
		<>
			<h1 className="sr-only">{dictionary.resume}</h1>
			<ContentLayout
				sideBarItem={
					<>
						<Toc headingSelector="h2,h3" />
						<a
							href={"/Kimizu_Yamasaki_Resume.pdf"}
							download
							className="mt-12 flex items-center justify-end gap-1 text-xs"
							target="_blank"
							rel="noreferrer"
						>
							<Download size={16} />
							Download as PDF
						</a>
					</>
				}
			>
				<div className="toc-content">
					<Suspense fallback={<div>Loading...</div>}>
						<MDXComponent code={code} />
					</Suspense>
				</div>
			</ContentLayout>
		</>
	);
}
