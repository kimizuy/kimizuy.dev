"use client";

import "./toc.css";
import { useEffect } from "react";
import tocbot from "tocbot";

type Props = { headingSelector?: string };

export function Toc({ headingSelector }: Props) {
	useEffect(() => {
		const offset = 2 * 16;
		tocbot.init({
			tocSelector: ".toc",
			contentSelector: ".toc-content",
			headingSelector: headingSelector ?? "h2, h3, h4",
			orderedList: false,
			scrollSmooth: false,
			// ref: http://tscanlin.github.io/tocbot/#fixed-headers
			headingsOffset: offset,
			scrollSmoothOffset: -1 * offset,
			tocScrollingWrapper: null,
		});

		return () => tocbot.destroy();
	}, [headingSelector]);

	return <div className="toc" />;
}
