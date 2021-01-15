export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

type GaEventProps = {
  action: string
  category: string
  label: string
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: GaEventProps): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
