"use client";

import "./toc.css";
import { useEffect } from "react";
import tocbot from "tocbot";
import { useWindowWidth } from "../utils/use-window-width";

export function Toc() {
  const { width } = useWindowWidth();
  const isMobile = width ? width <= 768 : undefined;
  const offset = isMobile ? 32 : 48;

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".toc-content",
      headingSelector: "h2, h3, h4",
      orderedList: false,
      // ref: http://tscanlin.github.io/tocbot/#fixed-headers
      headingsOffset: offset,
      scrollSmoothOffset: -1 * offset,
    });

    return () => tocbot.destroy();
  }, [offset]);

  return <div className="toc" />;
}