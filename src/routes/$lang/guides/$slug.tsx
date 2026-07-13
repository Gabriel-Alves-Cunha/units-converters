import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link } from "@tanstack/react-router";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { GuideArticle } from "#/features/guides/guide-article";
import { getGuideBySlug } from "#/features/guides/data/guides";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/$lang/guides/$slug")({
	async head({ match, params }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const guide = getGuideBySlug(params.slug);

		if (!guide) {
			const title = i18n._(msg`Guide not found | Units Converters`);
			return { meta: [{ title }] };
		}

		const title = i18n._(msg`${i18n._(guide.title)} | Units Converters Guides`);
		const description = i18n._(guide.description);

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:type", content: "article" },
			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Article",
						headline: i18n._(guide.title),
						description,
						author: {
							"@type": "Organization",
							name: "Voyager Tecnologias LTDA",
						},
						publisher: {
							"@type": "Organization",
							name: "Units Converters",
						},
					}),
				},
			],
		};
	},
	component: GuideSlugPage,
});

function GuideSlugPage() {
	const { slug, lang } = Route.useParams();
	const guide = getGuideBySlug(slug);

	if (!guide) {
		return (
			<div className="converter-content py-8 space-y-4 text-center">
				<h2 className="text-2xl font-bold">
					<Trans>Guide not found</Trans>
				</h2>
				<p className="text-muted-foreground">
					<Trans>That guide does not exist or may have moved.</Trans>
				</p>
				<Link
					params={{ lang }}
					search={defaultSearchParams}
					to="/$lang/guides"
					className="link underline"
				>
					<Trans>Browse all guides</Trans>
				</Link>
			</div>
		);
	}

	return <GuideArticle guide={guide} />;
}
