import { type NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "./utils/i18n-config";

export function middleware(request: NextRequest) {
	return i18nRouter(request, {
		locales: i18nConfig.locales as unknown as string[],
		defaultLocale: i18nConfig.defaultLocale,
	});
}

// only applies this middleware to files in the app directory
export const config = {
	matcher: "/((?!api|static|.*\\..*|_next).*)",
};
