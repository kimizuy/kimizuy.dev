"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Context = {
  src?: string;
  setSrc: (value?: string) => void;
};

const OverlayImageContext = createContext<Context>({
  src: undefined,
  setSrc: () => void 0,
});

export const useOverlayImage = (): Context => useContext(OverlayImageContext);

export const OverlayImageProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [src, setSrcState] = useState<string | undefined>(undefined);
  const [overlayImageLocation, setOverlayImageLocation] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (overlayImageLocation !== pathname) {
      setSrcState(undefined);
      disableScrollLock(0);
    }
  }, [overlayImageLocation, pathname]);

  const setSrc = (value?: string) => {
    if (value && pathname !== null) {
      const scrollPosition = window.scrollY;
      setSrcState(value);
      setOverlayImageLocation(pathname);
      setScrollPosition(scrollPosition);
      enableScrollLock();
    } else {
      setSrcState(undefined);
      disableScrollLock(scrollPosition);
    }
  };

  return (
    <OverlayImageContext.Provider value={{ src, setSrc }}>
      {children}
    </OverlayImageContext.Provider>
  );
};

// ref: https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/
const enableScrollLock = () => {
  document.body.style.overflow = "hidden";
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
};

const disableScrollLock = (scrollPosition: number) => {
  document.body.style.overflow = "";
  document.body.style.top = "";
  document.body.style.position = "";
  document.body.style.width = "";
  window.scroll(0, scrollPosition);
};
