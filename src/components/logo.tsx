import Image from "next/image";
import Link from "next/link";
import { NAME, SITE_TITLE } from "../utils/constants";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center gap-2 font-sans text-lg text-white sm:text-xl"
    >
      <div className="relative h-[2em] w-[2em]">
        <Image
          src="/profile.jpg"
          alt={NAME}
          fill
          priority
          className="rounded-full object-contain"
        />
      </div>
      <span className="font-bold">{SITE_TITLE}</span>
    </Link>
  );
}
