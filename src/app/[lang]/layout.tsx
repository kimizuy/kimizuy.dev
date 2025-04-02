import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { Link } from "@/components/link";
import { Navigation } from "@/components/navigation";
import { OverlayImage } from "@/components/overlay-image";
import { OverlayImageProvider } from "@/components/overlay-image-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_TITLE, SITE_URL } from "@/utils/constants";
import { getDictionary } from "@/utils/get-dictionary";
import { cn } from "@/utils/helpers";
import { type Locale } from "@/utils/i18n-config";
import { i18nConfig } from "@/utils/i18n-config";
import IconPic from "../icon.jpg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const zenKakuGothicNew = localFont({
  src: [
    {
      path: "../fonts/zen-kaku-gothic-new-v7-japanese/zen-kaku-gothic-new-v7-japanese-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/zen-kaku-gothic-new-v7-japanese/zen-kaku-gothic-new-v7-japanese-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zenKakuGothicNew",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: { lang: Locale };
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}

export function generateMetadata({ params }: Props) {
  const dictionaly = getDictionary(params.lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_TITLE}`,
      default: SITE_TITLE,
    },
    description: dictionaly.siteDescription,
  };
}

export type PageProps = Omit<Props, "children">;

export default function RootLayout({ children, params }: Props) {
  const dictionary = getDictionary(params.lang);

  return (
    <html
      lang={params.lang}
      className={cn(
        inter.variable,
        zenKakuGothicNew.variable,
        "scroll-p-20 antialiased",
      )}
    >
      <body>
        <ThemeProvider>
          <OverlayImageProvider>
            <div className="grid min-h-screen grid-cols-[100%] grid-rows-[auto,1fr,auto]">
              <header className="sticky top-0 z-10 grid h-16 place-items-center border-b bg-background px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center gap-1 text-xl font-bold text-foreground"
                  >
                    <span className="relative h-[1.8em] w-[1.8em]">
                      <Image
                        src={IconPic}
                        alt=""
                        sizes="38px"
                        fill
                        priority
                        className="rounded-full object-contain"
                      />
                      <span className="sr-only">{dictionary.home}</span>
                    </span>
                    {SITE_TITLE}
                  </Link>
                  <Navigation lang={params.lang} />
                </div>
              </header>
              <main className="relative p-[2rem_1rem_8rem] md:p-[3rem_2rem_12rem]">
                <div className="mx-auto max-w-4xl">{children}</div>
              </main>
              <footer className="grid h-16 place-items-center border-t px-4 md:px-8">
                <div className="mx-auto grid w-full max-w-6xl items-center">
                  <div className="place-self-center">
                    © 2023{" "}
                    <a
                      href="https://github.com/kimizuy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kimizu Yamasaki
                    </a>
                  </div>
                </div>
              </footer>
            </div>
            <OverlayImage />
          </OverlayImageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
