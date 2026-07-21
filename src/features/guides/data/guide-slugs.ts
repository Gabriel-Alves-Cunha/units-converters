/**
 * Plain guide slugs — kept free of Lingui macros so build tooling
 * (vite.config, generate-sitemap) can import them without babel-plugin-macros.
 */
export const GUIDE_SLUGS = [
	"metric-vs-imperial",
	"how-unit-conversion-works",
	"why-floating-point-converters-fail",
	"celsius-fahrenheit-kelvin-explained",
	"cooking-volume-conversions",
	"si-prefixes-explained",
	"length-units-everyday-life",
	"area-vs-volume-common-mistakes",
	"light-year-explained",
	"scientific-length-units",
	"converting-acres-hectares-square-meters",
	"temperature-scales-history",
	"imperial-volume-us-vs-uk",
	"precision-in-engineering-conversions",
	"nanometre-to-metre-scale",
	"choosing-the-right-unit",
	"body-height-conversions",
	"room-area-flooring",
	"oven-temperature-baking",
	"travel-distance-km-miles",
	"pool-volume-chemicals",
	"kilograms-vs-pounds-everyday",
	"shipping-weight-vs-volume-weight",
	"mph-to-kmh-road-trips",
	"knots-explained-boats-planes",
	"seconds-minutes-hours-precision",
	"julian-year-vs-calendar-year",
	"carpet-area-calculator-workflow",
	"grams-ounces-kitchen-scale",
	"stone-weight-uk-us",
	"airspeed-units-explained",
	"time-zones-vs-duration-units",
	"density-mass-volume-triangle",
	"treadmill-pace-min-per-km",
	"fuel-economy-units-basics",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export function getAllGuideSlugs(): string[] {
	return [...GUIDE_SLUGS];
}
