"use client";

import Image from "next/image";
import { useOverlayImage } from "../../providers/overlay-image-provider";

interface Props {
  alt: string;
  src: string;
}

export function PostImage({ alt, src }: Props) {
  const { setSrc } = useOverlayImage();

  return (
    <div
      className="relative h-0 cursor-zoom-in overflow-hidden pt-[calc(9/16*100%)]"
      onClick={() => {
        setSrc(src);
      }}
    >
      <Image alt={alt} src={src} fill style={{ objectFit: "contain" }} />
    </div>
  );
}
