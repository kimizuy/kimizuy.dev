import localFont from "@next/font/local";
import { PropsWithChildren } from "react";
import { RootLayout } from "../components/RootLayout";
import "../styles/globals.css";
import "../styles/reset.css";

// Font files can be colocated inside of `app`
const zenKakuGothicNew = localFont({
  src: [
    {
      path: "./fonts/zen-kaku-gothic-new-v7-japanese/zen-kaku-gothic-new-v7-japanese-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/zen-kaku-gothic-new-v7-japanese/zen-kaku-gothic-new-v7-japanese-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Meiryo",
    "sans-serif",
  ],
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={zenKakuGothicNew.className}>
      <head />
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
