/**
 * Generate translations for new locales via Google Translate (unofficial free endpoint).
 * Protects Lingui placeholders and brand tokens. Supports resume + concurrency.
 *
 * Usage: bun scripts/generate-translations.ts
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const LOCALES: Record<string, string> = {
	fr: "fr",
	de: "de",
	ja: "ja",
	zh: "zh-CN",
	"zh-TW": "zh-TW",
	ko: "ko",
	ru: "ru",
	it: "it",
	id: "id",
	ar: "ar",
	pl: "pl",
	nl: "nl",
	tr: "tr",
	hi: "hi",
};

const OUTPUT = "scripts/translations-all-new.json";
const MSGIDS_PATH = "scripts/msgids.json";
const CONCURRENCY = 8;
const MAX_RETRIES = 4;

const PLACEHOLDER_RE =
	/(\{[a-zA-Z0-9_]+\}|<\/?\d+>|&[a-z]+;|Units Converters|Decimal\.js|Ångström|Planck)/g;

type TranslationMap = Record<string, Record<string, string>>;

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function protect(text: string): { protectedText: string; tokens: string[] } {
	const tokens: string[] = [];
	const protectedText = text.replace(PLACEHOLDER_RE, (match) => {
		const index = tokens.length;
		tokens.push(match);
		return `⟦${index}⟧`;
	});
	return { protectedText, tokens };
}

function restore(text: string, tokens: string[]): string {
	return text.replace(/⟦(\d+)⟧/g, (_m, index) => tokens[Number(index)] ?? _m);
}

async function translateOnce(text: string, target: string): Promise<string> {
	const url = new URL("https://translate.googleapis.com/translate_a/single");
	url.searchParams.set("client", "gtx");
	url.searchParams.set("sl", "en");
	url.searchParams.set("tl", target);
	url.searchParams.set("dt", "t");
	url.searchParams.set("q", text);

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status} for ${target}`);
	}

	const data = (await response.json()) as unknown;
	if (!Array.isArray(data) || !Array.isArray(data[0])) {
		throw new Error(`Unexpected response for ${target}`);
	}

	return (data[0] as Array<[string] | null>)
		.filter(
			(part): part is [string] =>
				Array.isArray(part) && typeof part[0] === "string",
		)
		.map((part) => part[0])
		.join("");
}

async function translatePreserving(
	text: string,
	target: string,
): Promise<string> {
	const { protectedText, tokens } = protect(text);

	let lastError: unknown;
	for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
		try {
			const translated = await translateOnce(protectedText, target);
			return restore(translated, tokens);
		} catch (error) {
			lastError = error;
			await sleep(300 * (attempt + 1) ** 2);
		}
	}

	throw lastError;
}

async function mapPool<T, R>(
	items: T[],
	concurrency: number,
	worker: (item: T) => Promise<R>,
): Promise<R[]> {
	const results: R[] = Array.from({ length: items.length });
	let nextIndex = 0;

	async function runWorker() {
		while (true) {
			const index = nextIndex;
			nextIndex += 1;
			if (index >= items.length) {
				return;
			}
			results[index] = await worker(items[index]!);
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(concurrency, items.length) }, () =>
			runWorker(),
		),
	);
	return results;
}

async function main() {
	const msgids = JSON.parse(readFileSync(MSGIDS_PATH, "utf8")) as string[];
	const map: TranslationMap = existsSync(OUTPUT)
		? (JSON.parse(readFileSync(OUTPUT, "utf8")) as TranslationMap)
		: {};

	const localeKeys = Object.keys(LOCALES);
	const jobs: Array<{ msgid: string; locale: string }> = [];

	for (const msgid of msgids) {
		map[msgid] ??= {};
		for (const locale of localeKeys) {
			if (!map[msgid]![locale]?.trim()) {
				jobs.push({ msgid, locale });
			}
		}
	}

	console.log(`Jobs remaining: ${jobs.length}`);

	let done = 0;
	let failed = 0;

	await mapPool(jobs, CONCURRENCY, async ({ msgid, locale }) => {
		const target = LOCALES[locale]!;
		try {
			const translated = await translatePreserving(msgid, target);
			map[msgid]![locale] = translated;
			done += 1;
		} catch (error) {
			failed += 1;
			console.error(
				`fail ${locale}: ${msgid.slice(0, 50)}…`,
				error instanceof Error ? error.message : error,
			);
		}

		if ((done + failed) % 50 === 0) {
			writeFileSync(OUTPUT, JSON.stringify(map, null, 2));
			console.log(
				`progress: ${done} ok, ${failed} failed, ${jobs.length - done - failed} left`,
			);
		}
	});

	writeFileSync(OUTPUT, JSON.stringify(map, null, 2));

	let complete = 0;
	for (const msgid of msgids) {
		const entry = map[msgid] ?? {};
		if (localeKeys.every((locale) => entry[locale]?.trim())) {
			complete += 1;
		}
	}

	console.log(
		`Done. translated=${done} failed=${failed} completeMsgids=${complete}/${msgids.length}`,
	);
}

await main();
