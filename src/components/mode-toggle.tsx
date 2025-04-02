"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const handleClick = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<button type="button" onClick={handleClick} onKeyDown={handleClick}>
			<span className="sr-only">Toggle mode</span>
			{mounted && theme === "dark" ? <Sun /> : <Moon />}
		</button>
	);
}
