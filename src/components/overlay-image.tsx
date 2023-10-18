"use client";

import Image from "next/image";
import { useOverlayImage } from "../providers/overlay-image-provider";
import styles from "./overlay-image.module.css";

export function OverlayImage() {
  const { src, setSrc } = useOverlayImage();

  if (!src) return null;

  return (
    <div className={styles.container} onClick={() => setSrc(undefined)}>
      <div className={styles.imageWrapper}>
        <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
      </div>
    </div>
  );
}
