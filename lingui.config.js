import { defineConfig } from "@lingui/cli";

export default defineConfig({
	locales: [
		"pt",
		"en",
		"es",
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
	],
	sourceLocale: "en",
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
});
