import { getMDXComponent } from "mdx-bundler/client";
import { ReactNode } from "react";
import { budouxParse } from "../../libs/budoux";
import styles from "./MDXComponent.module.css";
import { PostImage } from "./PostImage";

interface Props {
  code: string;
}

export function MDXComponent({ code }: Props) {
  const Component = getMDXComponent(code);

  return (
    <Component
      components={{
        img: ({ alt, src }) =>
          src && alt ? <PostImage alt={alt} src={src} /> : null,
        h1: (props) => <h1 {...props} className={styles.h1} />,
        h2: (props) => <h2 {...props} className={styles.h2} />,
        h3: (props) => <h3 {...props} className={styles.h3} />,
        ul: (props) => <ul {...props} className={styles.ul} />,
        ol: (props) => <ol {...props} className={styles.ol} />,
        div: ({ className, ...rest }) => {
          if (className === "footnotes") {
            return <div {...rest} className={styles.footnotes} />;
          }
          return <div {...rest} className={className} />;
        },
        blockquote: (props) => (
          <blockquote {...props} className={styles.blockquote} />
        ),

        // use budoux
        p: ({ children, ...rest }) => {
          if (isImg(children)) {
            return <>{children}</>;
          }

          return (
            <p {...rest} className={styles.p}>
              {budouxParse(children)}
            </p>
          );
        },
        em: ({ children, ...rest }) => (
          <em {...rest}>{budouxParse(children)}</em>
        ),
        a: ({ children, ...rest }) => <a {...rest}>{budouxParse(children)}</a>,
        li: ({ children, ...rest }) => (
          <li {...rest}>{budouxParse(children)}</li>
        ),
      }}
    />
  );
}

function isImg(children: ReactNode) {
  if (
    children &&
    typeof children === "object" &&
    "type" in children &&
    typeof children["type"] === "function" &&
    children["type"]["name"] === "img"
  ) {
    return true;
  } else {
    return false;
  }
}
