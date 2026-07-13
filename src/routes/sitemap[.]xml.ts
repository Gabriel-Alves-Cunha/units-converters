import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { buildSitemapXml } from "#/lib/sitemap";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
	throw new Error("VITE_BASE_URL is not defined");
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET() {
				const xml = buildSitemapXml(BASE_URL);

				return new Response(xml, {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
