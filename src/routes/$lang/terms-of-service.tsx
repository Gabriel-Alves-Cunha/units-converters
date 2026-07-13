import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/$lang/terms-of-service")({
	async head({ match }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const title = i18n._(msg`Terms of Service | Units Converters`);
		const description = i18n._(
			msg`Read the Terms of Service for Units Converters, including usage disclaimers, intellectual property, advertising, PostHog analytics, and limitation of liability.`,
		);

		return {
			meta: [
				{ property: "og:description", content: description },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ title },
			],
		};
	},
	component: TermsOfServicePage,
});

function TermsOfServicePage() {
	return (
		<div className="flex flex-col gap-12 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-6">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>Terms of Service</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						These Terms of Service govern your use of Units Converters. By
						accessing or using this website, you agree to these terms.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Acceptance of Terms</Trans>
				</h3>

				<p>
					<Trans>
						By using Units Converters, you confirm that you have read,
						understood, and agree to be bound by these Terms of Service and our
						Privacy Policy. If you do not agree, please do not use the site.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Free Converter Disclaimer</Trans>
				</h3>

				<p>
					<Trans>
						Units Converters is provided free of charge as a convenience tool.
						Conversion results are for general informational and educational
						purposes only. They are <strong>not</strong> intended for
						life-critical, medical, safety, legal, financial, or other
						high-stakes decisions. Always verify critical measurements with
						appropriate professional standards or calibrated instruments.
					</Trans>
				</p>

				<p>
					<Trans>
						The service is provided <strong>"as is"</strong> and{" "}
						<strong>"as available"</strong> without warranties of any kind,
						express or implied, including but not limited to accuracy,
						completeness, merchantability, or fitness for a particular purpose.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Intellectual Property</Trans>
				</h3>

				<p>
					<Trans>
						All content, branding, layout, and software on Units Converters —
						excluding third-party materials — are owned by Voyager Tecnologias
						LTDA or its licensors and are protected by applicable intellectual
						property laws. You may use the site for personal, non-commercial
						conversion purposes. You may not copy, scrape, republish, or
						commercially exploit our content or technology without prior written
						permission.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>User Feedback and Conduct</Trans>
				</h3>

				<p>
					<Trans>
						If you submit feedback, suggestions, or other content through our
						forms or email, you grant us a non-exclusive, royalty-free license
						to use that material to improve the service. You agree not to misuse
						the site, attempt to disrupt it, submit unlawful or abusive content,
						or interfere with other users' access.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Third-Party Advertising</Trans>
				</h3>

				<p>
					<Trans>
						We may display advertisements served by third parties, including
						Google AdSense. These partners may use cookies or similar
						technologies to show relevant ads, subject to your consent choices
						and our Privacy Policy. We do not control the content of third-party
						ads and are not responsible for their practices.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Analytics</Trans>
				</h3>

				<p>
					<Trans>
						We may use PostHog to collect anonymized or pseudonymized usage
						analytics (such as pages viewed and basic device information) so we
						can improve Units Converters. Analytics cookies and related
						processing run only after you accept non-essential cookies. Details
						are in our Privacy Policy. You can decline cookies at any time via
						Cookie settings in the footer.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Limitation of Liability</Trans>
				</h3>

				<p>
					<Trans>
						To the fullest extent permitted by law, Voyager Tecnologias LTDA and
						its operators shall not be liable for any indirect, incidental,
						special, consequential, or punitive damages, or for any loss of
						data, profits, or business arising from your use of — or inability
						to use — Units Converters, including reliance on any conversion
						result.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Changes to These Terms</Trans>
				</h3>

				<p>
					<Trans>
						We may update these Terms of Service from time to time. Continued
						use of the site after changes are posted constitutes acceptance of
						the revised terms. We encourage you to review this page
						periodically.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Contact</Trans>
				</h3>

				<p>
					<Trans>
						Questions about these Terms of Service may be sent to{" "}
						<strong>Voyager Tecnologias LTDA</strong> at{" "}
						<a className="link" href="mailto:voyagertecnologias@gmail.com">
							voyagertecnologias@gmail.com
						</a>
						.
					</Trans>
				</p>
			</section>

			<div className="pt-8 border-t">
				<Link
					params={(params) => ({ lang: params.lang || defaultLocale })}
					className="link font-medium inline-flex items-center gap-2"
					search={defaultSearchParams}
					to="/$lang"
				>
					← <Trans>Back to Home</Trans>
				</Link>
			</div>
		</div>
	);
}
