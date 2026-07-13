import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import {
	createFileRoute,
	Outlet,
	redirect,
	Link,
	useParams,
	useRouterState,
} from "@tanstack/react-router";
import { msg } from "@lingui/core/macro";
import { ChevronDown, Menu } from "lucide-react";
import { useLingui } from "@lingui/react";

import { CommonConversions } from "#/components/common-conversions";
import { FeedbackSection } from "#/components/feedback-section";
import { Footer } from "#/components/footer";
import { CookieConsent } from "#/components/cookie-consent";
import { WebsiteDescription } from "#/components/website-description";
import {
	defaultLocale,
	isLocaleValid,
	loadCatalog,
	loadDefaultCatalog,
	locales,
	type Locales,
} from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";
import { cn } from "#/lib/utils";

const LANGUAGE_SWITCHER_POPOVER_ID = "language-switcher-popover";
const MOBILE_NAV_POPOVER_ID = "mobile-nav-popover";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
	throw new Error("VITE_BASE_URL is not defined");
}

const localeKeys = Object.keys(locales) as Locales[];

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

		const { pathname } = ctx.matches.at(-1) ?? ctx.match; // Fallback to root if no matches (shouldn't happen)

		// Extract the part of the path AFTER the language (e.g., /en/length -> length)
		const pathSegments = pathname.split("/").filter(Boolean);
		const pathAfterLang = pathSegments.slice(1).join("/");

		const canonicalPath = `${BASE_URL}/${lang}${pathAfterLang ? `/${pathAfterLang}` : ""}`;

		// Generate alternate language links automatically
		const hreflangLinks = localeKeys.map((locale) => ({
			href: `${BASE_URL}/${locale}${pathAfterLang ? `/${pathAfterLang}` : ""}`,
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
				{
					property: "og:image",
					content: `${BASE_URL}/og-image.png`,
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
				{
					name: "twitter:image",
					content: `${BASE_URL}/og-image.png`,
				},
			],
			links: [
				{
					href: canonicalPath,
					rel: "canonical",
				},
				// Automated Hreflang Tags
				...hreflangLinks,
				// x-default (usually English)
				{
					href: `${BASE_URL}/en${pathAfterLang ? `/${pathAfterLang}` : ""}`,
					hrefLang: "x-default",
					rel: "alternate",
				},
			],
		};

		return head;
	},
	component: LangLayout,
});

const NAV_LINKS = [
	{
		to: "/$lang",
		label: msg`Home`,
		exact: true,
	},
	{
		to: "/$lang/guides",
		label: msg`Guides`,
		exact: false,
	},
	{
		to: "/$lang/about",
		label: msg`About`,
		exact: true,
	},
	{
		to: "/$lang/contact",
		label: msg`Contact`,
		exact: true,
	},
] as const;

function closePopover(id: string) {
	document.getElementById(id)?.hidePopover();
}

function LanguageSwitcher() {
	const { i18n } = useLingui();
	const { lang } = useParams({ from: "/$lang" });

	const currentLocale = isLocaleValid(lang) ? (lang as Locales) : defaultLocale;
	const currentLabel = locales[currentLocale];

	const sortedLocales = [...localeKeys].sort((a, b) =>
		locales[a].localeCompare(locales[b], undefined, { sensitivity: "base" }),
	);

	return (
		<div className="shrink-0">
			<button
				type="button"
				popoverTarget={LANGUAGE_SWITCHER_POPOVER_ID}
				className="language-switcher-trigger inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium opacity-90 hover:opacity-100 hover:bg-background/10"
				aria-haspopup="dialog"
			>
				<span className="max-w-28 truncate">{currentLabel}</span>
				<ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
			</button>

			<div
				id={LANGUAGE_SWITCHER_POPOVER_ID}
				popover="auto"
				role="dialog"
				aria-label={i18n._(msg`Choose language`)}
				className="language-switcher-popover m-0 max-h-72 min-w-44 overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md simple-scrollbar"
			>
				<ul className="flex flex-col gap-0.5">
					{sortedLocales.map((locale) => {
						const isActive = locale === currentLocale;

						return (
							<li key={locale}>
								<Link
									to="."
									params={(prev) => ({ ...prev, lang: locale })}
									search={(prev) => ({ ...defaultSearchParams, ...prev })}
									aria-current={isActive ? "page" : undefined}
									className={cn(
										"flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
										isActive &&
											"bg-accent font-semibold text-white hover:text-white",
									)}
									onClick={function closeLanguagePopover() {
										closePopover(LANGUAGE_SWITCHER_POPOVER_ID);
									}}
								>
									<span>{locales[locale]}</span>
									<span
										className={cn(
											"text-xs uppercase tracking-wide",
											isActive ? "text-white" : "opacity-60",
										)}
									>
										{locale}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

function DesktopNav({ lang }: { lang: string }) {
	const { i18n } = useLingui();

	return (
		<nav
			aria-label={i18n._(msg`Main`)}
			className="hidden md:flex items-center gap-4 text-sm"
		>
			{NAV_LINKS.map(function renderDesktopLink(link) {
				return (
					<Link
						key={link.to}
						params={{ lang }}
						search={defaultSearchParams}
						to={link.to}
						{...(link.exact ? { activeOptions: { exact: true } } : {})}
						activeProps={{
							className: "opacity-100 underline underline-offset-4",
							"aria-current": "page",
						}}
						className="opacity-90 hover:opacity-100 hover:underline hover:underline-offset-4"
					>
						{i18n._(link.label)}
					</Link>
				);
			})}
		</nav>
	);
}

function MobileNav({ lang }: { lang: string }) {
	const { i18n } = useLingui();

	return (
		<div className="md:hidden shrink-0">
			<button
				type="button"
				popoverTarget={MOBILE_NAV_POPOVER_ID}
				className="mobile-nav-trigger inline-flex size-9 items-center justify-center rounded-md opacity-90 hover:opacity-100 hover:bg-background/10"
				aria-haspopup="dialog"
				aria-label={i18n._(msg`Open menu`)}
			>
				<Menu className="size-5" aria-hidden />
			</button>

			<nav
				id={MOBILE_NAV_POPOVER_ID}
				popover="auto"
				aria-label={i18n._(msg`Main`)}
				className="mobile-nav-popover m-0 min-w-44 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md"
			>
				<ul className="flex flex-col gap-0.5">
					{NAV_LINKS.map(function renderMobileLink(link) {
						return (
							<li key={link.to}>
								<Link
									params={{ lang }}
									search={defaultSearchParams}
									to={link.to}
									{...(link.exact ? { activeOptions: { exact: true } } : {})}
									activeProps={{
										className:
											"bg-accent font-semibold text-white hover:text-white",
										"aria-current": "page",
									}}
									className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
									onClick={function closeMobileNav() {
										closePopover(MOBILE_NAV_POPOVER_ID);
									}}
								>
									{i18n._(link.label)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

function LangLayout() {
	const { lang } = useParams({ from: "/$lang" });
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isContactPage = pathname.includes("/contact");

	return (
		<>
			<header className="bg-accent text-accent-foreground [grid-area:header] flex items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
				<div className="flex items-center gap-2 sm:gap-6 min-w-0">
					<h1 className="p-2 shrink min-w-0 truncate text-base sm:text-lg font-semibold">
						<Link
							params={(params) => ({ lang: params.lang || defaultLocale })}
							search={defaultSearchParams}
							to="/$lang"
						>
							<Trans>Units Converters</Trans>
						</Link>
					</h1>

					<DesktopNav lang={lang} />
				</div>

				<div className="flex items-center gap-1 shrink-0">
					<MobileNav lang={lang} />
					<LanguageSwitcher />
				</div>
			</header>

			<main
				data-scroll-restoration-id="main"
				className="w-full max-w-full h-full simple-scrollbar scrollbar-stable overflow-x-hidden converter-grid gap-y-16 [grid-area:main]"
			>
				<Outlet />

				<div className="h-svh flex flex-none"></div>

				<hr className="converter-content" />

				<CommonConversions />

				<hr className="converter-content" />

				<WebsiteDescription />

				{isContactPage ? null : (
					<>
						<hr className="converter-content" />
						<FeedbackSection className="converter-content" />
					</>
				)}

				<Footer />
			</main>
			<CookieConsent />
		</>
	);
}
