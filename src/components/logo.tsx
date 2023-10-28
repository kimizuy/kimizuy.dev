import Image from "next/image";
import Link from "next/link";
import { NAME, SITE_TITLE } from "../utils/constants";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center gap-2 font-sans text-white"
    >
      <Image
        src="/profile.jpg"
        alt={NAME}
        width={48}
        height={48}
        priority
        className="rounded-full object-contain"
      />
      <span className="text-2xl font-bold">{SITE_TITLE}</span>
    </Link>
  );
}
