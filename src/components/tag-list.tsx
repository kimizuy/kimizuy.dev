import Link from "next/link";

type Props = {
	tags: string[];
};

export function TagList({ tags }: Props) {
	return (
		<ul className="relative flex w-fit flex-wrap gap-1">
			{tags.map((tag) => (
				<li key={tag}>
					<Link
						href={`/blog/tag/${tag}`}
						className="text-sm underline active:no-underline sm:hover:no-underline"
					>
						#{tag}
					</Link>
				</li>
			))}
		</ul>
	);
}
