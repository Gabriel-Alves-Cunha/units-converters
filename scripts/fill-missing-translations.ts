/**
 * Translate all empty msgstr entries in every non-source locale catalog.
 * Uses Google Translate (unofficial) with placeholder protection.
 *
 * Usage: bun scripts/fill-missing-translations.ts
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SOURCE_LOCALE = "en";

const LOCALES: Record<string, string> = {
	pt: "pt",
	es: "es",
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

const CACHE_PATH = "scripts/translations-missing-fill.json";
const CONCURRENCY = 10;
const MAX_RETRIES = 4;

const PLACEHOLDER_RE =
	/(\{[a-zA-Z0-9_]+\}|<\/?\d+>|&[a-z]+;|Units Converters|Decimal\.js|Ångström|Planck|Voyager Tecnologias LTDA|Google AdSense|SI)/g;

type TranslationMap = Record<string, Record<string, string>>;

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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
			await sleep(400 * (attempt + 1) ** 2);
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

function parseEmptyMsgids(poPath: string): string[] {
	const content = readFileSync(poPath, "utf8");
	const blocks = content.split(/\n(?=msgid |#~ msgid )/);
	const out: string[] = [];

	for (const block of blocks) {
		if (block.startsWith("#~") || !block.startsWith("msgid ")) {
			continue;
		}

		const msgidMatch = block.match(
			/^msgid (?:"(?:\\.|[^"])*"\n?)(?:"(?:\\.|[^"])*"\n?)*/,
		);
		if (!msgidMatch) {
			continue;
		}

		const msgid = [...msgidMatch[0].matchAll(/"((?:\\.|[^"])*)"/g)]
			.map((m) => unescapePoString(m[1]!))
			.join("");

		if (!msgid) {
			continue;
		}

		const msgstrMatch = block.match(
			/^msgstr (?:"(?:\\.|[^"])*"\n?)(?:"(?:\\.|[^"])*"\n?)*/m,
		);
		if (!msgstrMatch) {
			continue;
		}

		const msgstr = [...msgstrMatch[0].matchAll(/"((?:\\.|[^"])*)"/g)]
			.map((m) => unescapePoString(m[1]!))
			.join("");

		if (!msgstr.trim()) {
			out.push(msgid);
		}
	}

	return out;
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

		const msgstrMatch = block.match(
			/^msgstr (?:"(?:\\.|[^"])*"\n?)(?:"(?:\\.|[^"])*"\n?)*/m,
		);
		const currentMsgstr = msgstrMatch
			? [...msgstrMatch[0].matchAll(/"((?:\\.|[^"])*)"/g)]
					.map((m) => unescapePoString(m[1]!))
					.join("")
			: "";

		if (currentMsgstr.trim()) {
			out.push(block);
			continue;
		}

		const translation = map[msgid]?.[locale];
		if (!translation?.trim()) {
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
	console.log(`${locale}: applied ${applied}, still missing ${missing}`);
}

async function main() {
	const referencePo = `src/locales/pt/messages.po`;
	const msgids = [...new Set(parseEmptyMsgids(referencePo))];
	console.log(`Empty msgids to fill: ${msgids.length}`);

	const map: TranslationMap = existsSync(CACHE_PATH)
		? (JSON.parse(readFileSync(CACHE_PATH, "utf8")) as TranslationMap)
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

	console.log(`Translate jobs remaining: ${jobs.length}`);

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
				`fail ${locale}: ${msgid.slice(0, 60)}…`,
				error instanceof Error ? error.message : error,
			);
		}

		if ((done + failed) % 100 === 0) {
			writeFileSync(CACHE_PATH, JSON.stringify(map, null, 2));
			console.log(
				`progress: ${done} ok, ${failed} failed, ${jobs.length - done - failed} left`,
			);
		}
	});

	writeFileSync(CACHE_PATH, JSON.stringify(map, null, 2));
	console.log(`Translate done. ok=${done} failed=${failed}`);

	// High-quality overrides for short UI chrome Google often mistranslates
	const uiFixes: Record<string, Record<string, string>> = {
		Guides: {
			pt: "Guias",
			es: "Guías",
			fr: "Guides",
			de: "Ratgeber",
			ja: "ガイド",
			zh: "指南",
			"zh-TW": "指南",
			ko: "가이드",
			ru: "Руководства",
			it: "Guide",
			id: "Panduan",
			ar: "أدلة",
			pl: "Poradniki",
			nl: "Gidsen",
			tr: "Rehberler",
			hi: "गाइड",
		},
		"Cookie settings": {
			pt: "Configurações de cookies",
			es: "Configuración de cookies",
			fr: "Paramètres des cookies",
			de: "Cookie-Einstellungen",
			ja: "Cookie設定",
			zh: "Cookie 设置",
			"zh-TW": "Cookie 設定",
			ko: "쿠키 설정",
			ru: "Настройки файлов cookie",
			it: "Impostazioni dei cookie",
			id: "Pengaturan cookie",
			ar: "إعدادات ملفات تعريف الارتباط",
			pl: "Ustawienia plików cookie",
			nl: "Cookie-instellingen",
			tr: "Çerez ayarları",
			hi: "कुकी सेटिंग्स",
		},
		"All guides": {
			pt: "Todos os guias",
			es: "Todas las guías",
			fr: "Tous les guides",
			de: "Alle Ratgeber",
			ja: "すべてのガイド",
			zh: "全部指南",
			"zh-TW": "全部指南",
			ko: "모든 가이드",
			ru: "Все руководства",
			it: "Tutte le guide",
			id: "Semua panduan",
			ar: "جميع الأدلة",
			pl: "Wszystkie poradniki",
			nl: "Alle gidsen",
			tr: "Tüm rehberler",
			hi: "सभी गाइड",
		},
		"View all guides": {
			pt: "Ver todos os guias",
			es: "Ver todas las guías",
			fr: "Voir tous les guides",
			de: "Alle Ratgeber anzeigen",
			ja: "すべてのガイドを見る",
			zh: "查看全部指南",
			"zh-TW": "查看全部指南",
			ko: "모든 가이드 보기",
			ru: "Смотреть все руководства",
			it: "Vedi tutte le guide",
			id: "Lihat semua panduan",
			ar: "عرض جميع الأدلة",
			pl: "Zobacz wszystkie poradniki",
			nl: "Bekijk alle gidsen",
			tr: "Tüm rehberleri görüntüle",
			hi: "सभी गाइड देखें",
		},
		"Learn with our guides": {
			pt: "Aprenda com nossos guias",
			es: "Aprende con nuestras guías",
			fr: "Apprenez avec nos guides",
			de: "Lernen Sie mit unseren Ratgebern",
			ja: "ガイドで学ぶ",
			zh: "通过我们的指南学习",
			"zh-TW": "透過我們的指南學習",
			ko: "가이드로 배우기",
			ru: "Учитесь с нашими руководствами",
			it: "Impara con le nostre guide",
			id: "Belajar dengan panduan kami",
			ar: "تعلّم من خلال أدلتنا",
			pl: "Ucz się z naszych poradników",
			nl: "Leer met onze gidsen",
			tr: "Rehberlerimizle öğrenin",
			hi: "हमारी गाइड से सीखें",
		},
		"Unit Conversion Guides": {
			pt: "Guias de conversão de unidades",
			es: "Guías de conversión de unidades",
			fr: "Guides de conversion d'unités",
			de: "Ratgeber zur Einheitenumrechnung",
			ja: "単位換算ガイド",
			zh: "单位换算指南",
			"zh-TW": "單位換算指南",
			ko: "단위 변환 가이드",
			ru: "Руководства по переводу единиц",
			it: "Guide alla conversione delle unità",
			id: "Panduan konversi satuan",
			ar: "أدلة تحويل الوحدات",
			pl: "Poradniki przeliczania jednostek",
			nl: "Gidsen voor eenhedenconversie",
			tr: "Birim dönüştürme rehberleri",
			hi: "इकाई रूपांतरण गाइड",
		},
		"Related converters": {
			pt: "Conversores relacionados",
			es: "Convertidores relacionados",
			fr: "Convertisseurs associés",
			de: "Verwandte Umrechner",
			ja: "関連コンバーター",
			zh: "相关换算器",
			"zh-TW": "相關換算器",
			ko: "관련 변환기",
			ru: "Связанные конвертеры",
			it: "Convertitori correlati",
			id: "Konverter terkait",
			ar: "محولات ذات صلة",
			pl: "Powiązane konwertery",
			nl: "Gerelateerde omrekenaars",
			tr: "İlgili dönüştürücüler",
			hi: "संबंधित कन्वर्टर",
		},
		"Frequently asked questions": {
			pt: "Perguntas frequentes",
			es: "Preguntas frecuentes",
			fr: "Questions fréquentes",
			de: "Häufig gestellte Fragen",
			ja: "よくある質問",
			zh: "常见问题",
			"zh-TW": "常見問題",
			ko: "자주 묻는 질문",
			ru: "Часто задаваемые вопросы",
			it: "Domande frequenti",
			id: "Pertanyaan yang sering diajukan",
			ar: "الأسئلة الشائعة",
			pl: "Często zadawane pytania",
			nl: "Veelgestelde vragen",
			tr: "Sıkça sorulan sorular",
			hi: "अक्सर पूछे जाने वाले प्रश्न",
		},
		"Worked example": {
			pt: "Exemplo prático",
			es: "Ejemplo práctico",
			fr: "Exemple pratique",
			de: "Ausgearbeitetes Beispiel",
			ja: "計算例",
			zh: "演算示例",
			"zh-TW": "演算範例",
			ko: "풀이 예시",
			ru: "Разбор примера",
			it: "Esempio risolto",
			id: "Contoh pengerjaan",
			ar: "مثال محلول",
			pl: "Przykład krok po kroku",
			nl: "Uitgewerkt voorbeeld",
			tr: "Çalışılmış örnek",
			hi: "हल किया गया उदाहरण",
		},
		"Guide not found": {
			pt: "Guia não encontrado",
			es: "Guía no encontrada",
			fr: "Guide introuvable",
			de: "Ratgeber nicht gefunden",
			ja: "ガイドが見つかりません",
			zh: "未找到指南",
			"zh-TW": "找不到指南",
			ko: "가이드를 찾을 수 없습니다",
			ru: "Руководство не найдено",
			it: "Guida non trovata",
			id: "Panduan tidak ditemukan",
			ar: "الدليل غير موجود",
			pl: "Nie znaleziono poradnika",
			nl: "Gids niet gevonden",
			tr: "Rehber bulunamadı",
			hi: "गाइड नहीं मिली",
		},
		"Browse all guides": {
			pt: "Ver todos os guias",
			es: "Explorar todas las guías",
			fr: "Parcourir tous les guides",
			de: "Alle Ratgeber durchsuchen",
			ja: "すべてのガイドを見る",
			zh: "浏览全部指南",
			"zh-TW": "瀏覽全部指南",
			ko: "모든 가이드 둘러보기",
			ru: "Смотреть все руководства",
			it: "Sfoglia tutte le guide",
			id: "Jelajahi semua panduan",
			ar: "تصفح جميع الأدلة",
			pl: "Przeglądaj wszystkie poradniki",
			nl: "Bekijk alle gidsen",
			tr: "Tüm rehberlere göz at",
			hi: "सभी गाइड देखें",
		},
		"Category not found": {
			pt: "Categoria não encontrada",
			es: "Categoría no encontrada",
			fr: "Catégorie introuvable",
			de: "Kategorie nicht gefunden",
			ja: "カテゴリが見つかりません",
			zh: "未找到分类",
			"zh-TW": "找不到分類",
			ko: "카테고리를 찾을 수 없습니다",
			ru: "Категория не найдена",
			it: "Categoria non trovata",
			id: "Kategori tidak ditemukan",
			ar: "الفئة غير موجودة",
			pl: "Nie znaleziono kategorii",
			nl: "Categorie niet gevonden",
			tr: "Kategori bulunamadı",
			hi: "श्रेणी नहीं मिली",
		},
		"Privacy Policy | Units Converters": {
			pt: "Política de Privacidade | Units Converters",
			es: "Política de privacidad | Units Converters",
			fr: "Politique de confidentialité | Units Converters",
			de: "Datenschutzrichtlinie | Units Converters",
			ja: "プライバシーポリシー | Units Converters",
			zh: "隐私政策 | Units Converters",
			"zh-TW": "隱私權政策 | Units Converters",
			ko: "개인정보 처리방침 | Units Converters",
			ru: "Политика конфиденциальности | Units Converters",
			it: "Informativa sulla privacy | Units Converters",
			id: "Kebijakan Privasi | Units Converters",
			ar: "سياسة الخصوصية | Units Converters",
			pl: "Polityka prywatności | Units Converters",
			nl: "Privacybeleid | Units Converters",
			tr: "Gizlilik Politikası | Units Converters",
			hi: "गोपनीयता नीति | Units Converters",
		},
	};

	for (const [msgid, locales] of Object.entries(uiFixes)) {
		map[msgid] = { ...map[msgid], ...locales };
	}
	writeFileSync(CACHE_PATH, JSON.stringify(map, null, 2));

	for (const locale of localeKeys) {
		if (locale === SOURCE_LOCALE) {
			continue;
		}
		applyLocale(`src/locales/${locale}/messages.po`, locale, map);
	}
}

await main();
