import { type I18n } from "@lingui/core";

import { messages as enMessages } from "#/locales/en/messages.ts";

export const locales = {
	pt: "Português",
	en: "English",
	es: "Español",
	fr: "Français",
	de: "Deutsch",
	ja: "日本語",
	zh: "中文",
	"zh-TW": "繁體中文",
	ko: "한국어",
	ru: "Русский",
	it: "Italiano",
	id: "Bahasa Indonesia",
	ar: "العربية",
	pl: "Polski",
	nl: "Nederlands",
	tr: "Türkçe",
	hi: "हिन्दी",
} as const;

export type Locales = keyof typeof locales;

export const rtlLocales = new Set<Locales>(["ar"]);

export function isLocaleValid(locale: string): locale is Locales {
	return Object.hasOwn(locales, locale);
}

export function getLocaleDir(locale: string): "rtl" | "ltr" {
	return isLocaleValid(locale) && rtlLocales.has(locale) ? "rtl" : "ltr";
}

export const defaultLocale: Locales = "en";

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there are
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */
export async function loadCatalog(locale: string, i18n: I18n) {
	if (locale === i18n.locale) {
		return;
	}

	const validatedLocale = isLocaleValid(locale) ? locale : defaultLocale;

	try {
		const { messages } = await import(
			`../../locales/${validatedLocale}/messages.ts`
		);

		i18n.loadAndActivate({ locale: validatedLocale, messages });
	} catch (error) {
		console.error("Error loading catalog", error);
	}
}

export function loadDefaultCatalog(i18n: I18n) {
	// Never clobber an already-active locale (root beforeLoad runs on every
	// navigation and used to briefly flip UI strings back to English).
	if (i18n.locale) {
		return;
	}

	// Messages may already be loaded (e.g. after HMR) without an active locale.
	// @ts-expect-error — private Lingui catalog map
	if (i18n._messages["en"]) {
		i18n.activate("en");
		return;
	}

	i18n.loadAndActivate({ locale: "en", messages: enMessages });
}
