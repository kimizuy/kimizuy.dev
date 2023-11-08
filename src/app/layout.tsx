import "../styles/global.css";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import Link from "next/link";
import { CopyRight } from "@/components/copy-right";
import { Logo } from "@/components/logo";
import { type LayoutProps } from "../../.next/types/app/page";
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
    card: "summary",
    site: "@kimizuy",
    creator: "@kimizuy",
    title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
    description: SITE_DESCRIPTION,
    images: "/profile.jpg",
  },
  openGraph: {
    url: SITE_URL,
    type: "article",
    title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
    description: SITE_DESCRIPTION,
    images: "/profile.jpg",
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html className={zenKakuGothicNew.className}>
      <body>
        <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto,1fr,auto] bg-slate-950">
          <header className="sticky top-0 z-10 grid h-14 bg-inherit px-4 sm:h-16 sm:px-8">
            <div className="flex w-full max-w-6xl justify-between place-self-center">
              <Logo />
              <nav className="flex items-center justify-between gap-2 sm:gap-4">
                <Link href="/blog">Blog</Link>
                <Link href="/resume">Resume</Link>
              </nav>
            </div>
          </header>
          <main className="p-[2rem_1rem_8rem] sm:p-[3rem_1.5rem_10rem]">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
          <footer className="h-20 place-self-center">
            <CopyRight />
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
