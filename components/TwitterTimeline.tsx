import { useEffect } from "react"

export default function () {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    // document.body.appendChild(script)
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  return (
    <section>
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders"
          href="https://twitter.com/kimizuy"
          data-height="150"
          data-width="100"
        >
          Tweets by kimizuy
        </a>
      </div>
    </section>
  )
}
