import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { COMPANY } from "#/lib/company";
import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

export const Route = createFileRoute("/$lang/disclaimer")({
	async head({ match }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const title = i18n._(msg`Disclaimer | Units Converters`);
		const description = i18n._(
			msg`Accuracy, liability, and use limitations for Units Converters conversion tools and educational guides.`,
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
	component: DisclaimerPage,
});

function DisclaimerPage() {
	const { lang } = useParams({ from: "/$lang" });

	return (
		<div className="flex flex-col gap-12 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-6">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>Disclaimer</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						Units Converters is a free educational utility operated by{" "}
						{COMPANY.legalName}. Please read these limitations before relying on
						any result.
					</Trans>
				</p>

				<p className="text-sm text-muted-foreground">
					<Trans>Last updated: 21 July 2026</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Conversion accuracy</Trans>
				</h3>

				<p>
					<Trans>
						We calculate conversions with arbitrary-precision decimal arithmetic
						(Decimal.js) and published unit definitions. Results are intended
						for learning, everyday planning, and general technical reference.
					</Trans>
				</p>

				<p>
					<Trans>
						They are not a substitute for certified metrology, calibrated
						instruments, or professional engineering sign-off. Always verify
						critical values against an authoritative standard for your industry
						before manufacturing, dosing, filing, or shipping decisions.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Not professional advice</Trans>
				</h3>

				<p>
					<Trans>
						Content on this site — including converters, tables, guides, and
						examples — is general information only. It is not legal, medical,
						financial, safety, or engineering advice. If your use case involves
						health, regulated products, structural design, or legal compliance,
						consult a qualified professional.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>No warranty</Trans>
				</h3>

				<p>
					<Trans>
						The site is provided &quot;as is&quot; without warranties of any
						kind, express or implied. {COMPANY.legalName} does not guarantee
						uninterrupted availability, error-free pages, or suitability for a
						particular purpose. See our Terms of Service for full liability
						limits.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Third-party ads and links</Trans>
				</h3>

				<p>
					<Trans>
						Pages may show third-party advertisements (such as Google AdSense)
						or affiliate links after you consent to cookies where required. We
						do not control advertiser content. Affiliate relationships — if any
						— do not change our editorial duty to describe units and conversions
						accurately.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Questions</Trans>
				</h3>

				<p>
					<Trans>
						Contact us at{" "}
						<a className="link" href={`mailto:${COMPANY.email}`}>
							{COMPANY.email}
						</a>{" "}
						if you spot an error or need clarification about how a conversion is
						defined.
					</Trans>
				</p>
			</section>

			<div className="pt-8 border-t flex flex-wrap gap-4">
				<Link
					params={{ lang }}
					search={defaultSearchParams}
					to="/$lang/terms-of-service"
					onClick={scrollPageToTop}
					className="link font-medium"
				>
					<Trans>Terms of Service</Trans>
				</Link>

				<Link
					params={{ lang }}
					search={defaultSearchParams}
					to="/$lang/privacy-policy"
					onClick={scrollPageToTop}
					className="link font-medium"
				>
					<Trans>Privacy Policy</Trans>
				</Link>

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
