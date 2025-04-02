import type { NextConfig } from "next";
import type { Redirect } from "next/dist/lib/load-custom-routes";

const HAS_OLD_HOST: Redirect["has"] = [
	{
		type: "host",
		value: "blog.kimizuy.dev",
	},
];

const nextConfig: NextConfig = {
	reactStrictMode: true,
	serverExternalPackages: ["budoux"],
	async redirects() {
		return [
			{
				source: "/",
				has: HAS_OLD_HOST,
				destination: "https://kimizuy.dev/blog",
				permanent: true,
			},
			{
				source: "/blog",
				has: HAS_OLD_HOST,
				destination: "https://kimizuy.dev/blog",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/posts/:path*",
					has: HAS_OLD_HOST,
					destination: "https://kimizuy.dev/blog/post/:path*",
				},
				{
					source: "/tags/:path*",
					has: HAS_OLD_HOST,
					destination: "https://kimizuy.dev/blog/tag/:path*",
				},
			],
		};
	},
};

export default nextConfig;
