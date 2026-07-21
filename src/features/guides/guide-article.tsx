import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Link, useParams } from "@tanstack/react-router";

import { AdSlot } from "#/components/ads/ad-slot";
import { MediaNetSlot } from "#/components/ads/medianet-slot";
import { AffiliateCta } from "#/components/affiliate-cta";
import type { Guide } from "#/features/guides/data/guides";
import { COMPANY } from "#/lib/company";
import { ADSENSE_SLOTS } from "#/lib/adsense";
import { defaultSearchParams } from "#/lib/global-params-params";
import { UnitNamesWithTranslations } from "#/lib/units";
import { scrollPageToTop } from "#/lib/utils";

interface GuideArticleProps {
	guide: Guide;
}

function affiliateQueryForGuide(slug: string): string {
	if (
		slug.includes("cooking") ||
		slug.includes("grams") ||
		slug.includes("oven")
	) {
		return "kitchen scale grams";
	}
	if (
		slug.includes("carpet") ||
		slug.includes("room-area") ||
		slug.includes("flooring")
	) {
		return "laser distance measure";
	}
	if (slug.includes("pool")) {
		return "pool volume test kit";
	}
	if (slug.includes("shipping") || slug.includes("kilograms")) {
		return "digital luggage scale";
	}
	return "unit conversion measuring tools";
}

export function GuideArticle({ guide }: GuideArticleProps) {
	const { i18n } = useLingui();
	const { lang } = useParams({ from: "/$lang" });

	return (
		<article className="flex flex-col gap-10 min-h-fit converter-content py-8 leading-relaxed">
			<header className="space-y-4">
				<p className="text-sm text-muted-foreground">
					<Link
						params={{ lang }}
						search={defaultSearchParams}
						to="/$lang/guides"
						onClick={scrollPageToTop}
						className="link underline"
					>
						<Trans>Guides</Trans>
					</Link>
					<span aria-hidden="true"> / </span>
					<span>{i18n._(guide.title)}</span>
				</p>

				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					{i18n._(guide.title)}
				</h2>

				<p className="text-xl text-muted-foreground">
					{i18n._(guide.description)}
				</p>

				<p className="text-sm text-muted-foreground">
					<Trans>
						By the Units Converters editorial team · {COMPANY.legalName}
					</Trans>
				</p>
			</header>

			<AdSlot slot={ADSENSE_SLOTS.guide} className="my-2" />
			{/* Media.net only when configured — do not enable during AdSense review */}
			<MediaNetSlot className="my-2" />

			{guide.sections.map((section, sectionIndex) => (
				<section key={sectionIndex} className="space-y-4">
					<h3 className="text-2xl font-semibold text-primary">
						{i18n._(section.heading)}
					</h3>

					{section.paragraphs.map((paragraph, paragraphIndex) => (
						<p key={paragraphIndex} className="text-muted-foreground">
							{i18n._(paragraph)}
						</p>
					))}
				</section>
			))}

			{guide.relatedConverters.length > 0 ? (
				<section className="space-y-4">
					<h3 className="text-2xl font-semibold text-primary">
						<Trans>Related converters</Trans>
					</h3>

					<ul className="grid gap-2 sm:grid-cols-2">
						{guide.relatedConverters.map((converter) => {
							const fromLabel = i18n._(
								UnitNamesWithTranslations[converter.from],
							);
							const toLabel = i18n._(UnitNamesWithTranslations[converter.to]);

							return (
								<li
									key={`${converter.quantity}-${converter.from}-${converter.to}`}
								>
									<Link
										params={{
											lang,
											quantity: converter.quantity,
											from: converter.from,
											to: converter.to,
										}}
										search={defaultSearchParams}
										to="/$lang/convert/$quantity/$from/to/$to"
										onClick={scrollPageToTop}
										className="link underline"
									>
										<Trans>
											Convert {fromLabel} to {toLabel}
										</Trans>
									</Link>
								</li>
							);
						})}
					</ul>
				</section>
			) : null}

			{guide.faqs.length > 0 ? (
				<section className="space-y-4">
					<h3 className="text-2xl font-semibold text-primary">
						<Trans>Frequently asked questions</Trans>
					</h3>

					<div className="space-y-4">
						{guide.faqs.map((faq, faqIndex) => (
							<details
								key={faqIndex}
								className="rounded-lg border bg-card p-4 open:shadow-sm"
							>
								<summary className="cursor-pointer font-medium text-foreground">
									{i18n._(faq.question)}
								</summary>
								<p className="mt-3 text-sm text-muted-foreground">
									{i18n._(faq.answer)}
								</p>
							</details>
						))}
					</div>
				</section>
			) : null}

			<AffiliateCta searchQuery={affiliateQueryForGuide(guide.slug)} />

			<div className="pt-4 border-t">
				<Link
					params={{ lang }}
					search={defaultSearchParams}
					to="/$lang/guides"
					onClick={scrollPageToTop}
					className="link font-medium"
				>
					← <Trans>All guides</Trans>
				</Link>
			</div>
		</article>
	);
}
