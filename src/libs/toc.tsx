"use client";

import "./toc.css";
import { useEffect } from "react";
import tocbot from "tocbot";
import { useWindowWidth } from "../utils/use-window-width";

type Props = { headingSelector?: string };

export function Toc({ headingSelector }: Props) {
  const { width } = useWindowWidth();
  const isMobile = width <= 768;
  const offset = isMobile ? 32 : 48;

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".toc-content",
      headingSelector: headingSelector ?? "h2, h3, h4",
      orderedList: false,
      // ref: http://tscanlin.github.io/tocbot/#fixed-headers
      headingsOffset: offset,
      scrollSmoothOffset: -1 * offset,
    });

    return () => tocbot.destroy();
  }, [headingSelector, offset]);

  return <div className="toc" />;
}
