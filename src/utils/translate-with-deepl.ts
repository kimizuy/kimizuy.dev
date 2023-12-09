import "server-only";
import * as deepl from "deepl-node";
import { cache } from "react";
import { i18nConfig, type Locale } from "./i18n-config";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY!);

type TranslateTextOptions = {
  text: string;
  targetLang: Locale;
  context?: string;
  shouldHandleHtml?: boolean;
};

export const translateWithDeepl = cache(
  async ({
    text,
    targetLang,
    context,
    shouldHandleHtml,
  }: TranslateTextOptions) => {
    if (targetLang === i18nConfig.defaultLocale) return text;
    const translated = await translator.translateText(
      text,
      i18nConfig.defaultLocale,
      targetLang,
      {
        // "context" is alpha feature. it may be deprecated in the future
        // ref: https://github.com/DeepLcom/deepl-node#text-translation-options
        context: context ?? "My portfolio site",
        tagHandling: shouldHandleHtml ? "html" : undefined,
      },
    );

    return translated.text;
  },
);
