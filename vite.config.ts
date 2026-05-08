import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

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
				failOnError: true,
				crawlLinks: true,
				enabled: true,
			},
		}),
		viteReact(),
	],

	build: {
		target: "esnext",
	},
});

export default config;
