import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

export const Route = createFileRoute("/$lang/privacy-policy")({
	async head({ match }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const title = i18n._(msg`Privacy Policy | Units Converters`);
		const description = i18n._(
			msg`Read how Units Converters collects and uses data, including cookies, PostHog analytics, and Google AdSense advertising.`,
		);

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
			],
		};
	},
	component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
	const { lang } = useParams({ from: "/$lang" });

	return (
		<div className="flex flex-col gap-12 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-6">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>Privacy Policy</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						This Privacy Policy explains how Voyager Tecnologias LTDA
						(&quot;we&quot;, &quot;us&quot;) collects, uses, and shares
						information when you use Units Converters.
					</Trans>
				</p>

				<p className="text-sm text-muted-foreground">
					<Trans>Last updated: 13 July 2026</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Who we are</Trans>
				</h3>

				<p>
					<Trans>
						Units Converters is operated by Voyager Tecnologias LTDA, based in
						Brazil. For privacy questions, contact{" "}
						<a
							href="mailto:voyagertecnologias@gmail.com"
							className="link underline"
						>
							voyagertecnologias@gmail.com
						</a>
						.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Information we collect</Trans>
				</h3>

				<p>
					<Trans>
						We aim to collect only what we need to run and improve the site:
					</Trans>
				</p>

				<ul className="list-disc ml-5 space-y-2 text-muted-foreground">
					<li>
						<Trans>
							<strong>Usage data:</strong> pages viewed, approximate location
							derived from IP, device/browser type, and referral information —
							typically via analytics tools after you consent.
						</Trans>
					</li>
					<li>
						<Trans>
							<strong>Consent preference:</strong> whether you accepted or
							declined non-essential cookies, stored in your browser
							(localStorage).
						</Trans>
					</li>
					<li>
						<Trans>
							<strong>Feedback you send:</strong> name, email, and message if
							you use our contact or feedback forms.
						</Trans>
					</li>
					<li>
						<Trans>
							<strong>Advertising data:</strong> when ads are enabled after
							consent, Google AdSense and partners may process cookie and device
							identifiers to show and measure ads.
						</Trans>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Cookies and similar technologies</Trans>
				</h3>

				<p>
					<Trans>
						Essential storage keeps your language and consent choices working.
						Non-essential cookies for analytics and advertising load only after
						you click &quot;Accept All&quot; on our cookie banner. You can
						change your mind anytime via &quot;Cookie settings&quot; in the
						footer.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Google AdSense and other advertising</Trans>
				</h3>

				<p>
					<Trans>
						We use Google AdSense to display advertisements. Google and its
						partners may use cookies or similar technologies to serve ads based
						on your prior visits to this or other websites, subject to your
						consent choices. You can learn more in{" "}
						<a
							href="https://policies.google.com/technologies/ads"
							className="link underline"
							rel="noopener noreferrer"
							target="_blank"
						>
							Google&apos;s Advertising policies
						</a>{" "}
						and manage ad personalization at{" "}
						<a
							href="https://adssettings.google.com/"
							className="link underline"
							rel="noopener noreferrer"
							target="_blank"
						>
							Google Ads Settings
						</a>
						.
					</Trans>
				</p>

				<p>
					<Trans>
						We may also use contextual networks such as Media.net, and optional
						affiliate links (for example Amazon Associates) on guide pages.
						Affiliate partners may set cookies when you follow those links. See
						our Disclaimer for commission disclosure. These partners only load
						after you accept cookies where consent is required.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Analytics</Trans>
				</h3>

				<p>
					<Trans>
						If you accept cookies, we may use PostHog (posthog.com) to
						understand how people use Units Converters—for example, which pages
						are popular, approximate region, and basic device or browser
						information. PostHog processes this data on our behalf so we can
						improve the site. Analytics is disabled when you decline cookies.
						Learn more in{" "}
						<a
							href="https://posthog.com/privacy"
							className="link underline"
							rel="noopener noreferrer"
							target="_blank"
						>
							PostHog&apos;s Privacy Policy
						</a>
						.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>How we use information</Trans>
				</h3>

				<ul className="list-disc ml-5 space-y-2 text-muted-foreground">
					<li>
						<Trans>
							To operate, secure, and improve the converter and guides
						</Trans>
					</li>
					<li>
						<Trans>To respond to contact and feedback messages</Trans>
					</li>
					<li>
						<Trans>To show relevant advertising when you have consented</Trans>
					</li>
					<li>
						<Trans>To comply with legal obligations</Trans>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Sharing of information</Trans>
				</h3>

				<p>
					<Trans>
						We do not sell your personal information. We share data with service
						providers who help us run the site (hosting, email delivery for
						forms, analytics, and advertising partners such as Google) under
						appropriate agreements. We may disclose information if required by
						law.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Data retention</Trans>
				</h3>

				<p>
					<Trans>
						Consent preferences stay in your browser until you clear site data
						or change them. Feedback messages are kept only as long as needed to
						respond and improve the service. Analytics and advertising retention
						follow each provider&apos;s policies.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Your rights</Trans>
				</h3>

				<p>
					<Trans>
						Depending on where you live, you may have rights to access, correct,
						delete, or restrict processing of your personal data, and to object
						to certain processing or withdraw consent. To exercise these rights,
						email{" "}
						<a
							href="mailto:voyagertecnologias@gmail.com"
							className="link underline"
						>
							voyagertecnologias@gmail.com
						</a>
						. You can also decline non-essential cookies at any time.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Children</Trans>
				</h3>

				<p>
					<Trans>
						Units Converters is a general-audience educational tool. We do not
						knowingly collect personal information from children under 13 (or
						the equivalent age in your region). If you believe a child provided
						data, contact us and we will delete it.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>International transfers</Trans>
				</h3>

				<p>
					<Trans>
						Our hosting and partners may process data in countries other than
						yours. Where required, we rely on appropriate safeguards offered by
						those providers.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Changes to this policy</Trans>
				</h3>

				<p>
					<Trans>
						We may update this Privacy Policy from time to time. The &quot;Last
						updated&quot; date at the top will change when we do. Continued use
						of the site after changes means you accept the updated policy.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Contact</Trans>
				</h3>

				<p>
					<Trans>
						Questions about privacy? Email{" "}
						<a
							href="mailto:voyagertecnologias@gmail.com"
							className="link underline"
						>
							voyagertecnologias@gmail.com
						</a>{" "}
						or visit our{" "}
						<Link
							to="/$lang/contact"
							params={{ lang }}
							search={defaultSearchParams}
							onClick={scrollPageToTop}
							className="link underline"
						>
							Contact
						</Link>{" "}
						page. See also our{" "}
						<Link
							to="/$lang/terms-of-service"
							params={{ lang }}
							search={defaultSearchParams}
							onClick={scrollPageToTop}
							className="link underline"
						>
							Terms of Service
						</Link>
						.
					</Trans>
				</p>
			</section>
		</div>
	);
}
