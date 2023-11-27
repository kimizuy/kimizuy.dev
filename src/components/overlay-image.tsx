"use client";

import Image from "next/image";
import { useOverlayImage } from "./overlay-image-provider";

export function OverlayImage() {
  const { src, setSrc } = useOverlayImage();

  if (!src) return null;

  return (
    <div
      className="absolute left-0 top-0 z-[999] h-full w-full bg-[hsl(0deg_0%_8%/40%)]"
      onClick={() => setSrc(undefined)}
    >
      <div className="fixed left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
        <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}
