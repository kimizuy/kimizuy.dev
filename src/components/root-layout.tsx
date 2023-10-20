import { PropsWithChildren } from "react";
import { CopyRight } from "./copy-right";
import { Logo } from "./logo";

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] grid-cols-[100%] min-h-screen bg-slate-950">
      <header className="grid h-20 px-3">
        <div className="w-full max-w-7xl place-self-center">
          <Logo />
        </div>
      </header>
      <main className="p-4 max-w-6xl w-full mx-auto">{children}</main>
      <footer className="h-20 place-self-center">
        <CopyRight />
      </footer>
    </div>
  );
}
