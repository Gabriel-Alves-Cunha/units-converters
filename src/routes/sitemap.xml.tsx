import { createFileRoute } from "@tanstack/react-router";
import { units, QuantitySchema } from "#/lib/units";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
	throw new Error("VITE_BASE_URL is not defined");
}

export const Route = createFileRoute("/sitemap/xml")({
	loader: () => {
		const pages = [
			{ url: "/", lastmod: new Date().toISOString(), priority: "1.0" },
			{
				url: "/privacy-policy",
				lastmod: new Date().toISOString(),
				priority: "0.3",
			},
		];

		// Add common conversion pages or all pages
		// For a sitemap, we should at least include the main category pages
		QuantitySchema.options.forEach((quantity) => {
			const unitNames = Object.keys(units[quantity]);
			// To keep the sitemap reasonable, we'll only add the first unit to itself as a category entry
			// or maybe common ones. But ideally all are indexable.
			// Let's add all units for each quantity (First Unit to All Others)
			const firstUnit = unitNames[0];
			unitNames.forEach((unit) => {
				pages.push({
					url: `/convert/${quantity}/${firstUnit}/to/${unit}?fromValue=1`,
					lastmod: new Date().toISOString(),
					priority: "0.8",
				});
			});
		});

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

		return new Response(sitemap, {
			headers: {
				"Content-Type": "application/xml",
			},
		});
	},
});
