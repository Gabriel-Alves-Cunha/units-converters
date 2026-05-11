import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { lingui } from "@lingui/vite-plugin";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		tailwindcss(),
		cloudflare({
			viteEnvironment: {
				name: "ssr",
			},
		}),
		tanstackStart({
			importProtection: {
				behavior: "error",
				enabled: true,
				log: "always",
			},
			prerender: {
				autoStaticPathsDiscovery: true,
				failOnError: true,
				crawlLinks: true,
				enabled: true,
			},
		}),
		react({
			plugins: [["@lingui/swc-plugin", {}]],
		}),
		lingui(),
	],

	build: {
		target: "esnext",
	},
});

export default config;
