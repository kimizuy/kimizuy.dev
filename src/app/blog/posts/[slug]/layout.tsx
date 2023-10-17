import { ContentLayout } from "../../../../components/ContentLayout";
import { OverlayImage } from "../../../../components/OverlayImage";
import { Tocbot } from "../../../../libs/tocbot";
import { OverlayImageProvider } from "../../../../providers/OverlayImageProvider";

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
