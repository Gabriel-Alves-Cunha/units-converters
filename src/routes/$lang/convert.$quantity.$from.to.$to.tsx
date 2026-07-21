import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { createFileRoute, Link, useNavigate, type AnyRouteMatch } from "@tanstack/react-router";
import { Decimal } from "decimal.js";
import { Children, startTransition, useRef } from "react";
import { safeParse } from "valibot";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

import { Input, Output } from "#/components/ui/input";
import { AdSlot } from "#/components/ads/ad-slot";
import { ConversionDetails } from "#/components/conversion-details";
import { ADSENSE_SLOTS } from "#/lib/adsense";
import {
	defaultSearchParams,
	globalParamsSchema,
} from "#/lib/global-params-params";
import { isPopularConversion } from "#/lib/popular-conversions";
import {
	type Quantity,
	QuantitySchema,
	type UnitDefinition,
	type UnitName,
	UnitNamesWithTranslations,
	QuantitiesWithTranslations,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord, numberFormatter } from "#/lib/utils";
import {
	loadCatalog,
	loadDefaultCatalog,
} from "#/integrations/i18n/load-catalog";

export const Route = createFileRoute("/$lang/convert/$quantity/$from/to/$to")({
	component: Converter,
	// Keep unit switches instant — no pending flash on param-only navigations
	pendingMs: 10_000,
	async head({ params, match }) {
		// 1. Get the language from params (since /$lang is a parent)
		const lang = match.params.lang || "en";

		// 2. SAFETY CHECK: If Lingui hasn't activated yet, force it.
		// This prevents the "No locale set" error during hydration.
		if (!i18n.locale) {
			await loadCatalog(lang, i18n).catch(() => {
				loadDefaultCatalog(i18n);
			});
		}

		const { from, to, quantity } = params;
		const quantityValue = quantity as Quantity;
		const fromValue = from as UnitName;
		const toValue = to as UnitName;

		const tQuantity = i18n._(
			QuantitiesWithTranslations[quantityValue] || quantity,
		);
		const tFrom = i18n._(UnitNamesWithTranslations[fromValue] || from);
		const tTo = i18n._(UnitNamesWithTranslations[toValue] || to);

		const title = i18n._(
			msg`Convert ${tFrom} to ${tTo} | Accurate ${tQuantity} Converter`,
		);
		const description = i18n._(
			msg`Easily convert ${tFrom} to ${tTo} with our high-precision ${tQuantity} converter. Free online tool for students and engineers.`,
		);

		const isPopular = isPopularConversion(quantityValue, fromValue, toValue);

		const faqEntities = [
			{
				"@type": "Question",
				name: i18n._(msg`How do I convert ${tFrom} to ${tTo} quickly?`),
				acceptedAnswer: {
					"@type": "Answer",
					text: i18n._(
						msg`Enter a value in the converter. We convert through the ${tQuantity} base unit with Decimal.js arithmetic, then display the result in ${tTo}.`,
					),
				},
			},
			{
				"@type": "Question",
				name: i18n._(msg`Is this ${tFrom} to ${tTo} converter free?`),
				acceptedAnswer: {
					"@type": "Answer",
					text: i18n._(
						msg`Yes. Units Converters is free to use for students, professionals, and everyday tasks. Results are for informational purposes.`,
					),
				},
			},
			{
				"@type": "Question",
				name: i18n._(msg`Why might my calculator disagree slightly?`),
				acceptedAnswer: {
					"@type": "Answer",
					text: i18n._(
						msg`Many calculators use binary floating-point numbers. Our converter uses arbitrary-precision decimals so long conversion chains stay stable.`,
					),
				},
			},
		];

		const head = {
			meta: [
				{ title },
				{ name: "description", content: description },
				...(isPopular ? [] : [{ name: "robots", content: "noindex, follow" }]),
				// Open Graph
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:type", content: "website" },
				// Twitter
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },

			],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: i18n._(msg`${tQuantity} Converter`),
						applicationCategory: "EducationalApplication",
						operatingSystem: "Web",
						description: description,
						featureList: [
							i18n._(msg`High-precision conversions`),
							i18n._(msg`Real-time results`),
							i18n._(msg`Scientific grade units`),
						],
						offers: {
							"@type": "Offer",
							price: "0",
						},
					}),
				},
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: faqEntities,
					}),
				},

			] satisfies AnyRouteMatch["headScripts"],
		};

		return head;
	},
	parseParams(params) {
		const result = safeParse(globalParamsSchema, params);

		if (!result.success) {
			console.error({ result, params });

			throw new Error("Invalid Units", { cause: result.issues });
		}

		return result.output;
	},
	errorComponent: () => (
		<div className="p-4 text-center converter-content">
			<h2 className="text-xl font-bold">
				<Trans>Unit not found</Trans>
			</h2>

			<p>
				<Trans>
					We couldn't find those specific units. Try our default converter.
				</Trans>
			</p>

			<Link search={defaultSearchParams} className="link" to="/">
				<Trans>Back to Home</Trans>
			</Link>
		</div>
	),
});

function Converter() {
	const { fromValue } = Route.useSearch();
	const rawParams = Route.useParams();
	const navigate = useNavigate();
	const { i18n } = useLingui();

	const timerToChangeFromValue =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	const result = safeParse(globalParamsSchema, rawParams);

	if (!result.success) {
		throw new Error("Invalid Units");
	}

	const { from, to, quantity } = result.output;

	const quantities = Object.entries(units[quantity]);
	const selectSize = Math.max(quantities.length / 2, 10);

	const decimalFromValue = (() => {
		try {
			// Handle trailing slashes that might be added by some crawlers/prerenderers
			const sanitizedValue = String(fromValue).replace(/\/$/, "");

			const d = Decimal(sanitizedValue);

			if (d.isNaN() || !d.isFinite()) {
				return Decimal(1);
			}

			return d;
		} catch {
			return Decimal(1);
		}
	})();

	const selectedQuantity = units[quantity];
	// @ts-ignore
	const symbol = selectedQuantity?.[to]?.symbol;

	function handleChangeParams(key: "from" | "to" | "quantity", value: string) {
		startTransition(() => {
			navigate({
				to: `/$lang/convert/$quantity/$from/to/$to`,
				search: () => ({
					fromValue,
				}),
				params: (prev) => ({
					...(prev as Required<typeof prev>),
					[key]: value,
				}),
				resetScroll: false,
			});
		});
	}

	function handleChangeSearchParams(fromValue: string) {
		startTransition(() => {
			navigate({
				to: `/$lang/convert/$quantity/$from/to/$to`,
				params: (prev) => ({
					...(prev as Required<typeof prev>),
				}),
				search: () => ({
					fromValue,
				}),
				resetScroll: false,
			});
		});
	}

	function handleChangeFromValue(e: React.ChangeEvent<HTMLInputElement>) {
		clearTimeout(timerToChangeFromValue.current);

		timerToChangeFromValue.current = setTimeout(
			(nextValue) => {
				const nextStringValue = nextValue.trim();

				if (nextStringValue === "") {
					handleChangeSearchParams("1");

					return;
				}

				const decimalValue = Decimal(nextStringValue);

				if (!decimalValue.isFinite()) {
					handleChangeSearchParams("1");

					return;
				}

				handleChangeSearchParams(nextStringValue);
			},
			200,
			e.target.value,
		);
	}

	function handleChangeQuantity(nextQuantity: Quantity) {
		if (nextQuantity === quantity) return;

		const nextSelectedQuantity = units[nextQuantity];

		if (!nextSelectedQuantity) return;

		const nextFirstUnit = getFirstKeyOfRecord(nextSelectedQuantity);

		if (!nextFirstUnit) return;

		startTransition(() => {
			navigate({
				to: `/$lang/convert/$quantity/$from/to/$to`,
				search: () => ({
					fromValue,
				}),
				params: (prev) => ({
					...(prev as Required<typeof prev>),
					quantity: nextQuantity,
					from: nextFirstUnit,
					to: nextFirstUnit,
				}),
				resetScroll: false,
			});
		});
	}

	function convert(to: UnitName) {
		// @ts-ignore
		const fromUnit = selectedQuantity?.[from] as UnitDefinition;
		// @ts-ignore
		const toUnit = selectedQuantity?.[to] as UnitDefinition;

		if (!fromUnit || !toUnit || !fromValue) return "";

		// 1. Convert "From Unit" to the absolute Base Unit (e.g., Celsius -> Kelvin)
		const valueInBaseUnit = fromUnit.toBaseUnit(decimalFromValue);

		// 2. Convert "Base Unit" to the "Target Unit" (e.g., Kelvin -> Fahrenheit)
		const result = toUnit.fromBaseUnit(valueInBaseUnit);

		return numberFormatter.format(result.toNumber());
	}

	return (
		<>
			<div className="flex flex-col min-h-svh gap-2 mt-4 w-full converter-content">
				<section
					className="flex w-fit items-center justify-center mx-auto p-1 text-muted-foreground"
					aria-label={i18n._(msg`Quantities tabs`)}
				>
					{QuantitySchema.options.map((localQuantity) => (
						<div className="relative" key={localQuantity}>
							<input
								onChange={() => handleChangeQuantity(localQuantity)}
								checked={localQuantity === quantity}
								name={localQuantity}
								id={localQuantity}
								className="peer"
								type="radio"
								hidden
							/>

							<label
								className="relative flex items-center justify-center px-3 py-1 text-sm font-medium peer-checked:border-b border-primary peer-checked:text-foreground cursor-pointer button-hover hover:text-primary"
								htmlFor={localQuantity}
							>
								{i18n._(QuantitiesWithTranslations[localQuantity])}
							</label>
						</div>
					))}
				</section>

				<form
					aria-label={i18n._(
						msg`${i18n._(QuantitiesWithTranslations[quantity])} panel`,
					)}
					className="grid grid-rows-[auto_1fr] gap-3"
					id={quantity}
				>
					<div className="grid grid-rows-[auto_1fr] h-fit">
						<div className="grid grid-cols-2 gap-11">
							<label htmlFor="from" className="font-bold">
								<Trans>From</Trans>
							</label>

							<label htmlFor="from" className="font-bold">
								<Trans>To</Trans>
							</label>
						</div>

						<div className="grid grid-cols-[1fr_min-content_1fr] gap-4 place-items-center">
							<Input
								onChange={handleChangeFromValue}
								className="w-full text-lg"
								defaultValue={fromValue}
								placeholder="1"
								type="number"
								name="from"
								id="from"
							/>

							<span className="text-xl">=</span>

							<Output
								className="w-full appearance-none text-lg"
								htmlFor="from"
								name="to"
								id="to"
							>
								{`${convert(to)}${symbol ? ` ${symbol}` : ""}`}
							</Output>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<select
							onChange={(e) =>
								handleChangeParams(
									"from",
									e.target.value || getFirstKeyOfRecord(selectedQuantity) || "",
								)
							}
							className="w-full simple-scrollbar overflow-x-hidden"
							name="select-from"
							size={selectSize}
							id="select-from"
							value={from}
						>
							{quantities.map(([unitName, { symbol }]) => (
								<option
									className="p-1 text-lg text-wrap not-last:border-b"
									value={unitName}
									key={unitName}
								>
									{i18n._(UnitNamesWithTranslations[unitName as UnitName])}

									{symbol ? ` (${symbol})` : ""}
								</option>
							))}
						</select>

						<select
							onChange={(e) =>
								handleChangeParams(
									"to",
									e.target.value || getFirstKeyOfRecord(selectedQuantity) || "",
								)
							}
							className="w-full simple-scrollbar overflow-x-hidden"
							size={selectSize}
							name="select-to"
							id="select-to"
							value={to}
						>
							{quantities.map(([unitName, { symbol }]) => (
								<option
									className="p-1 text-lg text-wrap not-last:border-b"
									value={unitName}
									key={unitName}
								>
									<div className="grid grid-cols-[max-content_auto] gap-4 items-center">
										<span className="text-wrap">
											{i18n._(UnitNamesWithTranslations[unitName as UnitName])}
											{symbol ? ` (${symbol})` : ""}
										</span>

										<span className="text-xs opacity-70 max-w-full truncate">
											{convert(unitName as UnitName)}
										</span>
									</div>
								</option>
							))}
						</select>
					</div>
				</form>

				<AdSlot slot={ADSENSE_SLOTS.convert} className="mt-4" />
			</div>

			<ConversionDetails quantity={quantity} from={from} to={to} />
		</>
	);
}
