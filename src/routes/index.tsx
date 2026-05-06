import { createFileRoute } from "@tanstack/react-router";
import { Decimal } from "decimal.js";
import { startTransition, useRef } from "react";
import { ArrowLeftRight } from "lucide-react";

import { Input } from "#/components/ui/input";
import {
	type Quantity,
	QuantitySchema,
	type UnitDefinition,
	type UnitName,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord } from "#/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const formatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 100,
	compactDisplay: "long",
	notation: "standard",
	useGrouping: true,
	style: "decimal",
});

function Home() {
	const { from, quantity, to, fromValue } = Route.useSearch();
	const navigate = Route.useNavigate();

	const timerToChangeFromValue =
		useRef<ReturnType<typeof setTimeout>>(undefined);

	const quantities = Object.entries(units[quantity]);
	const selectSize = Math.max(quantities.length / 2, 20);
	const decimalFromValue = Decimal(fromValue);
	const selectedQuantity = units[quantity];
	// @ts-ignore
	const symbol = selectedQuantity?.[to]?.symbol;

	function handleChangeSearchParam(
		key: "from" | "to" | "quantity" | "fromValue",
		value: string,
	) {
		startTransition(() => {
			navigate({
				search: (prev) => ({ ...prev, [key]: value }),
				replace: true,
			});
		});
	}

	function handleChangeFromValue(e: React.ChangeEvent<HTMLInputElement>) {
		clearTimeout(timerToChangeFromValue.current);

		timerToChangeFromValue.current = setTimeout(
			(nextValue) => {
				const nextStringValue = nextValue.trim();

				if (nextStringValue === "") {
					handleChangeSearchParam("fromValue", "1");

					return;
				}

				const decimalValue = Decimal(nextStringValue);

				if (!decimalValue.isFinite()) {
					handleChangeSearchParam("fromValue", "1");

					return;
				}

				handleChangeSearchParam("fromValue", nextStringValue);
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
				search: (prev) => ({
					...prev,
					quantity: nextQuantity,
					from: nextFirstUnit,
					to: nextFirstUnit,
				}),
				replace: true,
			});
		});
	}

	function handleSwitchFromAndTo() {
		startTransition(() => {
			navigate({
				search: (prev) => ({
					...prev,
					from: to,
					to: from,
				}),
				replace: true,
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

		return formatter.format(result.toNumber());
	}

	return (
		<>
			<header className="bg-accent text-accent-foreground h-16 flex text-center items-center justify-center">
				<h2 className="">Units Converter</h2>
			</header>

			<div className="w-svw h-svh grid converter-grid">
				<div className="flex flex-col gap-2 w-full converter-content">
					<section
						className="inline-flex w-fit items-center justify-center p-[3px] text-muted-foreground"
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

					<section
						className="p-4 grid grid-rows-[auto_1fr] gap-3"
						aria-label={`${quantity} panel`}
						id={quantity}
					>
						<div className="grid grid-rows-2 h-fit">
							<div className="grid grid-cols-2 gap-11">
								<label htmlFor="from" className="font-bold">
									From
								</label>

								<label htmlFor="from" className="font-bold">
									To
								</label>
							</div>

							<div className="grid grid-cols-[auto_min-content_auto] gap-4 place-items-center">
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

								<Input
									value={`${convert(to)}${symbol ? ` ${symbol}` : ""}`}
									className="w-full appearance-none text-lg"
									type="text"
									name="to"
									readOnly
									id="to"
								/>
							</div>
						</div>

						<div className="grid grid-cols-[1fr_min-content_1fr] gap-2">
							<select
								onChange={(e) =>
									handleChangeSearchParam(
										"from",
										e.target.value ||
											getFirstKeyOfRecord(selectedQuantity) ||
											"",
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
										{unitName}
										{symbol ? ` (${symbol})` : ""}
									</option>
								))}
							</select>

							<button
								className="rounded-full border border-black flex items-center justify-center size-8 button-hover"
								onClick={handleSwitchFromAndTo}
							>
								<ArrowLeftRight className="size-4" />
							</button>

							<select
								onChange={(e) =>
									handleChangeSearchParam(
										"to",
										e.target.value ||
											getFirstKeyOfRecord(selectedQuantity) ||
											"",
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
												{unitName}
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
					</section>
				</div>
			</div>
		</>
	);
}
