import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { safeParse } from "valibot";

import { FeedbackSection } from "#/components/feedback-section";
import { WebsiteDescription } from "#/components/website-description";
import {
	defaultSearchParams,
	globalSearchParamsSchema,
} from "#/lib/global-params-params";
import appCss from "../styles.css?url";
import { CommonConversions } from "#/components/common-conversions";
import { Footer } from "#/components/footer";

interface MyRouterContext {}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	validateSearch(search) {
		const result = safeParse(globalSearchParamsSchema, search);

		if (!result.success) {
			return defaultSearchParams;
		}

		return result.output;
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

			<body className="flex flex-col h-svh w-svw simple-scrollbar scrollbar-stable">
				<div className="h-(--safe-top) flex-none bg-black w-full"></div>

				<header className="bg-accent text-accent-foreground h-16 flex text-center items-center justify-center">
					<h1 className="p-2">Units Converter</h1>
				</header>

				<div className="w-full h-svh grid converter-grid gap-16">
					{children}

					<hr className="converter-content" />

					<CommonConversions />

					<hr className="converter-content" />

					<WebsiteDescription />

					<hr className="converter-content" />

					<FeedbackSection />

					<Footer />
				</div>

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
					]}
				/>

				<Scripts />
			</body>
		</html>
	);
}
