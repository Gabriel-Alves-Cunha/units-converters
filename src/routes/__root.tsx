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
				{ rel: "preconnect", href: "https://rsms.me/" },
				{
					href: "https://rsms.me/inter/inter.css",
					rel: "stylesheet",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					href: "/favicon.ico",
				},
				{
					rel: "manifest",
					href: "/manifest.json",
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
