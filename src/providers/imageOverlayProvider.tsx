import { useState, createContext, useContext } from 'react'

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
  const [src, setSrc] = useState('')
  const updateSrc = (value: string) => {
    if (value) {
      setSrc(value)
      document.body.style.overflow = 'hidden'
    } else {
      setSrc('')
      document.body.style.overflow = null
    }
  }

  return (
    <imageOverlayContext.Provider value={{ src, updateSrc }}>
      {children}
    </imageOverlayContext.Provider>
  )
}
