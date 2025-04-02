"use client";

import path from "path-browserify";
import { getDictionary } from "@/utils/get-dictionary";
import {
	type Locale,
	i18nConfig,
	isLocale,
	languages,
} from "@/utils/i18n-config";
import * as Popover from "@radix-ui/react-popover";
import { Globe, MenuIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "./link";
import { ModeToggle } from "./mode-toggle";

type Props = { lang: Locale };

export function Navigation({ lang }: Props) {
	const dictionary = getDictionary(lang);
	const pathname = usePathname();
	const noI18n = ["blog", "resume"].some((p) =>
		pathname.split(path.sep).includes(p),
	);

	return (
		<nav className="flex gap-2 md:gap-4">
			{/* Mobile menu */}
			<div className="flex md:hidden">
				<Popover.Root>
					<Popover.Trigger asChild>
						<button type="button" aria-label="Open navigation">
							<MenuIcon />
						</button>
					</Popover.Trigger>
					<Popover.Anchor />
					<Popover.Portal>
						<Popover.Content className="z-20 m-2 grid place-items-start gap-2 border bg-background p-4 md:hidden">
							<Link href="/blog">Blog</Link>
							<Link href="/resume">Resume</Link>
							{!noI18n ? (
								<>
									<div className="my-1 w-full border-t" />
									<Globe
										size={16}
										className="text-muted-foreground"
										aria-label={dictionary.language}
									/>
									<LanguageChanger lang={lang} />
								</>
							) : null}
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			</div>

			{/* Desktop menu */}
			<div className="hidden gap-4 md:flex">
				<Link href="/blog">Blog</Link>
				<Link href="/resume">Resume</Link>
				{!noI18n ? (
					<div className="flex">
						<Popover.Root>
							<Popover.Trigger asChild>
								<button type="button" aria-label="Switch language">
									<Globe />
								</button>
							</Popover.Trigger>
							<Popover.Anchor />
							<Popover.Portal>
								<Popover.Content className="z-20 m-2 hidden place-items-start gap-2 border bg-background p-4 md:grid">
									<LanguageChanger lang={lang} />
								</Popover.Content>
							</Popover.Portal>
						</Popover.Root>
					</div>
				) : null}
			</div>

			<ModeToggle />
		</nav>
	);
}

function LanguageChanger({ lang }: Props) {
	const router = useRouter();
	const currentPathname = usePathname();
	const [first, ...rest] = currentPathname.split(path.sep).filter(Boolean);
	const isDefaultLocaleNow = !isLocale(first);

	const handleClick = (newLocale: string) => {
		const days = 30;
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `; expires=${date.toUTCString()}`;
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
		if (isDefaultLocaleNow) {
			// "/about" -> "/en/about"
			router.push(path.join("/", newLocale, currentPathname));

			return;
		}
		// "/en/about" -> "/ja/about"
		router.push(path.join("/", newLocale, ...rest));
	};

	return (
		<>
			{i18nConfig.locales.map((locale) => (
				<button
					key={locale}
					type="button"
					onClick={() => handleClick(locale)}
					className={`${
						locale === lang
							? "font-bold text-foreground"
							: "text-muted-foreground"
					}`}
				>
					{languages[locale]}
				</button>
			))}
		</>
	);
}
