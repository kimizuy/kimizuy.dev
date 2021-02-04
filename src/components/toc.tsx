import { useEffect } from 'react'
import tocbot from 'tocbot'

export const Toc: React.VFC = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post',
      headingSelector: 'h1, h2, h3',
    })
  }, [])

  return <div className="toc" />
}
