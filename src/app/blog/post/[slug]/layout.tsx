import { LayoutProps } from "../../../../../.next/types/app/blog/post/[slug]/layout";
import { ContentLayout } from "../../../../components/content-layout";
import { OverlayImage } from "../../../../components/overlay-image";
import { Tocbot } from "../../../../libs/tocbot";
import { OverlayImageProvider } from "../../../../providers/overlay-image-provider";

export default function Layout({ children }: LayoutProps) {
  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Tocbot />}>{children}</ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
