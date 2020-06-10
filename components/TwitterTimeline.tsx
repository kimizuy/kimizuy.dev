import { useEffect } from "react"

type Props = {
  account: string
  showReplies?: boolean
  noHeader?: boolean
  noFooter?: boolean
  noBorders?: boolean
  transparent?: boolean
  noScrollbar?: boolean
  theme?: "dark" | "light"
  width?: string
  height?: string
  tweetLimit?: number
  borderColor?: string
  ariaPolite?: "polite" | "assertive" | "rude"
  dnt?: boolean
}

const TwitterTimelineComponent = (p: Props) => {
  const chrome = [
    p.noHeader && "noheader",
    p.noFooter && "nofooter",
    p.noBorders && "noborders",
    p.transparent && "transparent",
    p.noScrollbar && "noscrollbar",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <a
      className="twitter-timeline"
      href={`https://twitter.com/${p.account}`}
      data-show-replies={p.showReplies}
      data-chrome={chrome}
      data-theme={p.theme}
      data-width={p.width}
      data-height={p.height}
      data-tweet-limit={`${p.tweetLimit}`}
      data-border-color={p.borderColor}
      data-aria-polite={p.ariaPolite}
      data-dnt={p.dnt}
    />
  )
}

export default function () {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    script.charset = "utf-8"
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  return (
    <section className="twitter-embed">
      <TwitterTimelineComponent account="kimizuy" />
    </section>
  )
}
