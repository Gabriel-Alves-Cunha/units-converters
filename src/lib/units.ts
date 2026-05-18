import { Decimal } from "decimal.js";
import * as v from "valibot";
import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

export type UnitDefinition = {
	symbol: string;
	fromBaseUnit(input: Decimal): Decimal; // function to convert from the base unit to this unit
	toBaseUnit(input: Decimal): Decimal; // function to convert from this unit to the base unit (e.g., meter for length)
	description?: MessageDescriptor;
	formula?: string;
};

export const units = {
	Length: {
		"Planck Length": {
			symbol: "lₚ",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -35));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 35));
			},
		},

		Yoctometre: {
			symbol: "ym",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -24));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 24));
			},
		},

		Zeptometre: {
			symbol: "zm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -21));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 21));
			},
		},

		Attometre: {
			symbol: "am",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 18));
			},
		},

		Femtometre: {
			symbol: "fm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -15));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 15));
			},
		},

		Picometre: {
			symbol: "pm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -12));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 12));
			},
		},

		Bohr: {
			symbol: "a₀",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(
					input,
					Decimal.mul(5.291_772_106_712_12, Decimal.pow(10, -11)),
				);
			},
			fromBaseUnit(input) {
				return Decimal.div(
					input,
					Decimal.mul(5.291_772_106_712_12, Decimal.pow(10, -11)),
				);
			},
		},

		Ångström: {
			symbol: "Å",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -10));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 10));
			},
		},

		Nanometre: {
			symbol: "nm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -9));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 9));
			},
		},

		Micrometre: {
			symbol: "µm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -6));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 6));
			},
		},

		Millimetre: {
			symbol: "mm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.001);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, 1_000);
			},
		},

		Barleycorn: {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.div(254, 30_000));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(30_000, 254));
			},
		},

		Centimetre: {
			symbol: "cm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -2));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 2));
			},
		},

		"Inch (International)": {
			symbol: "in",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.0254);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.0254));
			},
		},

		Decimetre: {
			symbol: "dm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.1);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, 10);
			},
		},

		"Foot (International)": {
			symbol: "ft",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.3048);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.3048));
			},
		},

		Cubit: {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.4572);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.4572));
			},
		},

		"Yard (International)": {
			symbol: "yd",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.9144);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.9144));
			},
		},

		Meter: {
			symbol: "m",
			toBaseUnit(input: Decimal) {
				return input; // base unit
			},
			fromBaseUnit(input) {
				return input; // base unit
			},
			description: msg`The base unit of length in the International System of Units (SI).`,
		},

		Ell: {
			symbol: "ell",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1.143);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1.143));
			},
		},

		Fathom: {
			symbol: "ftm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1.8288);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1.8288));
			},
		},

		Decametre: {
			symbol: "dam",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 10);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 10));
			},
		},

		Chain: {
			symbol: "ch",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.div(79_200, 3_937));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(3_937, 79_200));
			},
		},

		Hectometre: {
			symbol: "hm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 100);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 100));
			},
		},

		"Cable Length (International)": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 185.2);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 185.2));
			},
		},

		Kilometre: {
			symbol: "km",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_000);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_000));
			},
		},

		"Mile (International)": {
			symbol: "mi",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_609.344);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_609.344));
			},
		},

		"Nautical Mile (International)": {
			symbol: "nmi",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_852);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_852));
			},
		},

		Megametre: {
			symbol: "Mm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 6));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 6)));
			},
		},

		Gigametre: {
			symbol: "Gm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 9));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 9)));
			},
		},

		"Light Second": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 299792458);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 299792458));
			},
		},

		"Light Minute": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 17987547480);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 17987547480));
			},
		},

		"Astronomical Unit": {
			symbol: "au",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 149_597_870_700);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 149_597_870_700));
			},
		},

		"Light Hour": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1079252848800);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1079252848800));
			},
		},

		"Light Day": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 25902068371200);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 25902068371200));
			},
		},

		"Light Year": {
			symbol: "ly",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal("9460730472580800"));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal("9460730472580800")));
			},
		},

		Parsec: {
			symbol: "pc",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(
					input,
					Decimal("3.085677581").mul(Decimal.pow(10, 16)),
				);
			},
			fromBaseUnit(input) {
				return Decimal.mul(
					input,
					Decimal.div(1, Decimal("3.085677581").mul(Decimal.pow(10, 16))),
				);
			},
		},

		Zettametre: {
			symbol: "Zm",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 21));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 21)));
			},
		},

		Yottametre: {
			symbol: "Ym",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 24));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 24)));
			},
		},

		"Hubble Length": {
			symbol: "",
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1.322_4e26);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1.322_4e26));
			},
		},
	} satisfies Record<keyof typeof LengthUnitNameEnum, UnitDefinition>,
	Temperature: {
		Celsius: {
			symbol: "°C",
			toBaseUnit(input: Decimal) {
				return input.add(273.15); // Convert Celsius to Kelvin (base unit)
			},
			fromBaseUnit(input: Decimal) {
				return input.sub(273.15); // Convert Kelvin to Celsius
			},
			description: msg`A scale and unit of measurement for temperature used by most of the world.`,
			formula: "K = °C + 273.15",
		},

		Fahrenheit: {
			symbol: "°F",
			toBaseUnit(input: Decimal) {
				return input.add(459.67).mul(5).div(9); // Convert Fahrenheit to Kelvin (base unit)
			},
			fromBaseUnit(input: Decimal) {
				return input.mul(9).div(5).sub(459.67); // Convert Kelvin to Fahrenheit
			},
			description: msg`A temperature scale used primarily in the United States.`,
			formula: "K = (°F + 459.67) × 5/9",
		},

		Kelvin: {
			symbol: "K",
			toBaseUnit(input: Decimal) {
				return input; // Base unit
			},
			fromBaseUnit(input: Decimal) {
				return input; // Base unit
			},
		},

		Newton: {
			symbol: "°N",
			toBaseUnit(input: Decimal) {
				return input.mul(100).div(33).add(273.15); // Convert Newton to Kelvin (base unit)
			},
			fromBaseUnit(input: Decimal) {
				return input.sub(273.15).mul(33).div(100); // Convert Kelvin to Newton
			},
		},
	} satisfies Record<keyof typeof TemperatureUnitNameEnum, UnitDefinition>,
	Area: {
		Barn: {
			symbol: "b",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -28));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -28));
			},
		},

		"Square Nanometre": {
			symbol: "nm²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -18));
			},
		},

		"Square Micrometre": {
			symbol: "μm²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -12));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -12));
			},
		},

		"Square Millimetre": {
			symbol: "mm²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 6));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 6));
			},
		},

		"Square Centimetre": {
			symbol: "cm²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 4));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 4));
			},
		},

		"Square Inch": {
			symbol: "sq in",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00064516"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00064516"));
			},
		},

		"Square Decimetre": {
			symbol: "dm²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 2));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 2));
			},
		},

		"Square Foot": {
			symbol: "sq ft",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.09290304"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.09290304"));
			},
		},

		"Square Yard": {
			symbol: "sq yd",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.83612736"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.83612736"));
			},
		},

		"Square Metre": {
			symbol: "m²",
			toBaseUnit(input: Decimal) {
				return input; // base unit
			},
			fromBaseUnit(input: Decimal) {
				return input; // base unit
			},
		},

		Are: {
			symbol: "a",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal(100));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal(100));
			},
		},

		Acre: {
			symbol: "ac",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("4046.8564224"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("4046.8564224"));
			},
		},

		Hectare: {
			symbol: "ha",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("10000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("10000"));
			},
		},

		"Square Kilometre": {
			symbol: "km²",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 6));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 6));
			},
		},

		"Square Mile": {
			symbol: "sq mi",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("2.589988110336").mul(Decimal.pow(10, 6)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.589988110336").mul(Decimal.pow(10, 6)));
			},
		},

		Board: {
			symbol: "bd",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00774192"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00774192"));
			},
		},

		"Circular Inch": {
			symbol: "circ in",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("5.06707479097498").mul(Decimal.pow(10, -4)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("5.06707479097498").mul(Decimal.pow(10, -4)));
			},
		},

		"Circular Mil": {
			symbol: "circ mil",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("5.06707479097498").mul(Decimal.pow(10, -10)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("5.06707479097498").mul(Decimal.pow(10, -10)));
			},
		},
	} satisfies Record<keyof typeof AreaUnitNameEnum, UnitDefinition>,
	Volume: {
		"Cubic Nanometre": {
			symbol: "nm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -27));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -27));
			},
		},

		"Cubic Micrometre": {
			symbol: "μm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -18));
			},
		},

		Picolitre: {
			symbol: "pL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -12));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -12));
			},
		},

		Lambda: {
			symbol: "λ",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -9));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -9));
			},
		},

		Microlitre: {
			symbol: "μL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000000001"));
			},
		},

		"Cubic Millimetre": {
			symbol: "mm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000000001"));
			},
		},

		Drop: {
			symbol: "gtt (metric)",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00000005"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00000005"));
			},
		},

		Millimetre: {
			symbol: "mL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000001"));
			},
		},

		"Cubic Centimetre": {
			symbol: "cm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000001"));
			},
		},

		Centilitre: {
			symbol: "cL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00001"));
			},
		},

		Decilitre: {
			symbol: "dL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.0001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.0001"));
			},
		},

		"Teaspoon (Metric)": {
			symbol: "tsp (metric)",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("5").mul(Decimal.pow(10, -6)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("5").mul(Decimal.pow(10, -6)));
			},
		},

		"Acre Foot": {
			symbol: "ac ft",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1233.48183754752"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1233.48183754752"));
			},
		},

		"Acre Inch": {
			symbol: "ac in",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("102.79015312896"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("102.79015312896"));
			},
		},

		"Board Foot": {
			symbol: "bd ft",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("2.359737216").mul(Decimal.pow(10, -3)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.359737216").mul(Decimal.pow(10, -3)));
			},
		},

		"Cubic Decimetre": {
			symbol: "dm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.001"));
			},
		},

		"Cubic Dekametre": {
			symbol: "dam³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000"));
			},
		},

		"Cubic Fathom": {
			symbol: "cu fm",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("6.116438863872"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("6.116438863872"));
			},
		},

		"Cubic Foot": {
			symbol: "cu ft",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.028316846592"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.028316846592"));
			},
		},

		"Cubic Hectometre": {
			symbol: "hm³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000000"));
			},
		},

		"Cubic Inch": {
			symbol: "cu in",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1.6387064").mul(Decimal.pow(10, -5)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1.6387064").mul(Decimal.pow(10, -5)));
			},
		},

		"Cubic Kilometre": {
			symbol: "km³",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000000000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000000000"));
			},
		},

		"Cubic Metre": {
			symbol: "m³",
			toBaseUnit(input: Decimal) {
				return input;
			},
			fromBaseUnit(input: Decimal) {
				return input;
			},
		},

		"Cubic Mile": {
			symbol: "cu mi",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("4.16818182544058").mul(Decimal.pow(10, -9)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.3991275857893").mul(Decimal.pow(10, -10)));
			},
		},

		"Cubic Yard": {
			symbol: "cu yd",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.764554857984"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.764554857984"));
			},
		},

		Cup: {
			symbol: "c",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00025"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00025"));
			},
		},

		Dekalitre: {
			symbol: "daL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.01"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.01"));
			},
		},

		Hectolitre: {
			symbol: "hL",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.1"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.1"));
			},
		},

		"Tablespoon (Metric)": {
			symbol: "tbsp (metric)",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1.5").mul(Decimal.pow(10, -5)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1.5").mul(Decimal.pow(10, -5)));
			},
		},

		Litre: {
			symbol: "L",
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.001"));
			},
		},
	} satisfies Record<keyof typeof VolumeUnitNameEnum, UnitDefinition>,
} as const;

const LengthUnitNameEnum = {
	Meter: "Meter",
	Ångström: "Ångström",
	"Astronomical Unit": "Astronomical Unit",
	Attometre: "Attometre",
	Barleycorn: "Barleycorn",
	Bohr: "Bohr",
	"Cable Length (International)": "Cable Length (International)",
	Chain: "Chain",
	Cubit: "Cubit",
	Ell: "Ell",
	Fathom: "Fathom",
	"Foot (International)": "Foot (International)",
	"Inch (International)": "Inch (International)",
	"Hubble Length": "Hubble Length",
	Decimetre: "Decimetre",
	Decametre: "Decametre",
	Gigametre: "Gigametre",
	Femtometre: "Femtometre",
	Centimetre: "Centimetre",
	Millimetre: "Millimetre",
	Hectometre: "Hectometre",
	Kilometre: "Kilometre",
	"Light Day": "Light Day",
	"Light Hour": "Light Hour",
	"Light Minute": "Light Minute",
	"Light Second": "Light Second",
	"Light Year": "Light Year",
	Megametre: "Megametre",
	"Mile (International)": "Mile (International)",
	Micrometre: "Micrometre",
	Nanometre: "Nanometre",
	"Nautical Mile (International)": "Nautical Mile (International)",
	Parsec: "Parsec",
	Picometre: "Picometre",
	Yoctometre: "Yoctometre",
	Zeptometre: "Zeptometre",
	Zettametre: "Zettametre",
	"Planck Length": "Planck Length",
	"Yard (International)": "Yard (International)",
	Yottametre: "Yottametre",
} as const;

const TemperatureUnitNameEnum = {
	Celsius: "Celsius",
	Fahrenheit: "Fahrenheit",
	Kelvin: "Kelvin",
	Newton: "Newton",
} as const;

const AreaUnitNameEnum = {
	Acre: "Acre",
	Are: "Are",
	Barn: "Barn",
	Board: "Board",
	"Circular Inch": "Circular Inch",
	"Circular Mil": "Circular Mil",
	Hectare: "Hectare",
	"Square Foot": "Square Foot",
	"Square Inch": "Square Inch",
	"Square Kilometre": "Square Kilometre",
	"Square Centimetre": "Square Centimetre",
	"Square Decimetre": "Square Decimetre",
	"Square Millimetre": "Square Millimetre",
	"Square Micrometre": "Square Micrometre",
	"Square Nanometre": "Square Nanometre",
	"Square Metre": "Square Metre",
	"Square Mile": "Square Mile",
	"Square Yard": "Square Yard",
} as const;

const VolumeUnitNameEnum = {
	"Acre Foot": "Acre Foot",
	"Acre Inch": "Acre Inch",
	"Board Foot": "Board Foot",
	"Cubic Fathom": "Cubic Fathom",
	Centilitre: "Centilitre",
	"Cubic Foot": "Cubic Foot",
	"Cubic Metre": "Cubic Metre",
	"Cubic Kilometre": "Cubic Kilometre",
	"Cubic Decimetre": "Cubic Decimetre",
	"Cubic Centimetre": "Cubic Centimetre",
	"Cubic Dekametre": "Cubic Dekametre",
	"Cubic Millimetre": "Cubic Millimetre",
	"Cubic Hectometre": "Cubic Hectometre",
	"Cubic Micrometre": "Cubic Micrometre",
	"Cubic Nanometre": "Cubic Nanometre",
	"Cubic Inch": "Cubic Inch",
	"Cubic Mile": "Cubic Mile",
	"Cubic Yard": "Cubic Yard",
	Dekalitre: "Dekalitre",
	Decilitre: "Decilitre",
	Hectolitre: "Hectolitre",
	Microlitre: "Microlitre",
	Picolitre: "Picolitre",
	Cup: "Cup",
	Drop: "Drop",
	Lambda: "Lambda",
	Litre: "Litre",
	Millimetre: "Millimetre",
	"Tablespoon (Metric)": "Tablespoon (Metric)",
	"Teaspoon (Metric)": "Teaspoon (Metric)",
} as const;

const UnitNameEnum = {
	...TemperatureUnitNameEnum,
	...LengthUnitNameEnum,
	...VolumeUnitNameEnum,
	...AreaUnitNameEnum,
} as const;

export const UnitNameSchema = v.enum(UnitNameEnum);

export const UnitNamesWithTranslations: Record<UnitName, MessageDescriptor> = {
	// Temperature
	Celsius: msg`Celsius`,
	Fahrenheit: msg`Fahrenheit`,
	Kelvin: msg`Kelvin`,
	Newton: msg`Newton`,

	// Length
	Meter: msg`Meter`,
	Ångström: msg`Ångström`,
	"Astronomical Unit": msg`Astronomical Unit`,
	Attometre: msg`Attometre`,
	Barleycorn: msg`Barleycorn`,
	Bohr: msg`Bohr`,
	"Cable Length (International)": msg`Cable Length (International)`,
	Chain: msg`Chain`,
	Cubit: msg`Cubit`,
	Ell: msg`Ell`,
	Fathom: msg`Fathom`,
	"Foot (International)": msg`Foot (International)`,
	"Inch (International)": msg`Inch (International)`,
	"Hubble Length": msg`Hubble Length`,
	Decimetre: msg`Decimetre`,
	Decametre: msg`Decametre`,
	Gigametre: msg`Gigametre`,
	Femtometre: msg`Femtometre`,
	Centimetre: msg`Centimetre`,
	Millimetre: msg`Millimetre`,
	Hectometre: msg`Hectometre`,
	Kilometre: msg`Kilometre`,
	"Light Day": msg`Light Day`,
	"Light Hour": msg`Light Hour`,
	"Light Minute": msg`Light Minute`,
	"Light Second": msg`Light Second`,
	"Light Year": msg`Light Year`,
	Megametre: msg`Megametre`,
	"Mile (International)": msg`Mile (International)`,
	Micrometre: msg`Micrometre`,
	Nanometre: msg`Nanometre`,
	"Nautical Mile (International)": msg`Nautical Mile (International)`,
	Parsec: msg`Parsec`,
	Picometre: msg`Picometre`,
	Yoctometre: msg`Yoctometre`,
	Zeptometre: msg`Zeptometre`,
	Zettametre: msg`Zettametre`,
	"Planck Length": msg`Planck Length`,
	"Yard (International)": msg`Yard (International)`,
	Yottametre: msg`Yottametre`,

	// Volume
	"Acre Foot": msg`Acre Foot`,
	"Acre Inch": msg`Acre Inch`,
	"Board Foot": msg`Board Foot`,
	"Cubic Fathom": msg`Cubic Fathom`,
	Centilitre: msg`Centilitre`,
	"Cubic Foot": msg`Cubic Foot`,
	"Cubic Metre": msg`Cubic Metre`,
	"Cubic Kilometre": msg`Cubic Kilometre`,
	"Cubic Decimetre": msg`Cubic Decimetre`,
	"Cubic Centimetre": msg`Cubic Centimetre`,
	"Cubic Dekametre": msg`Cubic Dekametre`,
	"Cubic Millimetre": msg`Cubic Millimetre`,
	"Cubic Hectometre": msg`Cubic Hectometre`,
	"Cubic Micrometre": msg`Cubic Micrometre`,
	"Cubic Nanometre": msg`Cubic Nanometre`,
	"Cubic Inch": msg`Cubic Inch`,
	"Cubic Mile": msg`Cubic Mile`,
	"Cubic Yard": msg`Cubic Yard`,
	Dekalitre: msg`Dekalitre`,
	Decilitre: msg`Decilitre`,
	Hectolitre: msg`Hectolitre`,
	Microlitre: msg`Microlitre`,
	Picolitre: msg`Picolitre`,
	Cup: msg`Cup`,
	Drop: msg`Drop`,
	Lambda: msg`Lambda`,
	Litre: msg`Litre`,
	"Tablespoon (Metric)": msg`Tablespoon (Metric)`,
	"Teaspoon (Metric)": msg`Teaspoon (Metric)`,

	// Area
	Acre: msg`Acre`,
	Are: msg`Are`,
	Barn: msg`Barn`,
	Board: msg`Board`,
	"Circular Inch": msg`Circular Inch`,
	"Circular Mil": msg`Circular Mil`,
	Hectare: msg`Hectare`,
	"Square Foot": msg`Square Foot`,
	"Square Inch": msg`Square Inch`,
	"Square Kilometre": msg`Square Kilometre`,
	"Square Centimetre": msg`Square Centimetre`,
	"Square Decimetre": msg`Square Decimetre`,
	"Square Millimetre": msg`Square Millimetre`,
	"Square Micrometre": msg`Square Micrometre`,
	"Square Nanometre": msg`Square Nanometre`,
	"Square Metre": msg`Square Metre`,
	"Square Mile": msg`Square Mile`,
	"Square Yard": msg`Square Yard`,
};

export type UnitName =
	| keyof typeof AreaUnitNameEnum
	| keyof typeof LengthUnitNameEnum
	| keyof typeof VolumeUnitNameEnum
	| keyof typeof TemperatureUnitNameEnum;

export const QuantityEnum = {
	Temperature: "Temperature",
	Volume: "Volume",
	Length: "Length",
	Area: "Area",
} as const;

export const QuantitySchema = v.enum(QuantityEnum);

export const QuantitiesWithTranslations: Record<Quantity, MessageDescriptor> = {
	Temperature: msg`Temperature`,
	Volume: msg`Volume`,
	Length: msg`Length`,
	Area: msg`Area`,
};

export type Quantity = keyof typeof QuantityEnum;
