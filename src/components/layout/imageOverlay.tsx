import { getSrcName } from '@/lib/utils'
import { useImageOverlay } from '@/providers/imageOverlayProvider'
import Image from 'next/image'
import styles from './imageOverlay.module.css'

export const ImageOverlay: React.VFC = () => {
  const { src, setSrc } = useImageOverlay()

  if (!src) return null

  const srcName = getSrcName((src as any).src)

  return (
    <div className={styles.overlay} onClick={() => setSrc('')}>
      <div className={styles.overlayImgWrapper}>
        <Image src={src} alt={srcName} layout="fill" objectFit="contain" />
      </div>
    </div>
  )
}
