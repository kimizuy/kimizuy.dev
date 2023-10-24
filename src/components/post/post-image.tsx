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
      <Image alt={alt} src={src} fill style={{ objectFit: "contain" }} />
    </div>
  );
}
