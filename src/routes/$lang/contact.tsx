import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link } from "@tanstack/react-router";

import { FeedbackSection } from "#/components/feedback-section";
import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { COMPANY } from "#/lib/company";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/$lang/contact")({
	async head({ match }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const title = i18n._(msg`Contact | Units Converters`);
		const description = i18n._(
			msg`Contact Voyager Tecnologias LTDA about Units Converters. Send feedback or reach us by email at voyagertecnologias@gmail.com.`,
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
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="flex flex-col gap-12 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-6">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>Contact</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						Units Converters is operated by <strong>{COMPANY.legalName}</strong>
						, based in {COMPANY.country}. We&apos;d love to hear from you.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Company details</Trans>
				</h3>

				<ul className="list-none space-y-2">
					<li>
						<strong>
							<Trans>Company:</Trans>
						</strong>{" "}
						{COMPANY.legalName}
					</li>

					<li>
						<strong>
							<Trans>Email:</Trans>
						</strong>{" "}
						<a className="link" href={`mailto:${COMPANY.email}`}>
							{COMPANY.email}
						</a>
					</li>

					<li>
						<strong>
							<Trans>Location:</Trans>
						</strong>{" "}
						{COMPANY.region}
					</li>

					{COMPANY.cnpj ? (
						<li>
							<strong>
								<Trans>CNPJ:</Trans>
							</strong>{" "}
							{COMPANY.cnpj}
						</li>
					) : null}

					{COMPANY.address ? (
						<li>
							<strong>
								<Trans>Address:</Trans>
							</strong>{" "}
							{COMPANY.address}
						</li>
					) : null}

					<li>
						<strong>
							<Trans>Response time:</Trans>
						</strong>{" "}
						<Trans>We aim to reply within 2 business days.</Trans>
					</li>
				</ul>

				<p className="text-sm text-muted-foreground">
					<Trans>
						For privacy requests, conversion feedback, or partnership inquiries,
						email is the fastest channel. Include the page URL and locale if you
						are reporting a content issue.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<FeedbackSection />
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
