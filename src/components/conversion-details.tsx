import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Link, useParams } from "@tanstack/react-router";
import { Decimal } from "decimal.js";

import { AdSlot } from "#/components/ads/ad-slot";
import { getGuidesForQuantity } from "#/features/guides/data/guides";
import { ADSENSE_SLOTS } from "#/lib/adsense";
import { defaultSearchParams } from "#/lib/global-params-params";
import {
	type Quantity,
	type UnitName,
	UnitNamesWithTranslations,
	QuantitiesWithTranslations,
	units,
	type UnitDefinition,
} from "#/lib/units";
import { numberFormatter, scrollPageToTop } from "#/lib/utils";

interface ConversionDetailsProps {
	quantity: Quantity;
	from: UnitName;
	to: UnitName;
}

export function ConversionDetails({
	quantity,
	from,
	to,
}: ConversionDetailsProps) {
	const { i18n } = useLingui();
	const { lang } = useParams({ from: "/$lang" });

	const selectedQuantity = units[quantity];
	// @ts-ignore
	const fromUnit = selectedQuantity?.[from] as UnitDefinition;
	// @ts-ignore
	const toUnit = selectedQuantity?.[to] as UnitDefinition;

	if (!fromUnit || !toUnit) return null;

	const tFrom = i18n._(UnitNamesWithTranslations[from]);
	const tTo = i18n._(UnitNamesWithTranslations[to]);
	const tQuantity = i18n._(QuantitiesWithTranslations[quantity]);

	const fromDescription = fromUnit.description
		? i18n._(fromUnit.description)
		: null;
	const toDescription = toUnit.description ? i18n._(toUnit.description) : null;

	function convert(val: number) {
		const decimalVal = new Decimal(val);
		const valueInBaseUnit = fromUnit.toBaseUnit(decimalVal);
		const result = toUnit.fromBaseUnit(valueInBaseUnit);

		return numberFormatter.format(result.toNumber());
	}

	const oneToOne = convert(1);
	const exampleInput = 42;
	const exampleOutput = convert(exampleInput);
	const commonValues = [1, 5, 10, 25, 50, 100, 500, 1000];

	const sameQuantityUnits = Object.keys(selectedQuantity) as UnitName[];
	const relatedUnits = sameQuantityUnits
		.filter((unitName) => unitName !== from && unitName !== to)
		.slice(0, 4);

	const relatedGuides = getGuidesForQuantity(quantity, 3);

	return (
		<section className="grid grid-flow-row gap-8 converter-content">
			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>
						How to convert {tFrom} to {tTo}
					</Trans>
				</h3>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<h4 className="font-medium text-foreground">{tFrom}</h4>
						<p className="text-sm text-muted-foreground">
							{fromDescription || (
								<Trans>
									{tFrom} is a unit of {tQuantity} used in measurement and
									conversion work.
								</Trans>
							)}
						</p>
						{fromUnit.formula && (
							<code className="block p-2 bg-muted rounded text-xs">
								{fromUnit.formula}
							</code>
						)}
					</div>

					<div className="space-y-2">
						<h4 className="font-medium text-foreground">{tTo}</h4>
						<p className="text-sm text-muted-foreground">
							{toDescription || (
								<Trans>
									{tTo} is a unit of {tQuantity} used in measurement and
									conversion work.
								</Trans>
							)}
						</p>
						{toUnit.formula && (
							<code className="block p-2 bg-muted rounded text-xs">
								{toUnit.formula}
							</code>
						)}
					</div>
				</div>

				<p className="text-muted-foreground pt-4">
					<Trans>
						To convert <strong>{tFrom}</strong> to <strong>{tTo}</strong>, our
						tool uses the base unit as a bridge, ensuring maximum precision
						through arbitrary-precision decimal arithmetic.
					</Trans>
				</p>

				<div className="p-4 bg-muted rounded-lg border text-center break-all">
					<p className="text-lg font-medium">
						1 {tFrom} ({fromUnit.symbol}) = {oneToOne} {tTo} ({toUnit.symbol})
					</p>
				</div>

				<p className="text-sm text-muted-foreground">
					<Trans>
						Below you will find a quick reference table of common{" "}
						<strong>{tFrom}</strong> to <strong>{tTo}</strong> values, plus any
						available formulas, so you can compare results at a glance without
						re-entering each amount.
					</Trans>
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Conversion formula</Trans>
				</h3>

				<p className="text-muted-foreground">
					<Trans>
						Exact conversion between <strong>{tFrom}</strong> and{" "}
						<strong>{tTo}</strong> starts by expressing the source value in the{" "}
						{tQuantity} base unit, then converting that base value into {tTo}.
						For a one-to-one check: 1 {fromUnit.symbol} equals {oneToOne}{" "}
						{toUnit.symbol}.
					</Trans>
				</p>

				{fromUnit.formula || toUnit.formula ? (
					<div className="space-y-2 rounded-lg border bg-card p-4 text-sm">
						{fromUnit.formula ? (
							<p>
								<span className="font-medium">{tFrom}: </span>
								<code>{fromUnit.formula}</code>
							</p>
						) : null}
						{toUnit.formula ? (
							<p>
								<span className="font-medium">{tTo}: </span>
								<code>{toUnit.formula}</code>
							</p>
						) : null}
					</div>
				) : (
					<p className="text-sm text-muted-foreground">
						<Trans>
							This pair uses fixed scale factors relative to the {tQuantity}{" "}
							base unit. The calculator applies those factors with Decimal.js so
							chained conversions stay stable.
						</Trans>
					</p>
				)}
			</div>

			<AdSlot slot={ADSENSE_SLOTS.conversionDetails} className="my-2" />

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Worked example</Trans>
				</h3>

				<p className="text-muted-foreground">
					<Trans>
						Suppose you need to convert <strong>{exampleInput}</strong> {tFrom}{" "}
						into {tTo}. Using the same base-unit bridge as the calculator above,{" "}
						<strong>{exampleInput}</strong> {fromUnit.symbol} equals{" "}
						<strong>{exampleOutput}</strong> {toUnit.symbol}.
					</Trans>
				</p>

				<p className="text-sm text-muted-foreground">
					<Trans>
						Change the input in the converter to check homework, recipes,
						engineering estimates, or lab notes. Results update as you type and
						keep full decimal precision instead of binary floating-point drift.
					</Trans>
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Conversion Table</Trans>
				</h3>

				<div className="overflow-x-auto rounded-lg border">
					<table className="w-full max-w-full simple-scrollbar text-left text-sm">
						<thead className="bg-muted text-muted-foreground font-medium">
							<tr>
								<th className="px-4 py-2 border-b whitespace-nowrap">
									{tFrom}
								</th>
								<th className="px-4 py-2 border-b whitespace-nowrap">{tTo}</th>
							</tr>
						</thead>

						<tbody className="divide-y">
							{commonValues.map((val) => (
								<tr key={val} className="hover:bg-muted/50 transition-colors">
									<td className="px-4 py-2 whitespace-nowrap">
										{val} {fromUnit.symbol}
									</td>

									<td className="px-4 py-2 font-medium break-all">
										{convert(val)} {toUnit.symbol}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>
						When to use {tFrom} vs {tTo}
					</Trans>
				</h3>

				<p className="text-muted-foreground">
					<Trans>
						Choose <strong>{tFrom}</strong> when your source data, standard, or
						instrument already reports that unit. Switch to{" "}
						<strong>{tTo}</strong> when collaborating with teams, tools, or
						documents that expect a different convention for {tQuantity}.
					</Trans>
				</p>

				<p className="text-muted-foreground">
					<Trans>
						Mixing systems mid-project is a common source of error. Convert once
						at a clear boundary, label the unit on every number, and keep the
						rest of the workflow in a single system whenever possible.
					</Trans>
				</p>
			</div>

			{relatedGuides.length > 0 ? (
				<div className="flex flex-col gap-4">
					<h3 className="text-2xl font-semibold text-primary">
						<Trans>Learn more about {tQuantity}</Trans>
					</h3>

					<p className="text-sm text-muted-foreground">
						<Trans>
							These guides explain the systems, pitfalls, and everyday uses
							behind {tQuantity} conversions like {tFrom} to {tTo}.
						</Trans>
					</p>

					<ul className="grid gap-2 sm:grid-cols-2">
						{relatedGuides.map((guide) => (
							<li key={guide.slug}>
								<Link
									params={{ lang, slug: guide.slug }}
									search={defaultSearchParams}
									to="/$lang/guides/$slug"
									onClick={scrollPageToTop}
									className="link underline"
								>
									{i18n._(guide.title)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}

			{relatedUnits.length > 0 ? (
				<div className="flex flex-col gap-4">
					<h3 className="text-2xl font-semibold text-primary">
						<Trans>Related {tQuantity} conversions</Trans>
					</h3>

					<ul className="grid gap-2 sm:grid-cols-2">
						{relatedUnits.map((unitName) => {
							const label = i18n._(UnitNamesWithTranslations[unitName]);

							return (
								<li key={unitName}>
									<Link
										params={{
											lang,
											quantity,
											from,
											to: unitName,
										}}
										search={defaultSearchParams}
										to="/$lang/convert/$quantity/$from/to/$to"
										onClick={scrollPageToTop}
										className="link underline"
									>
										<Trans>
											{tFrom} to {label}
										</Trans>
									</Link>
								</li>
							);
						})}
					</ul>

					<p className="text-sm text-muted-foreground">
						<Link
							params={{ lang, quantity }}
							search={defaultSearchParams}
							to="/$lang/category/$quantity"
							onClick={scrollPageToTop}
							className="link underline"
						>
							<Trans>Browse all {tQuantity} units</Trans>
						</Link>
					</p>
				</div>
			) : null}

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>
						FAQ: {tFrom} to {tTo}
					</Trans>
				</h3>

				<details className="rounded-lg border bg-card p-4">
					<summary className="cursor-pointer font-medium">
						<Trans>
							How do I convert {tFrom} to {tTo} quickly?
						</Trans>
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						<Trans>
							Enter a value in the converter above. We convert through the{" "}
							{tQuantity} base unit with Decimal.js arithmetic, then display the
							result in {tTo}. For a reference, 1 {fromUnit.symbol} = {oneToOne}{" "}
							{toUnit.symbol}.
						</Trans>
					</p>
				</details>

				<details className="rounded-lg border bg-card p-4">
					<summary className="cursor-pointer font-medium">
						<Trans>
							Is this {tFrom} to {tTo} converter free?
						</Trans>
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						<Trans>
							Yes. Units Converters is free to use for students, professionals,
							and everyday tasks. Results are provided for informational
							purposes—always follow your industry standards for safety-critical
							work.
						</Trans>
					</p>
				</details>

				<details className="rounded-lg border bg-card p-4">
					<summary className="cursor-pointer font-medium">
						<Trans>Why might my calculator disagree slightly?</Trans>
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						<Trans>
							Many calculators use binary floating-point numbers that cannot
							represent every decimal exactly. Our converter uses
							arbitrary-precision decimals so long conversion chains stay
							stable. Small differences usually come from rounding display, not
							from a different physical factor.
						</Trans>
					</p>
				</details>

				<details className="rounded-lg border bg-card p-4">
					<summary className="cursor-pointer font-medium">
						<Trans>
							When should I prefer {tFrom} over {tTo}?
						</Trans>
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						<Trans>
							Use {tFrom} when your instruments, drawings, or local standards
							already speak that unit. Prefer {tTo} when your collaborators,
							regulations, or tools expect that convention for {tQuantity}.
							Convert at a clear boundary and label every number.
						</Trans>
					</p>
				</details>

				<details className="rounded-lg border bg-card p-4">
					<summary className="cursor-pointer font-medium">
						<Trans>
							Does converting {tFrom} to {tTo} lose precision?
						</Trans>
					</summary>
					<p className="mt-3 text-sm text-muted-foreground">
						<Trans>
							The physical relationship is exact for defined scale factors. What
							can change is how many digits you display. Units Converters keeps
							internal arithmetic precise; round only once for the output you
							need.
						</Trans>
					</p>
				</details>
			</div>

			<div className="flex flex-col gap-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Why use our {tQuantity} converter?</Trans>
				</h3>

				<p>
					<Trans>
						Our converter is designed for accuracy and speed. Unlike other tools
						that might have small rounding errors, we use specialized libraries
						to ensure every decimal point is correct. This is especially
						important for scientific calculations, engineering tasks, or any
						situation where precision is key.
					</Trans>
				</p>
			</div>
		</section>
	);
}
