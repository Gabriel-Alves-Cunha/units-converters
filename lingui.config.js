import { defineConfig } from "@lingui/cli";

export default defineConfig({
	locales: ["pt", "en", "es"],
	sourceLocale: "en",
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["src"],
		},
	],
});
