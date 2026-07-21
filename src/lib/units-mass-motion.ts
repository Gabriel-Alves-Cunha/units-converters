import { Decimal } from "decimal.js";
import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

import type { UnitDefinition } from "#/lib/units";

export const WeightUnitNameEnum = {
	Kilogram: "Kilogram",
	Gram: "Gram",
	Milligram: "Milligram",
	Microgram: "Microgram",
	"Tonne (Metric)": "Tonne (Metric)",
	"Pound (Avoirdupois)": "Pound (Avoirdupois)",
	"Ounce (Avoirdupois)": "Ounce (Avoirdupois)",
	Stone: "Stone",
	Carat: "Carat",
	Grain: "Grain",
} as const;

export const SpeedUnitNameEnum = {
	"Metre per second": "Metre per second",
	"Kilometre per hour": "Kilometre per hour",
	"Mile per hour": "Mile per hour",
	"Foot per second": "Foot per second",
	Knot: "Knot",
	"Centimetre per second": "Centimetre per second",
} as const;

export const TimeUnitNameEnum = {
	Second: "Second",
	Millisecond: "Millisecond",
	Microsecond: "Microsecond",
	Nanosecond: "Nanosecond",
	Minute: "Minute",
	Hour: "Hour",
	Day: "Day",
	Week: "Week",
	"Year (Julian)": "Year (Julian)",
	"Month (Average)": "Month (Average)",
} as const;

export const weightUnits = {
	Kilogram: {
		symbol: "kg",
		description: msg`The kilogram (kg) is the SI base unit of mass. It is defined by fixing the Planck constant and is the reference for everyday weighing and science.`,
		toBaseUnit(input: Decimal) {
			return input;
		},
		fromBaseUnit(input: Decimal) {
			return input;
		},
	},

	Gram: {
		symbol: "g",
		description: msg`A gram (g) equals one thousandth of a kilogram. It is the familiar metric unit for kitchen scales, nutrition labels, and small packages.`,
		formula: "kg = g × 0.001",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.001"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.001"));
		},
	},

	Milligram: {
		symbol: "mg",
		description: msg`A milligram (mg) equals one millionth of a kilogram (10⁻⁶ kg). Medicine doses and laboratory samples are often measured in milligrams.`,
		formula: "kg = mg × 10⁻⁶",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal.pow(10, -6));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal.pow(10, -6));
		},
	},

	Microgram: {
		symbol: "µg",
		description: msg`A microgram (µg) equals one billionth of a kilogram (10⁻⁹ kg). Trace nutrients, pollutants, and sensitive analytical chemistry use micrograms.`,
		formula: "kg = µg × 10⁻⁹",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal.pow(10, -9));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal.pow(10, -9));
		},
	},

	"Tonne (Metric)": {
		symbol: "t",
		description: msg`A metric tonne (t) equals 1,000 kilograms. Industry, shipping, and agriculture use tonnes for bulk cargo and large loads.`,
		formula: "kg = t × 1000",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("1000"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("1000"));
		},
	},

	"Pound (Avoirdupois)": {
		symbol: "lb",
		description: msg`An avoirdupois pound (lb) equals exactly 0.45359237 kilograms. It is the primary customary mass unit in the United States for body weight and commerce.`,
		formula: "kg = lb × 0.45359237",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.45359237"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.45359237"));
		},
	},

	"Ounce (Avoirdupois)": {
		symbol: "oz",
		description: msg`An avoirdupois ounce (oz) equals exactly 0.028349523125 kilograms, or one-sixteenth of a pound. Food packaging and postal scales commonly use ounces.`,
		formula: "kg = oz × 0.028349523125",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.028349523125"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.028349523125"));
		},
	},

	Stone: {
		symbol: "st",
		description: msg`A stone equals 14 avoirdupois pounds, or exactly 6.35029318 kilograms. Body weight in the United Kingdom is still often quoted in stones and pounds.`,
		formula: "kg = st × 6.35029318",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("6.35029318"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("6.35029318"));
		},
	},

	Carat: {
		symbol: "ct",
		description: msg`A metric carat equals exactly 0.0002 kilograms (200 milligrams). Jewellers use carats to express the mass of gemstones such as diamonds.`,
		formula: "kg = ct × 0.0002",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.0002"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.0002"));
		},
	},

	Grain: {
		symbol: "gr",
		description: msg`A grain equals exactly 0.00006479891 kilograms. Historically based on a grain of cereal, it still appears in ammunition, archery, and precious-metal weighing.`,
		formula: "kg = gr × 0.00006479891",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.00006479891"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.00006479891"));
		},
	},
} satisfies Record<keyof typeof WeightUnitNameEnum, UnitDefinition>;

export const speedUnits = {
	"Metre per second": {
		symbol: "m/s",
		description: msg`The metre per second (m/s) is the SI derived unit of speed. Physics and engineering treat it as the base unit for velocity and speed conversions.`,
		toBaseUnit(input: Decimal) {
			return input;
		},
		fromBaseUnit(input: Decimal) {
			return input;
		},
	},

	"Kilometre per hour": {
		symbol: "km/h",
		description: msg`A kilometre per hour (km/h) equals one kilometre of travel in one hour, or exactly 1/3.6 metres per second. Road signs worldwide display vehicle speed in km/h.`,
		formula: "m/s = km/h ÷ 3.6",
		toBaseUnit(input: Decimal) {
			return input.div(Decimal("3.6"));
		},
		fromBaseUnit(input: Decimal) {
			return input.mul(Decimal("3.6"));
		},
	},

	"Mile per hour": {
		symbol: "mph",
		description: msg`An international mile per hour (mph) equals exactly 0.44704 metres per second. It is the everyday road-speed unit in the United States and United Kingdom.`,
		formula: "m/s = mph × 0.44704",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.44704"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.44704"));
		},
	},

	"Foot per second": {
		symbol: "ft/s",
		description: msg`A foot per second (ft/s) equals exactly 0.3048 metres per second. Engineering, ballistics, and some US technical contexts use feet per second.`,
		formula: "m/s = ft/s × 0.3048",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.3048"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.3048"));
		},
	},

	Knot: {
		symbol: "kn",
		description: msg`A knot is one international nautical mile per hour, equal to 1852/3600 metres per second. Aviation and maritime navigation report speed in knots.`,
		formula: "m/s = kn × 1852 ÷ 3600",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("1852").div(Decimal("3600")));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("1852").div(Decimal("3600")));
		},
	},

	"Centimetre per second": {
		symbol: "cm/s",
		description: msg`A centimetre per second (cm/s) equals 0.01 metres per second. Laboratory flow rates and slow mechanical motions are often expressed in cm/s.`,
		formula: "m/s = cm/s × 0.01",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.01"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.01"));
		},
	},
} satisfies Record<keyof typeof SpeedUnitNameEnum, UnitDefinition>;

const SECONDS_PER_DAY = Decimal("86400");
const JULIAN_YEAR_SECONDS = Decimal("365.25").mul(SECONDS_PER_DAY);
const AVERAGE_MONTH_SECONDS = Decimal("30.436875").mul(SECONDS_PER_DAY);

export const timeUnits = {
	Second: {
		symbol: "s",
		description: msg`The second (s) is the SI base unit of time. It is defined by the cesium atomic clock transition and underpins all other time units here.`,
		toBaseUnit(input: Decimal) {
			return input;
		},
		fromBaseUnit(input: Decimal) {
			return input;
		},
	},

	Millisecond: {
		symbol: "ms",
		description: msg`A millisecond (ms) equals one thousandth of a second. Computing latency, photography shutter speeds, and sports timing often use milliseconds.`,
		formula: "s = ms × 0.001",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("0.001"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("0.001"));
		},
	},

	Microsecond: {
		symbol: "µs",
		description: msg`A microsecond (µs) equals one millionth of a second (10⁻⁶ s). High-speed electronics and scientific instrumentation resolve events in microseconds.`,
		formula: "s = µs × 10⁻⁶",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal.pow(10, -6));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal.pow(10, -6));
		},
	},

	Nanosecond: {
		symbol: "ns",
		description: msg`A nanosecond (ns) equals one billionth of a second (10⁻⁹ s). Computer clock cycles and light travel over short distances are measured in nanoseconds.`,
		formula: "s = ns × 10⁻⁹",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal.pow(10, -9));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal.pow(10, -9));
		},
	},

	Minute: {
		symbol: "min",
		description: msg`A minute equals 60 seconds. Everyday schedules, cooking, and sports use minutes as a convenient subdivision of the hour.`,
		formula: "s = min × 60",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("60"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("60"));
		},
	},

	Hour: {
		symbol: "h",
		description: msg`An hour equals 3,600 seconds, or 60 minutes. Civil timekeeping, labour, and travel durations are usually expressed in hours.`,
		formula: "s = h × 3600",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("3600"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("3600"));
		},
	},

	Day: {
		symbol: "d",
		description: msg`A day equals 86,400 seconds (24 hours). Calendars and daily planning treat the mean solar day as the basic civil time unit.`,
		formula: "s = d × 86400",
		toBaseUnit(input: Decimal) {
			return input.mul(SECONDS_PER_DAY);
		},
		fromBaseUnit(input: Decimal) {
			return input.div(SECONDS_PER_DAY);
		},
	},

	Week: {
		symbol: "wk",
		description: msg`A week equals 604,800 seconds, or seven days. Work schedules, media cycles, and planning horizons commonly use weeks.`,
		formula: "s = wk × 604800",
		toBaseUnit(input: Decimal) {
			return input.mul(Decimal("604800"));
		},
		fromBaseUnit(input: Decimal) {
			return input.div(Decimal("604800"));
		},
	},

	"Year (Julian)": {
		symbol: "yr",
		description: msg`A Julian year equals exactly 365.25 mean solar days (31,557,600 seconds). Astronomy uses the Julian year as a fixed long-duration time unit.`,
		formula: "s = yr × 365.25 × 86400",
		toBaseUnit(input: Decimal) {
			return input.mul(JULIAN_YEAR_SECONDS);
		},
		fromBaseUnit(input: Decimal) {
			return input.div(JULIAN_YEAR_SECONDS);
		},
	},

	"Month (Average)": {
		symbol: "mo",
		description: msg`An average month equals 30.436875 days (one-twelfth of a Julian year). It approximates the mean Gregorian calendar month for long-term conversions.`,
		formula: "s = mo × 30.436875 × 86400",
		toBaseUnit(input: Decimal) {
			return input.mul(AVERAGE_MONTH_SECONDS);
		},
		fromBaseUnit(input: Decimal) {
			return input.div(AVERAGE_MONTH_SECONDS);
		},
	},
} satisfies Record<keyof typeof TimeUnitNameEnum, UnitDefinition>;

export const weightUnitTranslations: Record<
	keyof typeof WeightUnitNameEnum,
	MessageDescriptor
> = {
	Kilogram: msg`Kilogram`,
	Gram: msg`Gram`,
	Milligram: msg`Milligram`,
	Microgram: msg`Microgram`,
	"Tonne (Metric)": msg`Tonne (Metric)`,
	"Pound (Avoirdupois)": msg`Pound (Avoirdupois)`,
	"Ounce (Avoirdupois)": msg`Ounce (Avoirdupois)`,
	Stone: msg`Stone`,
	Carat: msg`Carat`,
	Grain: msg`Grain`,
};

export const speedUnitTranslations: Record<
	keyof typeof SpeedUnitNameEnum,
	MessageDescriptor
> = {
	"Metre per second": msg`Metre per second`,
	"Kilometre per hour": msg`Kilometre per hour`,
	"Mile per hour": msg`Mile per hour`,
	"Foot per second": msg`Foot per second`,
	Knot: msg`Knot`,
	"Centimetre per second": msg`Centimetre per second`,
};

export const timeUnitTranslations: Record<
	keyof typeof TimeUnitNameEnum,
	MessageDescriptor
> = {
	Second: msg`Second`,
	Millisecond: msg`Millisecond`,
	Microsecond: msg`Microsecond`,
	Nanosecond: msg`Nanosecond`,
	Minute: msg`Minute`,
	Hour: msg`Hour`,
	Day: msg`Day`,
	Week: msg`Week`,
	"Year (Julian)": msg`Year (Julian)`,
	"Month (Average)": msg`Month (Average)`,
};
