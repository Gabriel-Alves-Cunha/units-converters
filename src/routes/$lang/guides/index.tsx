import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { guides } from "#/features/guides/data/guides";
import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

export const Route = createFileRoute("/$lang/guides/")({
	async head({ match }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const title = i18n._(msg`Unit Conversion Guides | Units Converters`);
		const description = i18n._(
			msg`In-depth guides on metric and imperial units, temperature scales, SI prefixes, cooking conversions, and precision measurement.`,
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
	component: GuidesIndexPage,
});

function GuidesIndexPage() {
	const { i18n } = useLingui();
	const { lang } = Route.useParams();

	return (
		<div className="flex flex-col gap-10 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-4">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>Unit Conversion Guides</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						Practical, original explainers for students, engineers, cooks, and
						anyone who needs to convert units without second-guessing the math.
					</Trans>
				</p>
			</section>

			<ul className="grid gap-4">
				{guides.map((guide) => (
					<li key={guide.slug}>
						<Link
							params={{ lang, slug: guide.slug }}
							search={defaultSearchParams}
							to="/$lang/guides/$slug"
							onClick={scrollPageToTop}
							className="group block rounded-2xl border bg-card p-6 button-hover"
						>
							<h3 className="text-xl font-semibold text-primary group-hover:underline">
								{i18n._(guide.title)}
							</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								{i18n._(guide.description)}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
