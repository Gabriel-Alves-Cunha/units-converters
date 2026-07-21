import type { Quantity, UnitName } from "#/lib/units";

export type ConversionPair = {
	quantity: Quantity;
	from: UnitName;
	to: UnitName;
};

/**
 * High-value conversion pairs that should be indexed and included in sitemaps.
 * Long-tail pairs remain usable but get `noindex,follow`.
 */
export const POPULAR_CONVERSIONS: ConversionPair[] = [
	// Length
	{
		quantity: "Length",
		from: "Centimetre",
		to: "Inch (International)",
	},
	{
		quantity: "Length",
		from: "Inch (International)",
		to: "Centimetre",
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
		from: "Inch (International)",
		to: "Millimetre",
	},
	{
		quantity: "Length",
		from: "Meter",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Foot (International)",
		to: "Meter",
	},
	{
		quantity: "Length",
		from: "Kilometre",
		to: "Mile (International)",
	},
	{
		quantity: "Length",
		from: "Mile (International)",
		to: "Kilometre",
	},
	{
		quantity: "Length",
		from: "Centimetre",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Foot (International)",
		to: "Centimetre",
	},
	{
		quantity: "Length",
		from: "Meter",
		to: "Yard (International)",
	},
	{
		quantity: "Length",
		from: "Yard (International)",
		to: "Meter",
	},
	{
		quantity: "Length",
		from: "Meter",
		to: "Kilometre",
	},
	{
		quantity: "Length",
		from: "Foot (International)",
		to: "Inch (International)",
	},
	{
		quantity: "Length",
		from: "Yard (International)",
		to: "Foot (International)",
	},
	{
		quantity: "Length",
		from: "Nanometre",
		to: "Meter",
	},
	{
		quantity: "Length",
		from: "Light Year",
		to: "Kilometre",
	},

	// Temperature
	{
		quantity: "Temperature",
		from: "Celsius",
		to: "Fahrenheit",
	},
	{
		quantity: "Temperature",
		from: "Fahrenheit",
		to: "Celsius",
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
	{
		quantity: "Temperature",
		from: "Fahrenheit",
		to: "Kelvin",
	},
	{
		quantity: "Temperature",
		from: "Kelvin",
		to: "Fahrenheit",
	},

	// Area
	{
		quantity: "Area",
		from: "Square Metre",
		to: "Square Foot",
	},
	{
		quantity: "Area",
		from: "Square Foot",
		to: "Square Metre",
	},
	{
		quantity: "Area",
		from: "Acre",
		to: "Hectare",
	},
	{
		quantity: "Area",
		from: "Hectare",
		to: "Acre",
	},
	{
		quantity: "Area",
		from: "Square Kilometre",
		to: "Square Mile",
	},
	{
		quantity: "Area",
		from: "Square Mile",
		to: "Square Kilometre",
	},
	{
		quantity: "Area",
		from: "Square Inch",
		to: "Square Centimetre",
	},
	{
		quantity: "Area",
		from: "Square Centimetre",
		to: "Square Inch",
	},
	{
		quantity: "Area",
		from: "Square Metre",
		to: "Hectare",
	},
	{
		quantity: "Area",
		from: "Acre",
		to: "Square Metre",
	},

	// Volume
	{
		quantity: "Volume",
		from: "Litre",
		to: "Cubic Metre",
	},
	{
		quantity: "Volume",
		from: "Cubic Metre",
		to: "Litre",
	},
	{
		quantity: "Volume",
		from: "Millimetre",
		to: "Litre",
	},
	{
		quantity: "Volume",
		from: "Litre",
		to: "Millimetre",
	},
	{
		quantity: "Volume",
		from: "Cup",
		to: "Millimetre",
	},
	{
		quantity: "Volume",
		from: "Millimetre",
		to: "Cup",
	},
	{
		quantity: "Volume",
		from: "Cubic Foot",
		to: "Litre",
	},
	{
		quantity: "Volume",
		from: "Litre",
		to: "Cubic Foot",
	},
	{
		quantity: "Volume",
		from: "Tablespoon (Metric)",
		to: "Teaspoon (Metric)",
	},
	{
		quantity: "Volume",
		from: "Teaspoon (Metric)",
		to: "Tablespoon (Metric)",
	},
	{
		quantity: "Volume",
		from: "Hectolitre",
		to: "Litre",
	},
	{
		quantity: "Volume",
		from: "Litre",
		to: "Hectolitre",
	},

	// Weight
	{
		quantity: "Weight",
		from: "Kilogram",
		to: "Pound (Avoirdupois)",
	},
	{
		quantity: "Weight",
		from: "Pound (Avoirdupois)",
		to: "Kilogram",
	},
	{
		quantity: "Weight",
		from: "Gram",
		to: "Ounce (Avoirdupois)",
	},
	{
		quantity: "Weight",
		from: "Ounce (Avoirdupois)",
		to: "Gram",
	},
	{
		quantity: "Weight",
		from: "Kilogram",
		to: "Stone",
	},
	{
		quantity: "Weight",
		from: "Stone",
		to: "Kilogram",
	},
	{
		quantity: "Weight",
		from: "Tonne (Metric)",
		to: "Pound (Avoirdupois)",
	},
	{
		quantity: "Weight",
		from: "Pound (Avoirdupois)",
		to: "Tonne (Metric)",
	},
	{
		quantity: "Weight",
		from: "Gram",
		to: "Kilogram",
	},
	{
		quantity: "Weight",
		from: "Kilogram",
		to: "Gram",
	},
	{
		quantity: "Weight",
		from: "Milligram",
		to: "Gram",
	},
	{
		quantity: "Weight",
		from: "Gram",
		to: "Milligram",
	},

	// Speed
	{
		quantity: "Speed",
		from: "Kilometre per hour",
		to: "Mile per hour",
	},
	{
		quantity: "Speed",
		from: "Mile per hour",
		to: "Kilometre per hour",
	},
	{
		quantity: "Speed",
		from: "Metre per second",
		to: "Kilometre per hour",
	},
	{
		quantity: "Speed",
		from: "Kilometre per hour",
		to: "Metre per second",
	},
	{
		quantity: "Speed",
		from: "Mile per hour",
		to: "Foot per second",
	},
	{
		quantity: "Speed",
		from: "Foot per second",
		to: "Mile per hour",
	},
	{
		quantity: "Speed",
		from: "Knot",
		to: "Kilometre per hour",
	},
	{
		quantity: "Speed",
		from: "Kilometre per hour",
		to: "Knot",
	},
	{
		quantity: "Speed",
		from: "Metre per second",
		to: "Mile per hour",
	},
	{
		quantity: "Speed",
		from: "Mile per hour",
		to: "Metre per second",
	},

	// Time
	{
		quantity: "Time",
		from: "Minute",
		to: "Second",
	},
	{
		quantity: "Time",
		from: "Second",
		to: "Minute",
	},
	{
		quantity: "Time",
		from: "Hour",
		to: "Minute",
	},
	{
		quantity: "Time",
		from: "Minute",
		to: "Hour",
	},
	{
		quantity: "Time",
		from: "Day",
		to: "Hour",
	},
	{
		quantity: "Time",
		from: "Hour",
		to: "Day",
	},
	{
		quantity: "Time",
		from: "Week",
		to: "Day",
	},
	{
		quantity: "Time",
		from: "Day",
		to: "Week",
	},
	{
		quantity: "Time",
		from: "Year (Julian)",
		to: "Day",
	},
	{
		quantity: "Time",
		from: "Day",
		to: "Year (Julian)",
	},
	{
		quantity: "Time",
		from: "Hour",
		to: "Second",
	},
	{
		quantity: "Time",
		from: "Second",
		to: "Hour",
	},
];

function pairKey(quantity: Quantity, from: UnitName, to: UnitName): string {
	return `${quantity}|${from}|${to}`;
}

const popularPairKeys = new Set(
	POPULAR_CONVERSIONS.map((pair) => pairKey(pair.quantity, pair.from, pair.to)),
);

export function isPopularConversion(
	quantity: Quantity,
	from: UnitName,
	to: UnitName,
): boolean {
	return popularPairKeys.has(pairKey(quantity, from, to));
}

export function getPopularConversionsForQuantity(
	quantity: Quantity,
): ConversionPair[] {
	return POPULAR_CONVERSIONS.filter((pair) => pair.quantity === quantity);
}
