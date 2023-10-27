"use client";

import "./toc.css";
import { useEffect } from "react";
import tocbot from "tocbot";

type Props = { headingSelector?: string };

export function Toc({ headingSelector }: Props) {
  const offset = 10 * 16;

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".toc-content",
      headingSelector: headingSelector ?? "h2, h3, h4",
      orderedList: false,
      scrollSmooth: false,
      // ref: http://tscanlin.github.io/tocbot/#fixed-headers
      headingsOffset: offset,
      scrollSmoothOffset: -1 * offset,
    });

    return () => tocbot.destroy();
  }, [headingSelector, offset]);

  return <div className="toc" />;
}
