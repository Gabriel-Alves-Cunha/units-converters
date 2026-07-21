import { getAllGuideSlugs } from "#/features/guides/data/guide-slugs";
import { locales, type Locales } from "#/integrations/i18n/load-catalog";
import { POPULAR_CONVERSIONS } from "#/lib/popular-conversions";

const QUANTITIES = [
	"Length",
	"Temperature",
	"Area",
	"Volume",
	"Weight",
	"Speed",
	"Time",
] as const;

const STATIC_PATHS = [
	"",
	"/about",
	"/contact",
	"/privacy-policy",
	"/terms-of-service",
	"/disclaimer",
	"/guides",
] as const;

export type SitemapEntry = {
	path: string;
	priority: number;
	changefreq: "daily" | "weekly" | "monthly";
};

function encodeSegment(value: string): string {
	return encodeURIComponent(value);
}

function pathPriority(pathAfterLang: string): {
	priority: number;
	changefreq: SitemapEntry["changefreq"];
} {
	if (pathAfterLang === "") {
		return { priority: 1, changefreq: "daily" };
	}
	if (pathAfterLang.startsWith("/convert/")) {
		return { priority: 0.9, changefreq: "weekly" };
	}
	if (pathAfterLang.startsWith("/category/")) {
		return { priority: 0.8, changefreq: "weekly" };
	}
	if (pathAfterLang.startsWith("/guides/") && pathAfterLang !== "/guides") {
		return { priority: 0.7, changefreq: "monthly" };
	}
	if (pathAfterLang === "/guides") {
		return { priority: 0.8, changefreq: "weekly" };
	}
	return { priority: 0.5, changefreq: "monthly" };
}

/** Locale-relative paths (no leading lang) that should appear in the sitemap. */
export function getSitemapPathSuffixes(): string[] {
	const guidePaths = getAllGuideSlugs().map((slug) => `/guides/${slug}`);
	const categoryPaths = QUANTITIES.map(
		(quantity) => `/category/${encodeSegment(quantity)}`,
	);
	const convertPaths = POPULAR_CONVERSIONS.map(
		({ quantity, from, to }) =>
			`/convert/${encodeSegment(quantity)}/${encodeSegment(from)}/to/${encodeSegment(to)}`,
	);

	return [...STATIC_PATHS, ...guidePaths, ...categoryPaths, ...convertPaths];
}

export function getLocaleKeys(): Locales[] {
	return Object.keys(locales) as Locales[];
}

/** Absolute site paths for every locale × indexable page. */
export function getSitemapEntries(): SitemapEntry[] {
	const localesList = getLocaleKeys();
	const suffixes = getSitemapPathSuffixes();

	return localesList.flatMap((lang) =>
		suffixes.map((suffix) => {
			const { priority, changefreq } = pathPriority(suffix);
			return {
				path: `/${lang}${suffix}`,
				priority,
				changefreq,
			};
		}),
	);
}

/**
 * Explicit prerender allowlist — same URLs as the sitemap, plus sitemap.xml.
 * Keep crawlLinks off so related-unit / language-switcher links cannot enqueue
 * every conversion pair × locale (~12k pages).
 */
export function getPrerenderPages(): Array<{
	path: string;
	prerender: { enabled: true };
}> {
	return [
		...getSitemapEntries().map((entry) => ({
			path: entry.path,
			prerender: { enabled: true as const },
		})),
		{ path: "/sitemap.xml", prerender: { enabled: true as const } },
	];
}

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function formatDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}

/**
 * Build sitemap.xml listing every indexable locale URL.
 * Hreflang alternates are omitted here — they already ship in HTML `<head>`
 * via `/$lang` route head(), which avoids repeating the full language cluster
 * on every entry (~18× bloat).
 */
export function buildSitemapXml(baseUrl: string, lastmod = new Date()): string {
	const host = baseUrl.replace(/\/+$/, "");
	const lastmodDate = formatDate(lastmod);
	const entries = getSitemapEntries();

	const urls = entries.map((entry) => {
		return `  <url>
    <loc>${escapeXml(`${host}${entry.path}`)}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}
