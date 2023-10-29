import { getMDXComponent } from "mdx-bundler/client";
import { type ReactNode } from "react";
import { cn } from "@/utils/helper";
import { budouxParse } from "../../libs/budoux";
import { PostImage } from "./post-image";

interface Props {
  code: string;
}

export function MDXComponent({ code }: Props) {
  const Component = getMDXComponent(code);

  return (
    <div className="[&>*+*]:mt-[1em]">
      <Component
        components={{
          img: ({ alt, src }) =>
            src && alt ? <PostImage alt={alt} src={src} /> : null,
          h1: (props) => (
            <h1 {...props} className="relative text-3xl font-bold" />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="relative border-b pb-1 text-2xl font-bold"
            />
          ),
          h3: (props) => (
            <h3 {...props} className="relative text-xl font-bold" />
          ),
          h4: (props) => <h3 {...props} className="relative" />,
          ul: (props) => <ul {...props} className="list-disc pl-10" />,
          div: ({ className, ...rest }) => {
            if (className === "footnotes") {
              return <div {...rest} className="mb-4 mt-12" />;
            }

            return <div {...rest} className={className} />;
          },
          blockquote: (props) => (
            <blockquote {...props} className="rounded border p-4 [&_p]:m-0" />
          ),

          p: ({ children, className, ...rest }) => {
            if (isImg(children)) {
              return <>{children}</>;
            }

            return (
              <p
                {...rest}
                className={cn(
                  className,
                  "break-keep leading-7 [overflow-wrap:anywhere]",
                )}
              >
                {budouxParse(children)}
              </p>
            );
          },
          em: ({ children, ...rest }) => (
            <em {...rest}>{budouxParse(children)}</em>
          ),
          a: ({ children, ...rest }) => (
            <a {...rest}>{budouxParse(children)}</a>
          ),
          li: ({ children, ...rest }) => (
            <li {...rest}>{budouxParse(children)}</li>
          ),
        }}
      />
    </div>
  );
}

function isImg(children: ReactNode) {
  if (
    children &&
    typeof children === "object" &&
    "type" in children &&
    typeof children.type === "function" &&
    children.type.name === "img"
  ) {
    return true;
  } else {
    return false;
  }
}
