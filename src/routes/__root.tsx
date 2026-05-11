import { i18n } from "@lingui/core";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Trans } from "@lingui/react/macro";
import { safeParse } from "valibot";

import { CommonConversions } from "#/components/common-conversions";
import { FeedbackSection } from "#/components/feedback-section";
import { Footer } from "#/components/footer";
import { WebsiteDescription } from "#/components/website-description";
import { I18nGlobalProvider } from "#/integrations/i18n/i18n-global-provider";
import {
	defaultSearchParams,
	globalSearchParamsSchema,
} from "#/lib/global-params-params";
import appCss from "../styles.css?url";
import { loadDefaultCatalog } from "#/integrations/i18n/load-catalog";

interface MyRouterContext {}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	validateSearch(search) {
		const result = safeParse(globalSearchParamsSchema, search);

		if (!result.success) {
			return defaultSearchParams;
		}

		return result.output;
	},
	beforeLoad() {
		loadDefaultCatalog();
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
				content:
					"Fast, accurate, and easy-to-use unit converter for Length, Temperature, Area, and Volume. Scientific precision with zero rounding errors.",
			},
			{
				name: "keywords",
				content:
					"unit converter, metric conversion, imperial to metric, length converter, temperature converter, area converter, volume converter, scientific calculator",
			},
			// Open Graph
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:title",
				content: "Units Converters | Precision Conversion Tool",
			},
			{
				property: "og:description",
				content:
					"High-precision unit conversion for students and professionals. Convert hundreds of units instantly.",
			},
			{
				property: "og:site_name",
				content: "Units Converters",
			},
			// Twitter
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Units Converters | Precision Conversion Tool",
			},
			{
				name: "twitter:description",
				content:
					"High-precision unit conversion for students and professionals. Convert hundreds of units instantly.",
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
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: React.PropsWithChildren) {
	return (
		<I18nGlobalProvider i18n={i18n}>
			<html lang={i18n.locale}>
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
						<h1 className="p-2">
							<Trans>Units Converters</Trans>
						</h1>
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
		</I18nGlobalProvider>
	);
}
