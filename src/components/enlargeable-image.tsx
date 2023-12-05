"use client";

import NextImage from "next/image";
import { useOverlayImage } from "./overlay-image-provider";

interface Props {
  alt: string;
  src: string;
}

export function EnlargeableImage({ alt, src }: Props) {
  const { setSrc } = useOverlayImage();

  return (
    <span
      className="relative block h-0 cursor-zoom-in overflow-hidden pt-[calc(9/16*100%)]"
      onClick={() => setSrc(src)}
    >
      <NextImage alt={alt} src={src} fill className="m-0 object-contain" />
    </span>
  );
}
