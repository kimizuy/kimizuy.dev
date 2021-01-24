import styles from './logo.module.css'
import { NAME, SITE_TITLE } from '@/lib/constants'
import profile from '../../public/profile.jpg'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export const Logo: React.VFC = () => {
  return (
    <Link href="/">
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <Image
            src={profile}
            alt={NAME}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className={styles.headerTitle}>{SITE_TITLE}</h1>
      </div>
    </Link>
  )
}
