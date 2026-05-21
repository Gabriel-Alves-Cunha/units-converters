import { type I18n } from "@lingui/core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { safeParse } from "valibot";

import { loadDefaultCatalog } from "#/integrations/i18n/load-catalog";
import {
	defaultSearchParams,
	globalSearchParamsSchema,
} from "#/lib/global-params-params";
import appCss from "../styles.css?url";

interface MyRouterContext {
	i18n: I18n;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	validateSearch(search) {
		const result = safeParse(globalSearchParamsSchema, search);

		if (!result.success) {
			return defaultSearchParams;
		}

		return result.output;
	},
	beforeLoad(ctx) {
		loadDefaultCatalog(ctx.context.i18n);
	},
	head() {
		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
				},
				{
					title: `Units Converters${import.meta.env.DEV ? " — Dev" : ""}`,
				},
			],
			links: [
				{
					rel: "preload",
					href: "/fonts/InterVariable.woff2",
					as: "font",
					type: "font/woff2",
					crossOrigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: appCss,
					fetchPriority: "high",
				},
				{
					rel: "icon",
					href: "/favicon.ico",
				},
				{
					rel: "manifest",
					href: `data:application/manifest+json,${encodeURIComponent(
						JSON.stringify({
							short_name: "Units Conv",
							name: "Units Converters - Precision Conversion Tool",
							description:
								"High-precision unit converter for Length, Temperature, Area, and Volume.",
							icons: [
								{
									src: "/favicon.ico",
									sizes: "64x64 32x32 24x24 16x16",
									type: "image/x-icon",
								},
							],
							start_url: "/",
							display: "standalone",
							theme_color: "#000000",
							background_color: "#ffffff",
						}),
					)}`,
				},
			],
		};
	},
	shellComponent: RootDocument,
});

function RootDocument({ children }: React.PropsWithChildren) {
	const { i18n } = Route.useRouteContext();

	return (
		<html lang={i18n.locale}>
			<head>
				<HeadContent />

				<script
					dangerouslySetInnerHTML={{
						__html: `if (window.location.pathname === '/') window.location.replace('/en' + window.location.search);`,
					}}
				/>

				{import.meta.env.DEV ? (
					<script
						src="//unpkg.com/react-scan/dist/auto.global.js"
						crossOrigin="anonymous"
					/>
				) : null}

				<script
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4889381718129009"
					crossOrigin="anonymous"
					async
				></script>
			</head>

			<body className="grid grid-rows-[var(--header-height)_1fr] [grid-template-areas:'header'_'main'] grid-cols-1 h-dvh w-dvw overflow-hidden">
				{children}

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>

				<Scripts />
			</body>
		</html>
	);
}
