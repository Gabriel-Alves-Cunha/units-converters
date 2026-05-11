import { i18n } from "@lingui/core";

// @ts-ignore
import enMessages from "#/locales/en/messages.po";

const locales = {
	pt: "Português",
	en: "English",
} as const;

export type Locales = keyof typeof locales;

export function isLocaleValid(locale: string) {
	// @ts-ignore
	return Boolean(locales[locale]);
}

export const defaultLocale: Locales = "en";

/**
 * Load messages for requested locale and activate it.
 * This function isn't part of the LinguiJS library because there are
 * many ways how to load messages — from REST API, from file, from cache, etc.
 */
export async function loadCatalog(locale: string) {
	const validatedLocale = isLocaleValid(locale) ? locale : defaultLocale;

	try {
		const { messages } = await import(
			`../../locales/${validatedLocale}/messages.po`
		);

		i18n.loadAndActivate({ locale: validatedLocale, messages });
	} catch (error) {
		console.error("Error loading catalog", error);
	}
}

export function loadDefaultCatalog() {
	i18n.loadAndActivate({ locale: "en", messages: enMessages });
}
