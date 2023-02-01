import { Zen_Kaku_Gothic_New } from "@next/font/google";
import { PropsWithChildren } from "react";
import { RootLayout } from "../components/RootLayout";
import "../styles/globals.css";
import "../styles/reset.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  style: ["normal"],
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
