import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import {
	defaultSearchParams,
	globalSearchSchema,
} from "#/lib/global-search-params";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	validateSearch(rawSearch) {
		const parsed = globalSearchSchema.safeParse(rawSearch);

		if (!parsed.success) {
			console.error("Invalid search params", parsed.error);

			return defaultSearchParams;
		}

		return parsed.data;
	},
	head: () => ({
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
			{
				name: "description",
				content: "Website Template",
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
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: React.PropsWithChildren) {
	return (
		<html lang="en-US">
			<head>
				<HeadContent />

				{import.meta.env.DEV ? (
					<script
						src="//unpkg.com/react-scan/dist/auto.global.js"
						crossOrigin="anonymous"
					/>
				) : null}
			</head>

			<body className="flex flex-col h-svh w-svw overflow-hidden">
				<div className="h-(--safe-top) flex-none bg-black w-full"></div>

				{children}

				<div className="h-(--safe-bottom) flex-none w-full bg-notebook"></div>

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>

				<Scripts />
			</body>
		</html>
	);
}
