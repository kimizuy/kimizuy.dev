"use client";

import { useLayoutEffect, useState } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width };
}
