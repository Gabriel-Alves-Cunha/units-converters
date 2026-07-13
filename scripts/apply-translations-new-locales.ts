import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

type TranslationMap = Record<string, Record<string, string>>;

const NEW_LOCALES = [
	"fr",
	"de",
	"ja",
	"zh",
	"zh-TW",
	"ko",
	"ru",
	"it",
	"id",
	"ar",
	"pl",
	"nl",
	"tr",
	"hi",
] as const;

function unescapePoString(raw: string): string {
	return raw
		.replace(/\\n/g, "\n")
		.replace(/\\t/g, "\t")
		.replace(/\\"/g, '"')
		.replace(/\\\\/g, "\\");
}

function escapePoString(value: string): string {
	return value
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\t/g, "\\t")
		.replace(/\n/g, "\\n");
}

function loadTranslationMaps(): TranslationMap {
	const scriptsDir = "scripts";
	const map: TranslationMap = {};

	for (const file of readdirSync(scriptsDir)) {
		if (!file.startsWith("translations-") || !file.endsWith(".json")) {
			continue;
		}
		if (file === "translations-es-pt.json") {
			continue;
		}

		const chunk = JSON.parse(
			readFileSync(join(scriptsDir, file), "utf8"),
		) as TranslationMap;

		for (const [msgid, locales] of Object.entries(chunk)) {
			map[msgid] = { ...map[msgid], ...locales };
		}
	}

	return map;
}

function applyLocale(poPath: string, locale: string, map: TranslationMap) {
	const content = readFileSync(poPath, "utf8");
	const blocks = content.split(/\n(?=msgid |#~ msgid )/);
	const out: string[] = [];
	let applied = 0;
	let missing = 0;

	for (const block of blocks) {
		if (block.startsWith("#~") || !block.startsWith("msgid ")) {
			out.push(block);
			continue;
		}

		const msgidLines = block.match(
			/^msgid (?:"(?:\\.|[^"])*"\n?)(?:"(?:\\.|[^"])*"\n?)*/,
		);
		if (!msgidLines) {
			out.push(block);
			continue;
		}

		const msgid = [...msgidLines[0].matchAll(/"((?:\\.|[^"])*)"/g)]
			.map((m) => unescapePoString(m[1]!))
			.join("");

		if (msgid === "") {
			out.push(block);
			continue;
		}

		const translation = map[msgid]?.[locale];
		if (!translation) {
			missing += 1;
			out.push(block);
			continue;
		}

		const escaped = escapePoString(translation);
		const msgstr =
			escaped.includes("\\n") || translation.length > 70
				? `msgstr ""\n"${escaped}"`
				: `msgstr "${escaped}"`;

		const replaced = block.replace(
			/^msgstr (?:"(?:\\.|[^"])*"\n?)(?:"(?:\\.|[^"])*"\n?)*/m,
			`${msgstr}\n`,
		);
		out.push(replaced);
		applied += 1;
	}

	writeFileSync(poPath, out.join("\n").replace(/\n+$/, "\n"));
	console.log(`${locale}: applied ${applied}, missing ${missing}`);
}

const map = loadTranslationMaps();
console.log(`Loaded translations for ${Object.keys(map).length} msgids`);

for (const locale of NEW_LOCALES) {
	applyLocale(`src/locales/${locale}/messages.po`, locale, map);
}
