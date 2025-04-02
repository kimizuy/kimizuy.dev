"use client";

import path from "path-browserify";
import { i18nConfig, isLocale } from "@/utils/i18n-config";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

export function Link({ href, ...props }: Props) {
	const currentPathname = usePathname();
	const currentLocale = getLocaleFromPath(currentPathname);
	const isDefaultLocale = currentLocale === i18nConfig.defaultLocale;
	const newHref = (() => {
		if (isDefaultLocale) return href;
		if (typeof href !== "string") return href;

		return path.join("/", currentLocale, href);
	})();

	return <NextLink {...props} href={newHref} />;
}

function getLocaleFromPath(path: string) {
	const [firstSegment] = path.split("/").filter(Boolean);

	return isLocale(firstSegment) ? firstSegment : i18nConfig.defaultLocale;
}
