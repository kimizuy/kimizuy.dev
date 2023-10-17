import localFont from "next/font/local";
import { RootLayout } from "../components/RootLayout";
import "../styles/global.css";
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
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    url: SITE_URL,
    type: "article",
    title: { default: SITE_TITLE, template: `%s | ${SITE_TITLE}` },
    description: SITE_DESCRIPTION,
    images: new URL("/profile.jpg", SITE_URL),
  },
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html lang="ja" className={zenKakuGothicNew.className}>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
