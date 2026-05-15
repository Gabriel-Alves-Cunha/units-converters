import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";

import { defaultSearchParams } from "#/lib/global-params-params";
import {
	type Quantity,
	type UnitName,
	UnitNamesWithTranslations,
} from "#/lib/units";
import { scrollPageToTop } from "#/lib/utils";

const commonConversions: Array<{
	quantity: Quantity;
	from: UnitName;
	to: UnitName;
}> = [
	// Length
	{
		quantity: "Length",
		from: "Centimetre",
		to: "Inch (International)",
	},
	{
		quantity: "Length",
		from: "Inch (International)",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Millimetre",
		to: "Inch (International)",
	},
	{
		quantity: "Length",
		from: "Meter",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Kilometre",
		to: "Mile (International)",
	},
	{
		quantity: "Length",
		from: "Centimetre",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Meter",
		to: "Yard (International)",
	},
	{
		quantity: "Length",
		from: "Inch (International)",
		to: "Centimetre",
	},
	{
		quantity: "Length",
		from: "Inch (International)",
		to: "Millimetre",
	},
	{
		quantity: "Length",
		from: "Foot (International)",
		to: "Meter",
	},
	{
		quantity: "Length",
		from: "Mile (International)",
		to: "Kilometre",
	},
	{
		quantity: "Length",
		from: "Foot (International)",
		to: "Centimetre",
	},
	{
		quantity: "Length",
		from: "Yard (International)",
		to: "Meter",
	},

	// Temperature
	{
		quantity: "Temperature",
		from: "Celsius",
		to: "Fahrenheit",
	},
	{
		quantity: "Temperature",
		from: "Celsius",
		to: "Kelvin",
	},
	{
		quantity: "Temperature",
		from: "Kelvin",
		to: "Celsius",
	},
];

export function CommonConversions() {
	const { lang } = useParams({ from: "/$lang" });
	const { i18n } = useLingui();

	return (
		<div className="flex flex-col gap-4 converter-content">
			<h3 className="text-2xl font-semibold">Common conversions</h3>

			<ul className="list-disc *:ml-5 grid grid-cols-2">
				{commonConversions.map((cv, index) => (
					<li key={index}>
						<Link
							to="/$lang/convert/$quantity/$from/to/$to"
							search={defaultSearchParams}
							className="link underline"
							onClick={scrollPageToTop}
							params={{
								...cv,
								lang,
							}}
						>
							<Trans>
								{i18n._(UnitNamesWithTranslations[cv.from])} to{" "}
								{i18n._(UnitNamesWithTranslations[cv.to])}
							</Trans>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
