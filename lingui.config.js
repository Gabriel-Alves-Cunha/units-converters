import { defineConfig } from "@lingui/cli";

export default defineConfig({
	locales: ["pt", "en", "es"],
	pseudoLocale: "pseudo",
	sourceLocale: "en",
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
});
