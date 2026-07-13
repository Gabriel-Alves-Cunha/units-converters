import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link } from "@tanstack/react-router";

import { FeedbackSection } from "#/components/feedback-section";
import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
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
						Units Converters is operated by{" "}
						<strong>Voyager Tecnologias LTDA</strong>, based in Brazil. We'd
						love to hear from you.
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
						Voyager Tecnologias LTDA
					</li>

					<li>
						<strong>
							<Trans>Email:</Trans>
						</strong>{" "}
						<a className="link" href="mailto:voyagertecnologias@gmail.com">
							voyagertecnologias@gmail.com
						</a>
					</li>

					<li>
						<strong>
							<Trans>Location:</Trans>
						</strong>{" "}
						<Trans>Based in Brazil</Trans>
					</li>
				</ul>
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
