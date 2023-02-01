import { PropsWithChildren } from "react";
import { RootLayout } from "../components/RootLayout";
import "../styles/globals.css";
import "../styles/reset.css";

// FIXME: @next/fonts/google not working
// const zenKakuGothicNew = Zen_Kaku_Gothic_New({
//   weight: ["400", "700"],
//   style: ["normal"],
//   subsets: ["latin"],
// fallback: [
//   "Hiragino Kaku Gothic ProN",
//   "Hiragino Sans",
//   "Meiryo",
//   "sans-serif",
// ],
// });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <head />
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
