import { PropsWithChildren } from "react";
import { ContentLayout } from "../../../components/ContentLayout";
import { OverlayImage } from "../../../components/OverlayImage";
import { Tocbot } from "../../../libs/tocbot";
import { OverlayImageProvider } from "../../../providers/OverlayImageProvider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Tocbot />}>{children}</ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
