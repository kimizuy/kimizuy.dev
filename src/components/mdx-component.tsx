import { getMDXComponent } from "mdx-bundler/client";
import path from "path";
import { cn } from "@/utils/helpers";
import { type Locale } from "@/utils/i18n-config";
import { translateWithDeepl } from "@/utils/translate-with-deepl";
import { EnlargeableImage } from "./enlargeable-image";
import { Link } from "./link";

interface Props {
  code: string;
  lang: Locale;
  slug?: string;
}

export function MDXComponent({ code, lang, slug }: Props) {
  const Component = getMDXComponent(code);

  return (
    <div className="prose max-w-full dark:prose-invert">
      <Component
        components={{
          img: async ({ alt, src }) => {
            if (!src) return null;
            const translatedAlt = alt
              ? await translateWithDeepl({
                  text: alt,
                  targetLang: lang,
                  context: "Image alt text",
                })
              : "";

            return <EnlargeableImage alt={translatedAlt} src={src} />;
          },
          a: ({ children, href, id, className, ...rest }) => {
            if (!href) return null;
            if (isFullUrl(href)) {
              return (
                <a
                  {...rest}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {children}
                </a>
              );
            } else {
              const isAnchor = href.startsWith("#");
              const newHref =
                isAnchor && slug ? path.join("/", "blog", slug, href) : href;

              return (
                <Link id={id} href={newHref} className={className}>
                  {children}
                </Link>
              );
            }
          },
          pre: ({ className, ...rest }) => (
            <pre
              {...rest}
              className={cn(className, "[&>code]:w-0 [&>code]:block")}
            />
          ),
        }}
      />
    </div>
  );
}

function isFullUrl(url: string): boolean {
  try {
    new URL(url);

    return true;
  } catch (error) {
    return false;
  }
}
