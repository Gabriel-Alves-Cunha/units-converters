import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { safeParse } from "valibot";
import * as v from "valibot";

import {
	defaultLocale,
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";
import { AdSlot } from "#/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "#/lib/adsense";
import { defaultSearchParams } from "#/lib/global-params-params";
import { getPopularConversionsForQuantity } from "#/lib/popular-conversions";
import {
	type Quantity,
	QuantitySchema,
	QuantitiesWithTranslations,
	type UnitName,
	UnitNamesWithTranslations,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord, scrollPageToTop } from "#/lib/utils";

const quantityParamsSchema = v.object({
	quantity: QuantitySchema,
});

const QUANTITY_INTROS: Record<Quantity, ReturnType<typeof msg>> = {
	Length: msg`Length measures distance—from nanometres in materials science to light years in astronomy. This hub collects everyday and scientific length units so you can open any pair for formulas, tables, and high-precision conversion.`,
	Temperature: msg`Temperature scales describe how hot or cold something is. Celsius and Fahrenheit dominate daily life; Kelvin is the SI scientific scale. Convert between them with exact formulas—not floating-point shortcuts—and read the FAQs on each pair page.`,
	Area: msg`Area measures surface: rooms in square metres or square feet, land in hectares and acres. Pick a starting unit below, then convert to any other area unit without rounding drift. Guides on flooring and land units pair well with these tools.`,
	Volume: msg`Volume covers capacity and three-dimensional space—litres in the kitchen, cubic metres in construction and pools, and fine scientific units. Convert carefully when recipes or chemical charts mix cups, millilitres, and cubic metres.`,
};

const QUANTITY_TIPS: Record<Quantity, ReturnType<typeof msg>> = {
	Length: msg`Tip: keep drawings in one system (metric or imperial) end-to-end. Convert only at the project boundary to avoid tolerance stack-ups. Dual-label heights and road distances when teams span countries.`,
	Temperature: msg`Tip: Kelvin never uses a degree symbol in SI writing (K, not °K). A change of 1 K equals a change of 1 °C. For baking, convert the recipe first, then adjust for fan ovens.`,
	Area: msg`Tip: do not confuse square metres of floor with litres of paint—area and volume are different quantity types. Convert area only after length × width in a single system.`,
	Volume: msg`Tip: for baking accuracy, prefer weighing ingredients in grams over converting cup volumes when you can. For pools and tanks, confirm geometry before converting to litres.`,
};

export const Route = createFileRoute("/$lang/category/$quantity")({
	async head({ match, params }) {
		const { i18n } = match.context;
		const lang = match.params.lang || defaultLocale;

		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const parsed = safeParse(quantityParamsSchema, params);

		if (!parsed.success) {
			return {
				meta: [{ title: i18n._(msg`Category not found | Units Converters`) }],
			};
		}

		const quantity = parsed.output.quantity;
		const tQuantity = i18n._(QuantitiesWithTranslations[quantity]);
		const title = i18n._(msg`${tQuantity} Converter Hub | Units Converters`);
		const description = i18n._(QUANTITY_INTROS[quantity]);

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
			],
		};
	},
	component: QuantityHubPage,
});

function QuantityHubPage() {
	const rawParams = Route.useParams();
	const { lang } = rawParams;
	const { i18n } = useLingui();

	const parsed = safeParse(quantityParamsSchema, rawParams);

	if (!parsed.success) {
		return (
			<div className="converter-content py-8 space-y-4 text-center">
				<h2 className="text-2xl font-bold">
					<Trans>Category not found</Trans>
				</h2>
				<Link
					params={{ lang }}
					search={defaultSearchParams}
					to="/$lang"
					className="link underline"
				>
					<Trans>Back to Home</Trans>
				</Link>
			</div>
		);
	}

	const quantity = parsed.output.quantity;
	const tQuantity = i18n._(QuantitiesWithTranslations[quantity]);
	const unitEntries = Object.keys(units[quantity]) as UnitName[];
	const firstUnit = getFirstKeyOfRecord(units[quantity]) as
		| UnitName
		| undefined;

	const popularFromList = getPopularConversionsForQuantity(quantity);
	const popularPairs =
		popularFromList.length > 0
			? popularFromList.map((pair) => ({ from: pair.from, to: pair.to }))
			: unitEntries.length >= 2 && firstUnit
				? unitEntries
						.slice(1, 9)
						.filter((to): to is UnitName => Boolean(to))
						.map((to) => ({ from: firstUnit, to }))
				: [];

	return (
		<div className="flex flex-col gap-10 min-h-fit converter-content py-8 leading-relaxed">
			<section className="space-y-4">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>{tQuantity} conversions</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					{i18n._(QUANTITY_INTROS[quantity])}
				</p>

				<p className="text-sm text-muted-foreground">
					{i18n._(QUANTITY_TIPS[quantity])}
				</p>
			</section>

			<AdSlot slot={ADSENSE_SLOTS.category} className="my-2" />

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Popular {tQuantity} conversions</Trans>
				</h3>

				<ul className="grid gap-2 sm:grid-cols-2">
					{popularPairs.map((pair) => {
						const fromLabel = i18n._(UnitNamesWithTranslations[pair.from]);
						const toLabel = i18n._(UnitNamesWithTranslations[pair.to]);

						return (
							<li key={`${pair.from}-${pair.to}`}>
								<Link
									params={{
										lang,
										quantity,
										from: pair.from,
										to: pair.to,
									}}
									search={defaultSearchParams}
									to="/$lang/convert/$quantity/$from/to/$to"
									onClick={scrollPageToTop}
									className="link underline"
								>
									<Trans>
										{fromLabel} to {toLabel}
									</Trans>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>All {tQuantity} units</Trans>
				</h3>

				<p className="text-sm text-muted-foreground">
					<Trans>
						Select any unit to open the converter. You can change the target
						unit on the next screen.
					</Trans>
				</p>

				<ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
					{unitEntries.map((unitName) => {
						const label = i18n._(UnitNamesWithTranslations[unitName]);
						const target =
							unitEntries.find((candidate) => candidate !== unitName) ||
							unitName;

						return (
							<li key={unitName}>
								<Link
									params={{
										lang,
										quantity,
										from: unitName,
										to: target,
									}}
									search={defaultSearchParams}
									to="/$lang/convert/$quantity/$from/to/$to"
									onClick={scrollPageToTop}
									className="block rounded-lg border bg-card px-4 py-3 text-sm button-hover"
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>How our {tQuantity} converter works</Trans>
				</h3>

				<p className="text-muted-foreground">
					<Trans>
						Every conversion goes through a carefully defined base unit for{" "}
						{tQuantity}. We use arbitrary-precision decimal arithmetic so
						results stay stable for scientific work, homework, and professional
						estimates alike.
					</Trans>
				</p>

				<p className="text-muted-foreground">
					<Trans>
						Open a conversion pair for formulas, a reference table, worked
						examples, and short FAQs tailored to those two units.
					</Trans>
				</p>
			</section>
		</div>
	);
}
