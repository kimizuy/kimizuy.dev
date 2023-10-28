import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
