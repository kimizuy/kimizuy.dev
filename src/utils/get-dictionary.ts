import { en } from "@/dictionaries/en";
import { fr } from "@/dictionaries/fr";
import { ja } from "@/dictionaries/ja";
import type { Locale } from "./i18n-config";

const dictionaries = {
  ja,
  "en-US": en,
  fr,
};

export const getDictionary = (locale: Locale) => dictionaries[locale];
