import { LayoutProps } from "../../../../.next/types/app/page";
import { ContentLayout } from "../../../components/ContentLayout";
import { OverlayImage } from "../../../components/OverlayImage";
import { Tocbot } from "../../../libs/tocbot";
import { OverlayImageProvider } from "../../../providers/OverlayImageProvider";

export default function Layout({ children }: LayoutProps) {
  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Tocbot />}>{children}</ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
