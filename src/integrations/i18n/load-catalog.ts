import { type I18n } from "@lingui/core";

import { messages as enMessages } from "#/locales/en/messages.ts";

export const locales = {
	pseudo: "Pseudo",
	pt: "Português",
	en: "English",
	es: "Español",
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
export async function loadCatalog(locale: string, i18n: I18n) {
	if (locale === i18n.locale) {
		return;
	}

	if (locale === "pseudo") {
		i18n.load("pseudo", {}); // Load empty messages
		i18n.activate("pseudo");

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
	// Don't load default catalog if it's already loaded
	// @ts-ignore
	if (i18n._messages["en"]) {
		return;
	}

	i18n.loadAndActivate({ locale: "en", messages: enMessages });
}
