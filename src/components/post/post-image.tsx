"use client";

import Image from "next/image";
import { useOverlayImage } from "../../providers/overlay-image-provider";
import styles from "./post-image.module.css";

interface Props {
  alt: string;
  src: string;
}

export function PostImage({ alt, src }: Props) {
  const { setSrc } = useOverlayImage();

  return (
    <div
      className={styles.container}
      onClick={() => {
        setSrc(src);
      }}
    >
      <Image
        alt={alt}
        src={src}
        fill
        // https://nextjs.org/docs/api-reference/next/image#sizes
        sizes="(max-width: 768px) 100vw, 75vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
