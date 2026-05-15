import { Trans } from "@lingui/react/macro";
import { Trans as RuntimeTrans } from "@lingui/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Decimal } from "decimal.js";
import { startTransition, useRef } from "react";
import { safeParse } from "valibot";

import { Input, Output } from "#/components/ui/input";
import {
	defaultSearchParams,
	globalParamsSchema,
} from "#/lib/global-params-params";
import {
	type Quantity,
	QuantitySchema,
	type UnitDefinition,
	type UnitName,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord, numberFormatter } from "#/lib/utils";

export const Route = createFileRoute("/$lang/convert/$quantity/$from/to/$to")({
	component: Converter,
	head({ params }) {
		const { from, to, quantity } = params;
		const title = `Convert ${from} to ${to} | Accurate ${quantity} Converter`;
		const description = `Easily convert ${from} to ${to} with our high-precision ${quantity} converter. Free online tool for students and engineers.`;

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
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
						name: `${quantity} Converter`,
						applicationCategory: "EducationalApplication",
						operatingSystem: "Web",
						description: description,
						featureList: [
							"High-precision conversions",
							"Real-time results",
							"Scientific grade units",
						],
						offers: {
							"@type": "Offer",
							price: "0",
						},
					}),
				},
			],
		};
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

	const timerToChangeFromValue =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	const result = safeParse(globalParamsSchema, rawParams);

	if (!result.success) {
		throw new Error("Invalid Units");
	}

	const { from, to, quantity } = result.output;

	const quantities = Object.entries(units[quantity]);
	const selectSize = Math.max(quantities.length / 2, 20);
	const decimalFromValue = Decimal(fromValue);
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
		<div className="flex flex-col h-svh gap-2 mt-4 w-full converter-content">
			<section
				className="flex w-fit items-center justify-center p-[3px] mx-auto text-muted-foreground"
				aria-label="Quantities tabs"
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
							{localQuantity}
						</label>
					</div>
				))}
			</section>

			<form
				className="p-4 grid grid-rows-[auto_1fr] gap-3"
				aria-label={`${quantity} panel`}
				id={quantity}
			>
				<div className="grid grid-rows-2 h-fit">
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
								className="p-1 text-lg text-wrap"
								value={unitName}
								key={unitName}
							>
								{/* {unitName} */}
								<RuntimeTrans id={unitName} />

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
								className="p-1 text-lg text-wrap overflow-hidden"
								value={unitName}
								key={unitName}
							>
								<div className="grid grid-cols-[max-content_auto] gap-4 items-center">
									<span className="">
										{/* {unitName} */}
										<RuntimeTrans id={unitName} />
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
		</div>
	);
}
