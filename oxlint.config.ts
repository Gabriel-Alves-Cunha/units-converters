import { defineConfig } from "oxlint";

export default defineConfig({
	ignorePatterns: [
		"**/dist/**",
		"**/build/**",
		"**/node_modules/**",
		".history/**",
	],
	plugins: [
		"eslint",
		"typescript",
		"unicorn",
		"react",
		"react-perf",
		"oxc",
		"promise",
		"import",
	],
});
