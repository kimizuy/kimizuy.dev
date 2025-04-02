"use client"; // Error components must be Client Components

import { useEffect } from "react";

type Props = {
	error: Error & { digest?: string };
};

export default function ErrorComponent({ error }: Props) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
		</div>
	);
}
