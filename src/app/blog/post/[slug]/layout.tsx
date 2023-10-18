import { ContentLayout } from "../../../../components/content-layout";
import { OverlayImage } from "../../../../components/overlay-image";
import { Tocbot } from "../../../../libs/tocbot";
import { OverlayImageProvider } from "../../../../providers/overlay-image-provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <OverlayImageProvider>
      <ContentLayout sideBarItem={<Tocbot />}>{children}</ContentLayout>
      <OverlayImage />
    </OverlayImageProvider>
  );
}
