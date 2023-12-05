import { type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

export const i18nConfig = {
  locales: ["ja", "en-US", "fr"] satisfies TargetLanguageCode[],
  defaultLocale: "ja" satisfies SourceLanguageCode,
} as const;

export const languages: Record<(typeof i18nConfig)["locales"][number], string> =
  {
    ja: "Japanese",
    "en-US": "English",
    fr: "French",
  };

export type Locale = (typeof i18nConfig)["locales"][number];

export const isLocale = (value: string): value is Locale =>
  i18nConfig.locales.includes(value as Locale);

// test
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("i18nConfig", () => {
    it("should validate valid locale", () => {
      expect(isLocale("ja")).toBe(true);
    });

    it("should invalidate invalid locale", () => {
      expect(isLocale("invalid")).toBe(false);
    });
  });
}
