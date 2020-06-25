import { ThemeProvider } from "styled-components"

export default function ({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const theme = {
  colors: {
    background: "#0d1219",
    base100: "#f9fafa",
    base90: "#dde0e2",
    base80: "#c2c6ca",
    base70: "#a7adb2",
    base60: "#8d9492",
    base50: "#747c85",
    base40: "#5c6570",
    base30: "#444f5b",
    base20: "#2e3a48",
    base10: "#1a2634",
    base0: "#0d1219",
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
}
