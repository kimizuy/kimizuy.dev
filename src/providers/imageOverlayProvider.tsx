import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

type ImageOverlayContext = {
  src: string
  updateSrc: (value: string) => void
}

const imageOverlayContext = createContext<ImageOverlayContext>(
  {} as ImageOverlayContext
)
export const useImageOverlay = (): ImageOverlayContext =>
  useContext(imageOverlayContext)

export const ImageOverlayProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const [src, setSrc] = useState('')
  const [imageOverlayLocation, setImageOverlayLocation] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (imageOverlayLocation !== router.pathname) {
      setSrc('')
      disableScrollLock(0)
    }
  })

  const updateSrc = (value: string) => {
    if (value) {
      setSrc(value)
      setImageOverlayLocation(router.pathname)
      setScrollPosition(window.scrollY)
      enableScrollLock()
    } else {
      setSrc('')
      disableScrollLock(scrollPosition)
    }
  }

  return (
    <imageOverlayContext.Provider value={{ src, updateSrc }}>
      {children}
    </imageOverlayContext.Provider>
  )
}

//https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/
const enableScrollLock = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
}

const disableScrollLock = (scrollPosition: number) => {
  document.body.style.overflow = null
  document.body.style.top = null
  document.body.style.position = null
  document.body.style.width = null
  window.scroll(0, scrollPosition)
}
