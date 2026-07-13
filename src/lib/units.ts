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
			description: msg`The Planck length is a fundamental physical constant representing the scale at which classical ideas about space and gravity break down. It is about 1.6 × 10⁻³⁵ metres and is used in theoretical physics.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -35));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 35));
			},
		},

		Yoctometre: {
			symbol: "ym",
			description: msg`A yoctometre (ym) equals 10⁻²⁴ metres. It is an SI length prefix used for extremely small distances in particle and nuclear physics contexts.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -24));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 24));
			},
		},

		Zeptometre: {
			symbol: "zm",
			description: msg`A zeptometre (zm) equals 10⁻²¹ metres. This SI unit describes subatomic-scale lengths far smaller than an atom.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -21));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 21));
			},
		},

		Attometre: {
			symbol: "am",
			description: msg`An attometre (am) equals 10⁻¹⁸ metres. It is useful when describing distances comparable to the size of atomic nuclei.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 18));
			},
		},

		Femtometre: {
			symbol: "fm",
			description: msg`A femtometre (fm), also called a fermi, equals 10⁻¹⁵ metres. Nuclear physicists use it to measure the size of atomic nuclei and nucleons.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -15));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 15));
			},
		},

		Picometre: {
			symbol: "pm",
			description: msg`A picometre (pm) equals 10⁻¹² metres. It is commonly used for atomic radii and bond lengths in chemistry.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -12));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 12));
			},
		},

		Bohr: {
			symbol: "a₀",
			description: msg`The Bohr radius (a₀) is the most probable distance between the nucleus and the electron in a hydrogen atom in its ground state, about 5.29 × 10⁻¹¹ metres.`,
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
			description: msg`An ångström (Å) equals 10⁻¹⁰ metres, or 0.1 nanometres. It is widely used in spectroscopy and crystallography to express atomic-scale lengths.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -10));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 10));
			},
		},

		Nanometre: {
			symbol: "nm",
			description: msg`A nanometre (nm) equals one billionth of a metre (10⁻⁹ m). It is the everyday unit for wavelengths of light, nanotechnology, and thin films.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -9));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 9));
			},
		},

		Micrometre: {
			symbol: "µm",
			description: msg`A micrometre (µm), or micron, equals 10⁻⁶ metres. Biologists use it for cell sizes; engineers use it for fine manufacturing tolerances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -6));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 6));
			},
		},

		Millimetre: {
			symbol: "mm",
			description: msg`A millimetre (mm) equals 0.001 metres. It is a common everyday metric unit for small objects, engineering drawings, and rainfall.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.001);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, 1_000);
			},
		},

		Barleycorn: {
			symbol: "",
			description: msg`A barleycorn is an old English length unit equal to one-third of an inch. It historically underpinned shoe sizing systems.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.div(254, 30_000));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(30_000, 254));
			},
		},

		Centimetre: {
			symbol: "cm",
			description: msg`A centimetre (cm) equals 0.01 metres. It is one of the most familiar metric units for body measurements, clothing, and school science.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, -2));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.pow(10, 2));
			},
		},

		"Inch (International)": {
			symbol: "in",
			description: msg`An international inch equals exactly 25.4 millimetres. It remains a primary length unit in the United States customary system.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.0254);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.0254));
			},
		},

		Decimetre: {
			symbol: "dm",
			description: msg`A decimetre (dm) equals 0.1 metres, or 10 centimetres. It appears in metric education and some industrial specifications.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.1);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, 10);
			},
		},

		"Foot (International)": {
			symbol: "ft",
			description: msg`An international foot equals exactly 0.3048 metres (12 inches). It is widely used in construction, aviation altitude, and US everyday measurement.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.3048);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.3048));
			},
		},

		Cubit: {
			symbol: "",
			description: msg`A cubit is an ancient length unit based on the forearm, standardized here at 0.4572 metres. It appears in historical architecture and biblical scholarship.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 0.4572);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 0.4572));
			},
		},

		"Yard (International)": {
			symbol: "yd",
			description: msg`An international yard equals exactly 0.9144 metres (3 feet). It is common in fabric, sports fields, and US customary measurements.`,
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
			description: msg`An ell is a historical cloth-measure length, standardized here at 1.143 metres. Tailors once used it for fabric lengths.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1.143);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1.143));
			},
		},

		Fathom: {
			symbol: "ftm",
			description: msg`A fathom equals 1.8288 metres (6 feet). Mariners traditionally use it to express water depth.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1.8288);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1.8288));
			},
		},

		Decametre: {
			symbol: "dam",
			description: msg`A decametre (dam) equals 10 metres. It is an SI multiple occasionally used for surveying and athletics track distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 10);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 10));
			},
		},

		Chain: {
			symbol: "ch",
			description: msg`A surveyor's chain (Gunter's chain) equals 66 feet, or about 20.117 metres. It was foundational to land surveying in English-speaking countries.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.div(79_200, 3_937));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(3_937, 79_200));
			},
		},

		Hectometre: {
			symbol: "hm",
			description: msg`A hectometre (hm) equals 100 metres. It is an SI multiple used in meteorology (rainfall rates) and some sports distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 100);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 100));
			},
		},

		"Cable Length (International)": {
			symbol: "",
			description: msg`An international cable length equals 185.2 metres (one-tenth of a nautical mile). Navies historically used it for short sea distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 185.2);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 185.2));
			},
		},

		Kilometre: {
			symbol: "km",
			description: msg`A kilometre (km) equals 1,000 metres. It is the standard metric unit for road distances, maps, and athletic races.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_000);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_000));
			},
		},

		"Mile (International)": {
			symbol: "mi",
			description: msg`An international mile equals exactly 1,609.344 metres. It remains the primary long-distance road unit in the United States and United Kingdom.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_609.344);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_609.344));
			},
		},

		"Nautical Mile (International)": {
			symbol: "nmi",
			description: msg`An international nautical mile equals exactly 1,852 metres. Aviation and maritime navigation use it because it relates closely to Earth's latitude.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1_852);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1_852));
			},
		},

		Megametre: {
			symbol: "Mm",
			description: msg`A megametre (Mm) equals one million metres (1,000 kilometres). It is useful for planetary-scale distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 6));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 6)));
			},
		},

		Gigametre: {
			symbol: "Gm",
			description: msg`A gigametre (Gm) equals one billion metres. Astronomers sometimes use it for distances within the inner Solar System.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 9));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 9)));
			},
		},

		"Light Second": {
			symbol: "",
			description: msg`A light-second is the distance light travels in one second in vacuum, exactly 299,792,458 metres. It helps express near-Earth space distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 299792458);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 299792458));
			},
		},

		"Light Minute": {
			symbol: "",
			description: msg`A light-minute is the distance light travels in one minute, about 18 million kilometres. The Sun–Earth light time is roughly eight light-minutes.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 17987547480);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 17987547480));
			},
		},

		"Astronomical Unit": {
			symbol: "au",
			description: msg`An astronomical unit (au) is the average Earth–Sun distance, exactly 149,597,870,700 metres. It is the standard yardstick for Solar System distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 149_597_870_700);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 149_597_870_700));
			},
		},

		"Light Hour": {
			symbol: "",
			description: msg`A light-hour is the distance light travels in one hour, about 1.079 billion kilometres. It spans distances comparable to the outer planets' orbits.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 1079252848800);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 1079252848800));
			},
		},

		"Light Day": {
			symbol: "",
			description: msg`A light-day is the distance light travels in one day, about 26 trillion metres. It bridges Solar System and nearby interstellar scales.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, 25902068371200);
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, 25902068371200));
			},
		},

		"Light Year": {
			symbol: "ly",
			description: msg`A light-year (ly) is the distance light travels in one Julian year, about 9.46 trillion kilometres. It is the most familiar unit for interstellar distances.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal("9460730472580800"));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal("9460730472580800")));
			},
		},

		Parsec: {
			symbol: "pc",
			description: msg`A parsec (pc) equals about 3.26 light-years. Astronomers prefer it because it relates directly to stellar parallax measurements.`,
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
			description: msg`A zettametre (Zm) equals 10²¹ metres. It is an SI extreme used for cosmological distance discussions.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 21));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 21)));
			},
		},

		Yottametre: {
			symbol: "Ym",
			description: msg`A yottametre (Ym) equals 10²⁴ metres. It is among the largest named SI length multiples.`,
			toBaseUnit(input: Decimal) {
				return Decimal.mul(input, Decimal.pow(10, 24));
			},
			fromBaseUnit(input) {
				return Decimal.mul(input, Decimal.div(1, Decimal.pow(10, 24)));
			},
		},

		"Hubble Length": {
			symbol: "",
			description: msg`The Hubble length is a cosmological distance scale related to the Hubble constant, on the order of 10²⁶ metres—comparable to the observable universe's size.`,
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
			description: msg`Kelvin (K) is the SI base unit of thermodynamic temperature. Absolute zero is 0 K; water's triple point is defined near 273.16 K.`,
			toBaseUnit(input: Decimal) {
				return input; // Base unit
			},
			fromBaseUnit(input: Decimal) {
				return input; // Base unit
			},
		},

		Newton: {
			symbol: "°N",
			description: msg`The Newton temperature scale (°N) was devised by Isaac Newton. It places the freezing point of water at 0 °N and the boiling point at 33 °N.`,
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
			description: msg`A barn (b) equals 10⁻²⁸ square metres. Particle physicists use it as a convenient unit for nuclear and particle interaction cross-sections.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -28));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -28));
			},
		},

		"Square Nanometre": {
			symbol: "nm²",
			description: msg`A square nanometre (nm²) equals 10⁻¹⁸ square metres. It measures ultra-small surface areas in nanotechnology and materials science.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -18));
			},
		},

		"Square Micrometre": {
			symbol: "μm²",
			description: msg`A square micrometre (µm²) equals 10⁻¹² square metres. Microscopy and microfabrication often report areas in this unit.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -12));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -12));
			},
		},

		"Square Millimetre": {
			symbol: "mm²",
			description: msg`A square millimetre (mm²) equals 10⁻⁶ square metres. Engineering drawings and small-component cross-sections commonly use it.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 6));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 6));
			},
		},

		"Square Centimetre": {
			symbol: "cm²",
			description: msg`A square centimetre (cm²) equals 10⁻⁴ square metres. It is a familiar school and laboratory unit for small surfaces.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 4));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 4));
			},
		},

		"Square Inch": {
			symbol: "sq in",
			description: msg`A square inch equals 645.16 square millimetres. US customary technical drawings and packaging often specify area in square inches.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00064516"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00064516"));
			},
		},

		"Square Decimetre": {
			symbol: "dm²",
			description: msg`A square decimetre (dm²) equals 0.01 square metres. It sits between the centimetre and metre squared in the metric area ladder.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 2));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 2));
			},
		},

		"Square Foot": {
			symbol: "sq ft",
			description: msg`A square foot equals about 0.0929 square metres. Real estate, flooring, and construction in the US routinely use square feet.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.09290304"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.09290304"));
			},
		},

		"Square Yard": {
			symbol: "sq yd",
			description: msg`A square yard equals about 0.836 square metres. Carpeting, fabric, and landscaping frequently quote area in square yards.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.83612736"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.83612736"));
			},
		},

		"Square Metre": {
			symbol: "m²",
			description: msg`The square metre (m²) is the SI derived unit of area. Property listings, science, and engineering worldwide use it as the base area unit.`,
			toBaseUnit(input: Decimal) {
				return input; // base unit
			},
			fromBaseUnit(input: Decimal) {
				return input; // base unit
			},
		},

		Are: {
			symbol: "a",
			description: msg`An are (a) equals 100 square metres. It is a traditional metric land unit that underlies the more common hectare.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal(100));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal(100));
			},
		},

		Acre: {
			symbol: "ac",
			description: msg`An international acre equals about 4,047 square metres. It remains a primary land-area unit in the United States and United Kingdom.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("4046.8564224"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("4046.8564224"));
			},
		},

		Hectare: {
			symbol: "ha",
			description: msg`A hectare (ha) equals 10,000 square metres (100 ares). Agriculture and land management worldwide report field sizes in hectares.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("10000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("10000"));
			},
		},

		"Square Kilometre": {
			symbol: "km²",
			description: msg`A square kilometre (km²) equals one million square metres. Maps and geography use it for cities, regions, and countries.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, 6));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, 6));
			},
		},

		"Square Mile": {
			symbol: "sq mi",
			description: msg`A square mile equals about 2.59 square kilometres. US and UK geographic statistics often express large areas in square miles.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("2.589988110336").mul(Decimal.pow(10, 6)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.589988110336").mul(Decimal.pow(10, 6)));
			},
		},

		Board: {
			symbol: "bd",
			description: msg`A board (board measure area) equals about 0.00774 square metres—the face area of a one-inch by one-foot board. Lumber trades use related board measures.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00774192"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00774192"));
			},
		},

		"Circular Inch": {
			symbol: "circ in",
			description: msg`A circular inch is the area of a circle one inch in diameter, about 0.785 square inches. Wire and tubing sizing historically used circular measures.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("5.06707479097498").mul(Decimal.pow(10, -4)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("5.06707479097498").mul(Decimal.pow(10, -4)));
			},
		},

		"Circular Mil": {
			symbol: "circ mil",
			description: msg`A circular mil is the area of a circle 0.001 inch in diameter. Electrical engineering uses it to specify wire cross-sectional area.`,
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
			description: msg`A cubic nanometre (nm³) equals 10⁻²⁷ cubic metres. It describes molecular-scale volumes in nanoscience.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -27));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -27));
			},
		},

		"Cubic Micrometre": {
			symbol: "μm³",
			description: msg`A cubic micrometre (µm³) equals 10⁻¹⁸ cubic metres. Cell biology and microparticle work often report volumes this way.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -18));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -18));
			},
		},

		Picolitre: {
			symbol: "pL",
			description: msg`A picolitre (pL) equals 10⁻¹² litres. Microfluidics and inkjet printing deal with volumes at this scale.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -12));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -12));
			},
		},

		Lambda: {
			symbol: "λ",
			description: msg`A lambda (λ) is a laboratory volume unit equal to one microlitre (10⁻⁶ L). Older biochemistry literature still uses the name.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal.pow(10, -9));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal.pow(10, -9));
			},
		},

		Microlitre: {
			symbol: "μL",
			description: msg`A microlitre (µL) equals one millionth of a litre. Pipettes in biology and chemistry routinely dispense microlitre volumes.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000000001"));
			},
		},

		"Cubic Millimetre": {
			symbol: "mm³",
			description: msg`A cubic millimetre (mm³) equals one microlitre. Medicine and engineering use it for small solid or fluid volumes.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000000001"));
			},
		},

		Drop: {
			symbol: "gtt (metric)",
			description: msg`A metric drop is standardized here as 50 microlitres. Pharmacy and laboratory instructions sometimes dose liquids by drops.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00000005"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00000005"));
			},
		},

		Millimetre: {
			symbol: "mL",
			description: msg`A millilitre (mL) equals one cubic centimetre. Medicine, cooking, and laboratory work use millilitres for precise liquid volumes.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000001"));
			},
		},

		"Cubic Centimetre": {
			symbol: "cm³",
			description: msg`A cubic centimetre (cm³ or cc) equals one millilitre. Medicine and engine displacement commonly use this name.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.000001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.000001"));
			},
		},

		Centilitre: {
			symbol: "cL",
			description: msg`A centilitre (cL) equals 10 millilitres. Beverage packaging in Europe often labels volume in centilitres.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00001"));
			},
		},

		Decilitre: {
			symbol: "dL",
			description: msg`A decilitre (dL) equals 100 millilitres. Cooking and nutrition labels in some countries use decilitres.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.0001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.0001"));
			},
		},

		"Teaspoon (Metric)": {
			symbol: "tsp (metric)",
			description: msg`A metric teaspoon equals 5 millilitres. Cooking recipes use it for small liquid and powder measures.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("5").mul(Decimal.pow(10, -6)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("5").mul(Decimal.pow(10, -6)));
			},
		},

		"Acre Foot": {
			symbol: "ac ft",
			description: msg`An acre-foot is the volume covering one acre to a depth of one foot, about 1,233 cubic metres. Water-resource management uses it for reservoirs.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1233.48183754752"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1233.48183754752"));
			},
		},

		"Acre Inch": {
			symbol: "ac in",
			description: msg`An acre-inch is the volume covering one acre one inch deep, about 102.8 cubic metres. Irrigation planning often uses acre-inches.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("102.79015312896"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("102.79015312896"));
			},
		},

		"Board Foot": {
			symbol: "bd ft",
			description: msg`A board foot is a lumber volume of 1 foot × 1 foot × 1 inch, about 2.36 litres. Softwood and hardwood trades price wood by board feet.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("2.359737216").mul(Decimal.pow(10, -3)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.359737216").mul(Decimal.pow(10, -3)));
			},
		},

		"Cubic Decimetre": {
			symbol: "dm³",
			description: msg`A cubic decimetre (dm³) equals exactly one litre. SI texts often prefer this name when emphasizing volume as length cubed.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.001"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.001"));
			},
		},

		"Cubic Dekametre": {
			symbol: "dam³",
			description: msg`A cubic dekametre (dam³) equals 1,000 cubic metres. Large civil-engineering and water volumes may use this SI multiple.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000"));
			},
		},

		"Cubic Fathom": {
			symbol: "cu fm",
			description: msg`A cubic fathom equals about 6.12 cubic metres. Historical maritime cargo and dredging contexts used cubic fathoms.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("6.116438863872"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("6.116438863872"));
			},
		},

		"Cubic Foot": {
			symbol: "cu ft",
			description: msg`A cubic foot equals about 28.3 litres. HVAC, shipping, and US construction routinely measure volume in cubic feet.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.028316846592"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.028316846592"));
			},
		},

		"Cubic Hectometre": {
			symbol: "hm³",
			description: msg`A cubic hectometre (hm³) equals one million cubic metres. Reservoir capacity and river discharge are often quoted in hm³.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000000"));
			},
		},

		"Cubic Inch": {
			symbol: "cu in",
			description: msg`A cubic inch equals about 16.4 millilitres. Engine displacement in the US was long advertised in cubic inches.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1.6387064").mul(Decimal.pow(10, -5)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1.6387064").mul(Decimal.pow(10, -5)));
			},
		},

		"Cubic Kilometre": {
			symbol: "km³",
			description: msg`A cubic kilometre (km³) equals one billion cubic metres. Geology and oceanography use it for enormous natural volumes.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1000000000"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1000000000"));
			},
		},

		"Cubic Metre": {
			symbol: "m³",
			description: msg`The cubic metre (m³) is the SI derived unit of volume. Science, industry, and utilities worldwide treat it as the base volume unit.`,
			toBaseUnit(input: Decimal) {
				return input;
			},
			fromBaseUnit(input: Decimal) {
				return input;
			},
		},

		"Cubic Mile": {
			symbol: "cu mi",
			description: msg`A cubic mile equals about 4.17 cubic kilometres. Large natural features such as aquifers or ice sheets may be described in cubic miles.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("4.16818182544058").mul(Decimal.pow(10, -9)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("2.3991275857893").mul(Decimal.pow(10, -10)));
			},
		},

		"Cubic Yard": {
			symbol: "cu yd",
			description: msg`A cubic yard equals about 0.765 cubic metres. Construction and landscaping in the US buy concrete, soil, and mulch by the cubic yard.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.764554857984"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.764554857984"));
			},
		},

		Cup: {
			symbol: "c",
			description: msg`A metric cup is standardized here as 250 millilitres. Cooking recipes use cups for everyday liquid and dry measures.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.00025"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.00025"));
			},
		},

		Dekalitre: {
			symbol: "daL",
			description: msg`A dekalitre (daL) equals 10 litres. Beverage and agricultural bulk liquids sometimes use dekalitres.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.01"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.01"));
			},
		},

		Hectolitre: {
			symbol: "hL",
			description: msg`A hectolitre (hL) equals 100 litres. Brewing, wine production, and grain trade historically favour hectolitres.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("0.1"));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("0.1"));
			},
		},

		"Tablespoon (Metric)": {
			symbol: "tbsp (metric)",
			description: msg`A metric tablespoon equals 15 millilitres. Cooking instructions use it for medium liquid and condiment measures.`,
			toBaseUnit(input: Decimal) {
				return input.mul(Decimal("1.5").mul(Decimal.pow(10, -5)));
			},
			fromBaseUnit(input: Decimal) {
				return input.div(Decimal("1.5").mul(Decimal.pow(10, -5)));
			},
		},

		Litre: {
			symbol: "L",
			description: msg`A litre (L) equals 0.001 cubic metres. It is the everyday metric unit for beverages, fuel, and household liquids.`,
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
