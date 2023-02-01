"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
import "./tocbot.css";

export function Tocbot() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".post",
      headingSelector: "h1, h2, h3",
      orderedList: false,
      // ref: http://tscanlin.github.io/tocbot/#fixed-headers
      headingsOffset: 48,
      scrollSmoothOffset: -48,
    });

    return () => tocbot.destroy();
  }, []);

  return <div className="toc" />;
}
