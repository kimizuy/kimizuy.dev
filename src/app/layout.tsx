import "../styles/global.css";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { CopyRight } from "@/components/copy-right";
import { Logo } from "@/components/logo";
import { LayoutProps } from "../../.next/types/app/layout";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../utils/constants";

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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
  twitter: {
    card: "summary_large_image",
    site: "@kimizuy",
    creator: "@kimizuy",
    title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
    description: SITE_DESCRIPTION,
    images: new URL("/profile.jpg", SITE_URL),
  },
  openGraph: {
    url: SITE_URL,
    type: "article",
    title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
    description: SITE_DESCRIPTION,
    images: new URL("/profile.jpg", SITE_URL),
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ja" className={zenKakuGothicNew.className}>
      <head />
      <body>
        <div className="grid grid-rows-[auto,1fr,auto] grid-cols-[100%] min-h-screen bg-slate-950">
          <header className="grid h-20 px-3">
            <div className="w-full max-w-7xl place-self-center">
              <Logo />
            </div>
          </header>
          <main className="p-4 max-w-6xl w-full mx-auto">{children}</main>
          <footer className="h-20 place-self-center">
            <CopyRight />
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
