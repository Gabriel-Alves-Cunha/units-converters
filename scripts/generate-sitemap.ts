import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { buildSitemapXml, getSitemapEntries } from "#/lib/sitemap";

/**
 * Static `public/sitemap.xml` is what crawlers fetch in production
 * (`robots.txt` → https://units-converters.com/sitemap.xml).
 * Override with SITEMAP_BASE_URL when needed.
 */
const baseUrl = process.env.SITEMAP_BASE_URL ?? "https://units-converters.com";

const entries = getSitemapEntries();
const xml = buildSitemapXml(baseUrl);
const outPath = resolve("public/sitemap.xml");

writeFileSync(outPath, xml, "utf8");

console.log(
	`Wrote ${outPath} (${entries.length} URLs, ${xml.length} bytes) for ${baseUrl}`,
);
