"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import { useWindowWidth } from "../utils/useWindowWidth";
import "./tocbot.css";

export function Tocbot() {
  const { width } = useWindowWidth();

  useEffect(() => {
    const isMobile = width ? width <= 768 : undefined;
    const offset = isMobile ? 32 : 48;

    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".post",
      headingSelector: "h2, h3, h4",
      orderedList: false,
      // ref: http://tscanlin.github.io/tocbot/#fixed-headers
      headingsOffset: offset,
      scrollSmoothOffset: -1 * offset,
    });

    return () => tocbot.destroy();
  }, [width]);

  return <div className="toc" />;
}
