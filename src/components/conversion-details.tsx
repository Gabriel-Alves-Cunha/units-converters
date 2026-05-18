import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Decimal } from "decimal.js";

import {
	type Quantity,
	type UnitName,
	UnitNamesWithTranslations,
	units,
	type UnitDefinition,
} from "#/lib/units";
import { numberFormatter } from "#/lib/utils";

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

	const selectedQuantity = units[quantity];
	// @ts-ignore
	const fromUnit = selectedQuantity?.[from] as UnitDefinition;
	// @ts-ignore
	const toUnit = selectedQuantity?.[to] as UnitDefinition;

	if (!fromUnit || !toUnit) return null;

	const tFrom = i18n._(UnitNamesWithTranslations[from]);
	const tTo = i18n._(UnitNamesWithTranslations[to]);

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
	const commonValues = [1, 5, 10, 25, 50, 100, 500, 1000];

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
								<Trans>A unit of {quantity.toLowerCase()}.</Trans>
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
								<Trans>A unit of {quantity.toLowerCase()}.</Trans>
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
					<Trans>Why use our {quantity} converter?</Trans>
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
