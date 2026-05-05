import { createFileRoute } from "@tanstack/react-router";
import { Decimal } from "decimal.js";
import { startTransition } from "react";

import { Input } from "#/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
	QuantitySchema,
	type UnitDefinition,
	type UnitName,
	units,
} from "#/lib/units";

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

	const quantities = Object.entries(units[quantity]);
	const decimalFromValue = Decimal(fromValue);
	const decimalOne = Decimal(1);

	function handleChangeSearchParam(
		key: "from" | "to" | "quantity" | "fromValue",
		value: string,
	) {
		startTransition(() => {
			navigate({ search: (prev) => ({ ...prev, [key]: value }) });
		});
	}

	function handleChangeFromValue(e: React.ChangeEvent<HTMLInputElement>) {
		startTransition(() => {
			const nextStringValue = e.target.value.trim();

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
		});
	}

	function convert(to: UnitName) {
		const selectedQuantity = units[quantity];
		const fromUnit = selectedQuantity?.[from] as UnitDefinition;
		const toUnit = selectedQuantity?.[to] as UnitDefinition;

		if (!fromUnit || !toUnit || !fromValue) return "";

		// 1. Convert "From Unit" to "Base Unit" (e.g., Feet -> Meters)
		const valueInBaseUnit = fromUnit.def(decimalFromValue);

		// 2. Convert "Base Unit" to "To Unit" (e.g., Meters -> Kilometers)
		// We get the ratio by passing 1 to the 'toUnit' definition
		// and dividing the base value by that ratio.
		const toUnitRatio = toUnit.def(decimalOne);
		const result = valueInBaseUnit.div(toUnitRatio);

		// console.log({
		// 	valueInBaseUnit,
		// 	toUnitRatio,
		// 	fromValue,
		// 	result,
		// 	resultString: result.toString(),
		// 	formatedResult: formatter.format(result.toNumber()),
		// });

		return formatter.format(result.toNumber());
	}

	return (
		<>
			<header className="bg-accent text-accent-foreground h-16 flex text-center items-center justify-center">
				<h2 className="">Units Converter</h2>
			</header>

			<Tabs
				onValueChange={(value) => handleChangeSearchParam("quantity", value)}
				className="grid grid-rows-[auto_1fr] max-w-2xl w-full mx-auto"
				value={quantity}
			>
				<TabsList variant="line" className="h-16">
					{QuantitySchema.options.map((quantity) => (
						<TabsTrigger
							className="border-2 aria-selected:border-b-primary border-transparent rounded-none aria-selected:text-primary"
							value={quantity}
							key={quantity}
						>
							{quantity}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent
					className="p-4 grid grid-rows-[auto_1fr] gap-4"
					value={quantity}
					key={quantity}
				>
					<div className="grid grid-rows-2 h-fit">
						<div className="grid grid-cols-2 gap-7">
							<label htmlFor="from" className="font-bold">
								From
							</label>

							<label htmlFor="from" className="font-bold">
								To
							</label>
						</div>

						<div className="grid grid-cols-[auto_min-content_auto] gap-2 place-items-center">
							<Input
								onChange={handleChangeFromValue}
								className="w-full text-lg"
								defaultValue={fromValue}
								type="number"
								name="from"
								id="from"
							/>

							<span className="text-xl">=</span>

							<Input
								className="w-full appearance-none text-lg"
								value={convert(to)}
								type="text"
								name="to"
								id="to"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<select
							onChange={(e) => handleChangeSearchParam("from", e.target.value)}
							className="w-full simple-scrollbar overflow-x-hidden"
							size={quantities.length / 2}
							name="select-from"
							id="select-from"
							value={from}
						>
							{quantities.map(([unitName, { symbol }]) => (
								<option
									className="p-1 text-lg text-wrap"
									key={unitName}
									value={unitName}
								>
									{unitName}
									{symbol ? ` (${symbol})` : ""}
								</option>
							))}
						</select>

						<select
							onChange={(e) => handleChangeSearchParam("to", e.target.value)}
							className="w-full simple-scrollbar overflow-x-hidden"
							size={quantities.length / 2}
							name="select-to"
							id="select-to"
							value={to}
						>
							{quantities.map(([unitName, { symbol }]) => (
								<option
									className="p-1 text-lg text-wrap overflow-hidden"
									key={unitName}
									value={unitName}
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
				</TabsContent>
			</Tabs>
		</>
	);
}
