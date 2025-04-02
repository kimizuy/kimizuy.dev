import { en } from "@/dictionaries/en";
import { type Dictionary, ja } from "@/dictionaries/ja";
import type { Locale } from "./i18n-config";

const dictionaries: Record<Locale, Dictionary> = {
	ja,
	"en-US": en,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];
