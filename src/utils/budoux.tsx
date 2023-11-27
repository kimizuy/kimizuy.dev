import { loadDefaultJapaneseParser } from "budoux";
import { Fragment, type ReactNode } from "react";

const parser = loadDefaultJapaneseParser();

const isJa = (value: string) => {
  const jaRegex =
    /([\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/;

  return jaRegex.test(value);
};

const parseOnlyJa = (value: string) => {
  const parsed = parser.parse(value);
  const texts = parsed.map((v, i) => {
    if (!isJa(v)) return v;
    if (i === 0) return v;

    return (
      <Fragment key={v + i}>
        <wbr />
        {v}
      </Fragment>
    );
  });

  return texts;
};

export const budouxParse = (value: ReactNode): ReactNode => {
  if (typeof value === "string") return parseOnlyJa(value);

  if (Array.isArray(value))
    return value.map((v) => budouxParse(v as ReactNode));

  return value;
};
