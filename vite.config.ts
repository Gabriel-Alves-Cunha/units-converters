import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { lingui } from "@lingui/vite-plugin";

const config = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");
	const baseUrl = env.VITE_BASE_URL;

	if (!baseUrl) {
		throw new Error("VITE_BASE_URL is not defined");
	}

	return {
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
					filter: ({ path }) => path !== "/",
				},
				sitemap: {
					host: baseUrl,
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
	};
});

export default config;
