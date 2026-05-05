import { Decimal } from "decimal.js";
import z from "zod";

export type UnitDefinition = {
	symbol: string;
	def(input: Decimal): Decimal; // function to convert from this unit to the base unit (e.g., meter for length)
};

export const units = {
	Length: {
		"Planck Length": {
			symbol: "lₚ",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -35)); // relative to meter
			},
		},

		Yoctometre: {
			symbol: "ym",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -24)); // relative to meter
			},
		},

		Zeptometre: {
			symbol: "zm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -21)); // relative to meter
			},
		},

		Attometre: {
			symbol: "am",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -18)); // relative to meter
			},
		},

		Femtometre: {
			symbol: "fm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -15)); // relative to meter
			},
		},

		Picometre: {
			symbol: "pm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -12)); // relative to meter
			},
		},

		Bohr: {
			symbol: "a₀",
			def(input: Decimal) {
				return Decimal.mul(
					input,
					Decimal.mul(5.291_772_106_712_12, Decimal.pow(10, -11)),
				); // relative to meter
			},
		},

		Ångström: {
			symbol: "Å",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -10)); // relative to meter
			},
		},

		Nanometre: {
			symbol: "nm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -9)); // relative to meter
			},
		},

		Micrometre: {
			symbol: "µm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -6)); // relative to meter
			},
		},

		Millimetre: {
			symbol: "mm",
			def(input: Decimal) {
				return Decimal.mul(input, 0.001); // relative to meter
			},
		},

		Barleycorn: {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.div(254, 30_000)); // relative to meter
			},
		},

		Centimetre: {
			symbol: "cm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -2)); // relative to meter
			},
		},

		"Inch (International)": {
			symbol: "in",
			def(input: Decimal) {
				return Decimal.mul(input, 0.0254); // relative to meter
			},
		},

		Decimetre: {
			symbol: "dm",
			def(input: Decimal) {
				return Decimal.mul(input, 0.1); // relative to meter
			},
		},

		"Foot (International)": {
			symbol: "ft",
			def(input: Decimal) {
				return Decimal.mul(input, 0.3048); // relative to meter
			},
		},

		Cubit: {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 0.4572); // relative to meter
			},
		},

		"Yard (International)": {
			symbol: "yd",
			def(input: Decimal) {
				return Decimal.mul(input, 0.9144); // relative to meter
			},
		},

		Meter: {
			symbol: "m",
			def(input: Decimal) {
				return input; // base unit
			},
		},

		Ell: {
			symbol: "ell",
			def(input: Decimal) {
				return Decimal.mul(input, 1.143); // relative to meter
			},
		},

		Fathom: {
			symbol: "ftm",
			def(input: Decimal) {
				return Decimal.mul(input, 1.8288); // relative to meter
			},
		},

		Decametre: {
			symbol: "dam",
			def(input: Decimal) {
				return Decimal.mul(input, 10); // relative to meter
			},
		},

		Chain: {
			symbol: "ch",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.div(79_200, 3_937)); // relative to meter
			},
		},

		Hectometre: {
			symbol: "hm",
			def(input: Decimal) {
				return Decimal.mul(input, 100); // relative to meter
			},
		},

		"Cable Length (International)": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 185.2); // relative to meter
			},
		},

		Kilometre: {
			symbol: "km",
			def(input: Decimal) {
				return Decimal.mul(input, 1_000); // relative to meter
			},
		},

		"Mile (International)": {
			symbol: "mi",
			def(input: Decimal) {
				return Decimal.mul(input, 1609.344); // relative to meter
			},
		},

		"Nautical Mile (International)": {
			symbol: "nmi",
			def(input: Decimal) {
				return Decimal.mul(input, 1852); // relative to meter
			},
		},

		Megametre: {
			symbol: "Mm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 6)); // relative to meter
			},
		},

		Gigametre: {
			symbol: "Gm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 9)); // relative to meter
			},
		},

		"Light Second": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 299792458); // relative to meter
			},
		},

		"Light Minute": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 17987547480); // relative to meter
			},
		},

		"Astronomical Unit": {
			symbol: "au",
			def(input: Decimal) {
				return Decimal.mul(input, 149_597_870_700); // relative to meter
			},
		},

		"Light Hour": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 1079252848800); // relative to meter
			},
		},

		"Light Day": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 25902068371200); // relative to meter
			},
		},

		"Light Year": {
			symbol: "ly",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal("9460730472580800")); // relative to meter
			},
		},

		Parsec: {
			symbol: "pc",
			def(input: Decimal) {
				return Decimal.mul(
					input,
					Decimal("3.085677581").mul(Decimal.pow(10, 16)),
				); // relative to meter
			},
		},

		Zettametre: {
			symbol: "Zm",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 21)); // relative to meter
			},
		},

		Yottametre: {
			symbol: "Ym",
			def(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 24)); // relative to meter
			},
		},

		"Hubble Length": {
			symbol: "",
			def(input: Decimal) {
				return Decimal.mul(input, 1.322_4e26); // relative to meter
			},
		},
	} satisfies Record<LengthUnitName, UnitDefinition>,
	Temperature: {} satisfies Record<TemperatureUnitName, UnitDefinition>,
} as const;

export const LengthUnitNames = z.enum([
	"Meter",
	"Ångström",
	"Astronomical Unit",
	"Attometre",
	"Barleycorn",
	"Bohr",
	"Cable Length (International)",
	"Chain",
	"Cubit",
	"Ell",
	"Fathom",
	"Foot (International)",
	"Inch (International)",
	"Hubble Length",
	"Decimetre",
	"Decametre",
	"Gigametre",
	"Femtometre",
	"Centimetre",
	"Millimetre",
	"Hectometre",
	"Kilometre",
	"Light Day",
	"Light Hour",
	"Light Minute",
	"Light Second",
	"Light Year",
	"Megametre",
	"Mile (International)",
	"Micrometre",
	"Nanometre",
	"Nautical Mile (International)",
	"Parsec",
	"Picometre",
	"Yoctometre",
	"Zeptometre",
	"Zettametre",
	"Planck Length",
	"Yard (International)",
	"Yottametre",
]);
export type LengthUnitName = z.infer<typeof LengthUnitNames>;

export const TemperatureUnitNames = z.enum([]);
export type TemperatureUnitName = z.infer<typeof TemperatureUnitNames>;

export const UnitNameSchema = z.enum([
	...LengthUnitNames.options,
	...TemperatureUnitNames.options,
]);

export type UnitName = z.infer<typeof UnitNameSchema>;

export const QuantitySchema = z.enum(["Length"]);

export type Quantity = z.infer<typeof QuantitySchema>;
