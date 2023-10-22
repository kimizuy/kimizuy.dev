import * as deepl from "deepl-node";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY ?? "");

type TranslateTextParameter = Parameters<deepl.Translator["translateText"]>[0];

export async function translate<T extends TranslateTextParameter>(texts: T) {
  // const targetLanguages = await translator.getTargetLanguages();

  const result = await translator.translateText(texts, "ja", "en-US");

  return result;
}
