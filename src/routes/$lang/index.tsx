import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { guides } from "#/features/guides/data/guides";
import { defaultSearchParams } from "#/lib/global-params-params";
import { getPopularConversionsForQuantity } from "#/lib/popular-conversions";
import {
	type Quantity,
	type UnitName,
	UnitNamesWithTranslations,
	QuantitiesWithTranslations,
	QuantitySchema,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord, scrollPageToTop } from "#/lib/utils";

export const Route = createFileRoute("/$lang/")({
	component: Home,
});

function getDefaultConversionPair(quantity: Quantity) {
	const popular = getPopularConversionsForQuantity(quantity)[0];
	if (popular) {
		return { from: popular.from, to: popular.to };
	}

	const unitKeys = Object.keys(units[quantity]) as UnitName[];
	const from = getFirstKeyOfRecord(units[quantity]) as UnitName | undefined;
	const to = unitKeys.find((unit) => unit !== from);

	if (!from || !to) {
		return null;
	}

	return { from, to };
}

function Home() {
	const { i18n } = useLingui();
	const featuredGuides = guides.slice(0, 4);

	return (
		<div className="flex flex-col gap-12 min-h-fit converter-content py-8">
			<section className="text-center space-y-4">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl min-h-28">
					<Trans>The Only Unit Converter You'll Ever Need</Trans>
				</h2>

				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					<Trans>
						Simple, fast, and scientific-grade precision. Convert anything from
						nanometres to light years in seconds.
					</Trans>
				</p>
			</section>

			<section className="space-y-4 max-w-3xl mx-auto text-center">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>How it works</Trans>
				</h3>
				<p className="text-muted-foreground">
					<Trans>
						Every conversion goes through a carefully defined base unit with
						Decimal.js arithmetic—so homework, recipes, lab notes, and
						engineering estimates stay stable instead of drifting with binary
						floating-point math. Pick a category, choose two units, and read the
						formulas, tables, and FAQs on each page.
					</Trans>
				</p>
			</section>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{QuantitySchema.options.map((quantity) => {
					const pair = getDefaultConversionPair(quantity);
					if (!pair) {
						return null;
					}

					const translatedUnits = Object.keys(units[quantity])
						.slice(0, 3)
						.map((unit) => i18n._(UnitNamesWithTranslations[unit as UnitName]))
						.join(", ");

					return (
						<Link
							className="group relative flex flex-col p-6 rounded-2xl border bg-card button-hover"
							to="/$lang/convert/$quantity/$from/to/$to"
							search={defaultSearchParams}
							key={quantity}
							params={(params) => ({
								lang: params.lang || defaultLocale,
								quantity,
								from: pair.from,
								to: pair.to,
							})}
							onClick={scrollPageToTop}
						>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-2xl font-semibold text-primary">
									{i18n._(QuantitiesWithTranslations[quantity])}
								</h3>

								<ChevronRight className="size-5 text-muted-foreground group-hover:text-primary" />
							</div>

							<p className="text-muted-foreground">
								<Trans>Convert {translatedUnits} and more.</Trans>
							</p>
						</Link>
					);
				})}
			</div>

			<section className="space-y-6">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<div className="space-y-2">
						<h3 className="text-2xl font-semibold text-primary">
							<Trans>Learn with our guides</Trans>
						</h3>
						<p className="text-muted-foreground max-w-2xl">
							<Trans>
								Original explainers on metric vs imperial, temperature scales,
								SI prefixes, cooking conversions, and more.
							</Trans>
						</p>
					</div>

					<Link
						params={(params) => ({ lang: params.lang || defaultLocale })}
						search={defaultSearchParams}
						to="/$lang/guides"
						onClick={scrollPageToTop}
						className="link underline font-medium"
					>
						<Trans>View all guides</Trans>
					</Link>
				</div>

				<ul className="grid gap-4 sm:grid-cols-2">
					{featuredGuides.map((guide) => (
						<li key={guide.slug}>
							<Link
								params={(params) => ({
									lang: params.lang || defaultLocale,
									slug: guide.slug,
								})}
								search={defaultSearchParams}
								to="/$lang/guides/$slug"
								onClick={scrollPageToTop}
								className="block rounded-2xl border bg-card p-5 button-hover h-full"
							>
								<h4 className="font-semibold text-primary">
									{i18n._(guide.title)}
								</h4>
								<p className="mt-2 text-sm text-muted-foreground line-clamp-3">
									{i18n._(guide.description)}
								</p>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section className="space-y-4 max-w-3xl">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Built for everyday and scientific use</Trans>
				</h3>
				<p className="text-muted-foreground">
					<Trans>
						Whether you are converting body height for a form, room area for
						flooring, oven temperature for a recipe, or pool volume for
						chemicals, Units Converters gives you a clear result plus
						context—unit descriptions, worked examples, and guides that explain
						the systems behind the numbers.
					</Trans>
				</p>
			</section>
		</div>
	);
}
