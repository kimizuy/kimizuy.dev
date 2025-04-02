"use client";

import Image from "next/image";
import { useOverlayImage } from "./overlay-image-provider";

export function OverlayImage() {
	const { src, setSrc } = useOverlayImage();

	if (!src) return null;

	return (
		<div
			className="relative z-[999]"
			onClick={() => setSrc(undefined)}
			onKeyDown={() => setSrc(undefined)}
		>
			<div
				className="fixed left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[hsl(0deg_0%_8%/66.7%)]"
				onClick={() => setSrc(undefined)}
				onKeyDown={() => setSrc(undefined)}
			>
				<Image src={src} alt="" fill className="object-contain" />
			</div>
		</div>
	);
}
