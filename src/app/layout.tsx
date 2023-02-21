import localFont from "@next/font/local";
import { PropsWithChildren } from "react";
import { RootLayout } from "../components/RootLayout";
import "../styles/global.css";

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
