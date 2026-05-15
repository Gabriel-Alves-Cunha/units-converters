import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { msg } from "@lingui/core/macro";

import { CommonConversions } from "#/components/common-conversions";
import { FeedbackSection } from "#/components/feedback-section";
import { Footer } from "#/components/footer";
import { WebsiteDescription } from "#/components/website-description";
import {
	defaultLocale,
	isLocaleValid,
	loadCatalog,
	loadDefaultCatalog,
	locales,
} from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
	throw new Error("VITE_BASE_URL is not defined");
}

const localeKeys = Object.keys(locales);

export const Route = createFileRoute("/$lang")({
	// Pre-load the catalog before the route is even rendered
	async beforeLoad({ params, search, context: { i18n } }) {
		const { lang } = params;

		if (!isLocaleValid(lang)) {
			throw redirect({
				search: { ...defaultSearchParams, ...search },
				params: { ...params, lang: defaultLocale },
				to: "/$lang",
			});
		}

		// Load the catalog
		await loadCatalog(lang, i18n);
	},
	async head(ctx) {
		// 1. Get the language from params (since /$lang is a parent)
		const lang = ctx.match.params.lang || "en";

		// 2. SAFETY CHECK: If Lingui hasn't activated yet, force it.
		// This prevents the "No locale set" error during hydration.
		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const { pathname } = ctx.match;

		// Extract the part of the path AFTER the language (e.g., /en/length -> length)
		const pathSegments = pathname.split("/").filter(Boolean);
		const pathAfterLang = pathSegments.slice(1).join("/");

		// Generate alternate language links automatically
		const hreflangLinks = localeKeys.map((locale) => ({
			href: `${BASE_URL}/${locale}/${pathAfterLang}`,
			rel: "alternate",
			hrefLang: locale,
		}));

		const head = {
			meta: [
				{
					title: i18n._(
						msg`Units Converters${import.meta.env.DEV ? " — Dev" : ""}`,
					),
				},
				{
					name: "description",
					content: i18n._(
						msg`Fast, accurate, and easy-to-use unit converter for Length, Temperature, Area, and Volume. Scientific precision with zero rounding errors.`,
					),
				},
				{
					name: "keywords",
					content: i18n._(
						msg`unit converter, metric conversion, imperial to metric, length converter, temperature converter, area converter, volume converter, scientific calculator`,
					),
				},
				// Open Graph
				{
					property: "og:type",
					content: "website",
				},
				{
					property: "og:title",
					content: i18n._(msg`Units Converters | Precision Conversion Tool`),
				},
				{
					property: "og:description",
					content: i18n._(
						msg`High-precision unit conversion for students and professionals. Convert hundreds of units instantly.`,
					),
				},
				{
					property: "og:site_name",
					content: i18n._(msg`Units Converters`),
				},
				// Twitter
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
				{
					name: "twitter:title",
					content: i18n._(msg`Units Converters | Precision Conversion Tool`),
				},
				{
					name: "twitter:description",
					content: i18n._(
						msg`High-precision unit conversion for students and professionals. Convert hundreds of units instantly.`,
					),
				},
			],
			links: [
				// Automated Hreflang Tags
				...hreflangLinks,
				// x-default (usually English)
				{
					href: `${BASE_URL}/en/${pathAfterLang}`,
					hrefLang: "x-default",
					rel: "alternate",
				},
			],
		};

		console.log("lang route head", {
			ctx,
			hreflangLinks,
			pathname,
			pathAfterLang,
			pathSegments,
			head,
			"i18n.locale": i18n.locale,
			i18n,
			content: i18n._(
				msg`High-precision unit conversion for students and professionals. Convert hundreds of units instantly.`,
			),
		});

		return head;
	},
	component() {
		return (
			<>
				<header className="bg-accent text-accent-foreground h-16 flex text-center items-center justify-center">
					<h1 className="p-2">
						<Link
							params={(params) => ({ lang: params.lang || defaultLocale })}
							search={defaultSearchParams}
							to="/$lang"
						>
							<Trans>Units Converters</Trans>
						</Link>
					</h1>
				</header>

				<div className="w-full h-svh grid converter-grid gap-16">
					<Outlet />

					<hr className="converter-content" />

					<CommonConversions />

					<hr className="converter-content" />

					<WebsiteDescription />

					<hr className="converter-content" />

					<FeedbackSection />

					<Footer />
				</div>
			</>
		);
	},
});
