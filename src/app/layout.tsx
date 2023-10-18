import localFont from "next/font/local";
import { RootLayout } from "../components/root-layout";
import "../styles/globals.css";
import { SITE_DESCRIPTION, SITE_TITLE } from "../utils/constants";

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
  metadataBase: new URL("https://kimizuy.dev"),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.ico" },
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
