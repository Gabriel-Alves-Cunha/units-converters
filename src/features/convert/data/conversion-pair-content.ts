import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";
import type { Quantity, UnitName } from "#/lib/units";

export type ConversionPairContent = {
	whenToUse: MessageDescriptor;
	commonMistakes: MessageDescriptor;
	realWorldExample: MessageDescriptor;
};

function key(quantity: string, from: string, to: string): string {
	return `${quantity}|${from}|${to}`;
}

export const CONVERSION_PAIR_CONTENT: Record<string, ConversionPairContent> = {
	// ── Length ──────────────────────────────────────────────────────────────

	[key("Length", "Centimetre", "Inch (International)")]: {
		whenToUse: msg`Use centimetres to inches when you read a metric product size—screen diagonal, waist measurement, or furniture width—and need the inch figure printed on US packaging or clothing tags. Tailors, online shoppers, and DIY buyers hit this daily. One inch is exactly 2.54 cm, so the conversion is a fixed scale factor with no temperature or material correction.`,
		commonMistakes: msg`People often round 2.54 cm to “2.5 cm per inch,” which drifts by about 1.6% and shows up on long measurements. Another trap is mixing display inches (TV diagonals) with ruler inches without checking which system the seller used. Do not confuse centimetres with millimetres: 25.4 mm is one inch, not 25.4 cm.`,
		realWorldExample: msg`A laptop listed as 35.6 cm wide is 14 inches (35.6 ÷ 2.54). A European jeans waist of 81 cm is about 31.9 inches—close enough to pick a US size 32, then confirm the brand’s size chart.`,
	},

	[key("Length", "Inch (International)", "Centimetre")]: {
		whenToUse: msg`Convert inches to centimetres when a US tape measure, pipe schedule, or monitor size must match metric drawings, European furniture specs, or metric drill bits. Builders working from mixed plans and anyone ordering parts across regions use this constantly. The international inch is locked at 25.4 mm, so the centimetre result is exact.`,
		commonMistakes: msg`Multiplying by 2.5 instead of 2.54 understates every length. Surveyors and woodworkers also confuse decimal inches (3.25 in) with fractional inches (3¼ in) before converting—convert the decimal first. Screen “inches” are diagonal; do not treat them as width when comparing to a centimetre shelf opening.`,
		realWorldExample: msg`A 2×4 stud is nominally 1.5 inches thick, which is 3.81 cm—useful when a metric drywall screw pack lists max material thickness in centimetres. A 55-inch TV diagonal is 139.7 cm for checking elevator and doorway clearance.`,
	},

	[key("Length", "Inch (International)", "Foot (International)")]: {
		whenToUse: msg`Switch inches to feet when a tape reading in inches is longer than a foot and you need architectural or lumber language (room height, joist spacing, fabric cuts). Carpenters often measure in inches then report in feet and leftover inches. Twelve international inches make exactly one foot.`,
		commonMistakes: msg`Dividing by 10 instead of 12 is a common mental slip. Leaving a remainder as a decimal foot (5.5 ft) is fine for calculation, but suppliers often want 5 ft 6 in—do not call 0.5 ft “5 inches.” Also, US survey feet differ slightly from the international foot; this converter uses the international definition.`,
		realWorldExample: msg`A curtain drop of 84 inches is 7 feet exactly—standard floor-length drapery. A workbench at 36 inches high is 3 feet, matching many metric 900 mm benches within a few millimetres.`,
	},

	[key("Length", "Millimetre", "Inch (International)")]: {
		whenToUse: msg`Use millimetres to inches for precision hardware: bolt diameters, PCB hole spacing, camera sensor sizes, and machining tolerances. Engineering drawings in ISO countries list mm; US tooling and drill charts are often in inches. At this scale, the exact 25.4 mm per inch factor matters more than casual rounding.`,
		commonMistakes: msg`Calling 25 mm “one inch” is off by 1.6%—enough to mis-drill a clearance hole. Do not mix calliper readings in mm with nominal inch pipe sizes (½″ pipe is not 12.7 mm inside diameter). Leading zeros on drawings (0.5 mm vs 0.5 in) are easy to swap when copying values.`,
		realWorldExample: msg`An M6 bolt shank is 6 mm across, about 0.236 inches—too large for a ¼″ (0.250 in) clearance if you need a snug fit, but fine for a ¼″ clearance hole with a little play. A 35 mm camera lens is roughly 1.38 inches in focal length naming conversations.`,
	},

	[key("Length", "Inch (International)", "Millimetre")]: {
		whenToUse: msg`Convert inches to millimetres when a US fractional drill size, sheet-metal gauge note, or 3D-print dimension must land on a metric CNC program or European fastener chart. Machinists and makers do this whenever CAM software expects mm. Multiply inches by 25.4 for an exact millimetre value.`,
		commonMistakes: msg`Treating 1/8″ as “3 mm” (true value ≈ 3.175 mm) stacks error across a part with many holes. Fractional inches must become decimals before multiplying. Do not confuse thousandths of an inch (mil) with millimetres—1 mil is 0.0254 mm, not 1 mm.`,
		realWorldExample: msg`A ¼-20 tap drill often uses a 0.201″ hole, about 5.11 mm—handy when your metric drill set jumps in 0.1 mm steps. Plywood sold as ¾ inch is 19.05 mm; European 18 mm sheet is close but not identical for tight dados.`,
	},

	[key("Length", "Meter", "Foot (International)")]: {
		whenToUse: msg`Convert metres to feet for room dimensions, athletic track splits, and building heights when the source is metric but the audience thinks in feet. Architects reviewing SI drawings for a US client and runners comparing race distances use this pair often. One metre is about 3.28084 international feet.`,
		commonMistakes: msg`Using “3 feet per metre” undershoots by nearly 10%. Ceiling heights listed as 2.4 m are about 7.87 ft, not 8 ft—important for ladder and furniture clearance. Do not mix statute miles (for long distance) into short metre-to-foot room math.`,
		realWorldExample: msg`A 12 m yacht length overall is about 39.4 feet for marina berth booking in the US. A 3 m sofa wall needs roughly 9.8 feet of clear space—buyers often round up to 10 feet when shopping.`,
	},

	[key("Length", "Foot (International)", "Meter")]: {
		whenToUse: msg`Use feet to metres when US real-estate listings, lumber lengths, or flight levels described in feet must feed metric planning tools, EU building codes, or GPS apps set to metres. Survey notes and climbing guidebooks also flip between these. Divide feet by 3.28084, or multiply by 0.3048 exactly.`,
		commonMistakes: msg`Assuming 1 ft ≈ 0.3 m is rough; over a 100 ft span the error is about 0.5 m. Ceiling fans and door kits sold in feet can fail metric rough openings if you round aggressively. Distinguish nautical miles and statute miles from feet before converting long distances.`,
		realWorldExample: msg`A 10-foot shipping container width constraint is 3.048 m—container specs are often written both ways. A 6 ft person is 1.83 m, the figure hospitals and passport forms outside the US usually expect.`,
	},

	[key("Length", "Kilometre", "Mile (International)")]: {
		whenToUse: msg`Convert kilometres to miles for road trips, race results, and fuel economy discussions when maps or cars show km but drivers think in miles. Tourism, logistics, and running (5K, 10K) all cross this boundary. One international mile is exactly 1.609344 km.`,
		commonMistakes: msg`Using 1.6 as a permanent factor is fine for rough estimates but drifts on long routes; prefer 1.609344 for odometer math. Do not confuse nautical miles (1.852 km) with statute/international miles. Speed limits in km/h are not the same numbers as mph after conversion.`,
		realWorldExample: msg`A 42.195 km marathon is 26.219 miles—the classic race distance. A 120 km drive is about 74.6 miles; at 8 L/100 km that trip burns roughly the same fuel as about 29.4 mpg over those miles.`,
	},

	[key("Length", "Mile (International)", "Kilometre")]: {
		whenToUse: msg`Convert miles to kilometres when US highway distances, flight route charts in statute miles, or bike computer settings must match metric signage and European navigation. Couriers quoting door-to-door miles for overseas clients need the km figure. Multiply miles by 1.609344.`,
		commonMistakes: msg`Rounding to “1.5 km per mile” understates distance by about 7%. Mixing nautical miles into car navigation produces large errors. Pace (min/mile vs min/km) must be converted separately from pure distance—do not reuse the same shortcut without adjusting time.`,
		realWorldExample: msg`Interstate rest stops every 50 miles are about 80.5 km apart. A 26.2-mile training long run is essentially a full marathon distance in kilometres (about 42.2 km).`,
	},

	[key("Length", "Centimetre", "Foot (International)")]: {
		whenToUse: msg`Use centimetres to feet for body height, fabric length, and small room clearances written in cm on clothing or furniture sites but discussed in feet. Parents tracking child height and interior designers switching between EU and US catalogs use this. There are 30.48 cm in one international foot.`,
		commonMistakes: msg`Dividing cm by 30 instead of 30.48 adds a small but visible error on height (about 0.5 cm at 180 cm). People also convert cm→inches then forget to divide by 12 for feet. Do not treat “foot” as the anatomical foot length; use the unit definition.`,
		realWorldExample: msg`A height of 175 cm is 5.74 feet, usually spoken as 5 ft 9 in. A 240 cm curtain fabric cut is 7.87 feet—order 8 feet of material if the shop sells by the foot.`,
	},

	[key("Length", "Foot (International)", "Centimetre")]: {
		whenToUse: msg`Convert feet to centimetres for height charts, ski length, and doorway clearances when the measurement started on a US tape in feet and inches. Medical growth charts outside the US and online clothing filters often want centimetres. Multiply feet by 30.48.`,
		commonMistakes: msg`Converting only the whole feet and dropping leftover inches loses several centimetres. “Five foot two” must include the two inches (157.5 cm total), not 5 × 30.48 alone. Flooring sold per square foot still needs linear cm for cut lengths—do not mix area and length units.`,
		realWorldExample: msg`A 6 ft 1 in doorway rough opening is 185.4 cm—compare that to a 200 cm metric door slab with trim. A 5-foot Christmas tree is 152.4 cm for European height labels.`,
	},

	[key("Length", "Meter", "Yard (International)")]: {
		whenToUse: msg`Convert metres to yards for American football field talk, fabric bolts, and gardening beds when the plan is metric but the store sells by the yard. Landscapers and sports fans cross this pair often. One metre is about 1.09361 international yards.`,
		commonMistakes: msg`Treating metres and yards as equal is a ~9% error—enough to short a fabric order. Do not confuse square metres with square yards when buying sod or carpet; convert area separately. Survey “yards” in older deeds may not match the international yard.`,
		realWorldExample: msg`A 100 m dash is about 109.4 yards. Ordering 3 m of upholstery fabric means about 3.28 yards; round up if the bolt is sold in whole yards only.`,
	},

	[key("Length", "Yard (International)", "Meter")]: {
		whenToUse: msg`Use yards to metres when US fabric, turf, or concrete “by the yard” quotes must match metric project plans. Quilters and civil estimators working with mixed suppliers rely on this. One international yard is exactly 0.9144 m.`,
		commonMistakes: msg`Assuming a yard is “about a metre” leaves you short on material. Cubic yards of mulch or concrete are volume, not length—do not run them through a length converter. Keep fractions of a yard (½ yd) as 0.5 before multiplying by 0.9144.`,
		realWorldExample: msg`A 10-yard fabric bolt section is 9.144 m—enough to plan metric pattern layouts. A first-down marker at 10 yards is 9.14 m on a metric practice field overlay.`,
	},

	[key("Length", "Meter", "Kilometre")]: {
		whenToUse: msg`Convert metres to kilometres for race distances, hiking elevation gain written in metres of trail length, and city planning where short SI lengths become map-scale distances. Sensors and GPS traces often store metres; reports prefer kilometres. Divide metres by 1,000.`,
		commonMistakes: msg`Forgetting three zeros turns a 5,000 m run into “5 m.” Elevation gain in metres is not the same as horizontal distance in kilometres—do not divide elevation by 1,000 and call it a trail length. Keep scientific notation (1.5e4 m) straight when pasting from spreadsheets.`,
		realWorldExample: msg`A 5,000 m training interval is a 5 km workout. A 42,195 m race distance is the marathon’s 42.195 km official length.`,
	},

	[key("Length", "Foot (International)", "Inch (International)")]: {
		whenToUse: msg`Convert feet to inches when cut lists, sewing patterns, or height forms ask for a single inch total instead of feet-and-inches. Cabinetry screws, pipe runs, and printer paper clearance checks often need one number. Multiply feet by 12.`,
		commonMistakes: msg`Adding leftover inches twice—once inside the feet field and again after converting—double-counts. Decimal feet (6.5 ft) become 78 inches, not 6 ft 5 in (which is 77 inches). Confirm whether the source already mixed feet and inches in one string.`,
		realWorldExample: msg`A 8.5-foot counter run is 102 inches for a continuous laminate order. Someone 5.75 feet tall is 69 inches on a medical form that only accepts inches.`,
	},

	[key("Length", "Yard (International)", "Foot (International)")]: {
		whenToUse: msg`Use yards to feet for American football, fabric spreads, and garden bed lengths when the quote is in yards but the tape measure reads feet. Three international feet make one yard exactly. Contractors pacing a site in yards often switch to feet for cut accuracy.`,
		commonMistakes: msg`Using 2 or 4 feet per yard is a quick mental error. Square yards and cubic yards are not converted by multiplying by 3—that factor is only for linear yards. Keep partial yards (2.5 yd = 7.5 ft) as decimals.`,
		realWorldExample: msg`A 5-yard pass play covers 15 feet of field. Buying 4 yards of landscape fabric means 12 feet of linear run along a bed edge.`,
	},

	[key("Length", "Nanometre", "Meter")]: {
		whenToUse: msg`Convert nanometres to metres in optics, semiconductor process notes, and wavelength tables where light or film thickness is given in nm but equations expect metres (SI base). Physics homework and thin-film coating specs use this constantly. One nanometre is 10⁻⁹ m.`,
		commonMistakes: msg`Sliding the decimal nine places the wrong way (×10⁹ instead of ×10⁻⁹) is the classic error. Do not confuse nm with µm (micrometres)—1,000 nm = 1 µm. Ångströms (0.1 nm) are yet another scale; convert Å→nm first if needed.`,
		realWorldExample: msg`Green light near 550 nm is 5.5×10⁻⁷ m in wave equations. A 7 nm semiconductor node dimension is 7×10⁻⁹ m—useful when comparing to atomic radii quoted in metres.`,
	},

	[key("Length", "Light Year", "Kilometre")]: {
		whenToUse: msg`Convert light-years to kilometres when popular science distances (nearby stars, galaxy separations) must become a terrestrial kilometre scale for comparison or calculation. Planetarium scripts and astronomy outreach use this pair. One Julian light-year is about 9.4607×10¹² km.`,
		commonMistakes: msg`A light-year is distance, not time—do not treat “4 years” as the converted value. Parsecs and astronomical units are different; convert ly→km, do not mix AU factors casually. Rounding to “9.5 trillion km” is fine for talk, not for precise ephemerides.`,
		realWorldExample: msg`Proxima Centauri at about 4.25 ly is roughly 4.02×10¹³ km away. Saying that out loud shows why probes take decades even at high speed: kilometres make the gap concrete.`,
	},

	// ── Temperature ─────────────────────────────────────────────────────────

	[key("Temperature", "Celsius", "Fahrenheit")]: {
		whenToUse: msg`Convert Celsius to Fahrenheit for cooking, weather apps, and HVAC setpoints when a recipe or forecast is metric but your oven or thermostat shows °F. Travelers and home bakers cross this daily. Use °F = °C × 9/5 + 32, not a simple scale factor.`,
		commonMistakes: msg`Multiplying by 2 and adding 30 is a rough estimate only—off by several degrees for candy and meat temps. Forgetting the +32 offset after scaling is the most common algebra slip. Do not treat a 10 °C change as a 10 °F change; the degree sizes differ.`,
		realWorldExample: msg`Oven roast at 180 °C is 356 °F (often rounded to 350 °F on US dials). A mild 22 °C room is about 72 °F—typical comfort wording in US building guides.`,
	},

	[key("Temperature", "Fahrenheit", "Celsius")]: {
		whenToUse: msg`Convert Fahrenheit to Celsius for European recipes, lab protocols, and weather comparisons when the source is US customary. Fever checks and pool heaters also flip between scales. Use °C = (°F − 32) × 5/9.`,
		commonMistakes: msg`Subtracting 32 after scaling instead of before reverses the formula. Body-temperature shortcuts (“subtract 30, halve”) are rough; 98.6 °F is 37 °C exactly in the usual teaching pair, but real readings vary. Freezing is 32 °F, not 0 °F—do not map 0 °F to 0 °C.`,
		realWorldExample: msg`A candy thermometer reading of 300 °F is about 149 °C for soft-crack stage in metric candy charts. Weather at 68 °F is 20 °C—handy when packing for a city that posts only Celsius.`,
	},

	[key("Temperature", "Celsius", "Kelvin")]: {
		whenToUse: msg`Convert Celsius to Kelvin for science, gas laws, and color-temperature adjacent physics where absolute temperature is required. Chemistry labs and meteorology (potential temperature) use Kelvin. Add 273.15; the degree size matches Celsius.`,
		commonMistakes: msg`Using 273 instead of 273.15 is fine for rough work but wrong for precise calorimetry. Multiplying by 273.15 instead of adding is a frequent calculator error. Kelvin is never written with a degree symbol in modern SI (write 300 K, not 300 °K).`,
		realWorldExample: msg`Water boiling at 100 °C is 373.15 K in steam-table lookups. A lab bath at −40 °C is 233.15 K—below the freezing point of mercury, relevant for some thermometer discussions.`,
	},

	[key("Temperature", "Kelvin", "Celsius")]: {
		whenToUse: msg`Convert Kelvin to Celsius when a datasheet, blackbody formula, or cryogenics note lists K but you need everyday Celsius for baths, freezers, or weather context. Subtract 273.15. Space and semiconductor docs often stay in K until the last step.`,
		commonMistakes: msg`Subtracting 273 from a value already near room temperature can look “almost right” and hide a 0.15 K bias. Negative Kelvin is physically invalid—if you see it, the input was wrong. Do not apply the Fahrenheit offset formulas to Kelvin.`,
		realWorldExample: msg`Liquid nitrogen’s boiling point near 77 K is about −196 °C. A sensor rated to 233 K survives down to −40 °C, a common automotive electronics floor.`,
	},

	[key("Temperature", "Fahrenheit", "Kelvin")]: {
		whenToUse: msg`Convert Fahrenheit to Kelvin when US process specs (°F) feed equations that need absolute temperature—ideal gas work, thermal noise, or materials science. Convert °F→°C first, then add 273.15, or use K = (°F + 459.67) × 5/9.`,
		commonMistakes: msg`Adding 273.15 directly to Fahrenheit skips the scale change and produces nonsense. Rankine (°R) is the Fahrenheit-sized absolute scale; do not label Rankine values as Kelvin. Oven setpoints in °F are not absolute temperatures for gas-law homework.`,
		realWorldExample: msg`A kiln note of 1800 °F is about 1255 K—useful when a ceramics paper cites peak temperature in kelvin. Room temperature ~70 °F is roughly 294 K for electronics thermal margins.`,
	},

	[key("Temperature", "Kelvin", "Fahrenheit")]: {
		whenToUse: msg`Convert Kelvin to Fahrenheit for US engineering reviews when research papers quote absolute temperature but shop-floor instruments read °F. Aerospace and HVAC commissioning sometimes need this bridge. Use °F = K × 9/5 − 459.67.`,
		commonMistakes: msg`Applying only the Celsius↔Fahrenheit transform to a Kelvin number without the absolute offset fails. Absolute zero is 0 K (−459.67 °F), not −273 °F. Keep significant figures: converting 300 K to 80.33 °F is more honest than “80 °F” for lab work.`,
		realWorldExample: msg`A detector cooled to 77 K is about −321 °F—colder than dry ice (−109 °F). Human skin temperature ~306 K is about 91 °F, matching infrared thermometer expectations.`,
	},

	// ── Area ────────────────────────────────────────────────────────────────

	[key("Area", "Square Metre", "Square Foot")]: {
		whenToUse: msg`Convert square metres to square feet for apartments, offices, and flooring quotes when the listing is metric but US buyers think in sq ft. Real-estate portals and rug shops use this constantly. Multiply m² by about 10.7639.`,
		commonMistakes: msg`Multiplying by 10 is a rough rule that undershoots by ~7%. Converting only one side’s metres to feet then squaring is correct; converting the area with a length factor (×3.28) without squaring is wrong. Balcony and interior areas are often priced differently—convert each zone separately if needed.`,
		realWorldExample: msg`A 75 m² flat is about 807 sq ft—typical one-bedroom sizing talk in US cities. Ordering vinyl for 20 m² means roughly 215 sq ft; add waste percentage after converting.`,
	},

	[key("Area", "Square Foot", "Square Metre")]: {
		whenToUse: msg`Use square feet to square metres for EU building permits, metric tile boxes, and international property comparisons when the plan started in US customary units. Architects exporting CAD from imperial templates need m². Divide sq ft by 10.7639, or multiply by 0.092903.`,
		commonMistakes: msg`Using 0.1 m² per sq ft overstates area. Office “usable” vs “rentable” sq ft still convert with the same factor—definitions differ, units do not. Do not convert linear feet of baseboard as if they were square feet.`,
		realWorldExample: msg`A 1,200 sq ft bungalow is about 111.5 m² for a European energy certificate. A 200 sq ft deck needs about 18.6 m² of board coverage before waste.`,
	},

	[key("Area", "Acre", "Hectare")]: {
		whenToUse: msg`Convert acres to hectares for farmland, conservation land, and solar-farm footprints when US acreage must match metric agricultural stats. One hectare is 10,000 m²; one acre is 4,046.8564224 m², so 1 acre ≈ 0.404686 ha.`,
		commonMistakes: msg`Treating acres and hectares as equal roughly doubles or halves land area in conversation. Survey acres (especially older deeds) can differ slightly from the international acre—confirm the jurisdiction. Do not convert acre-feet (volume of irrigation water) with an area converter.`,
		realWorldExample: msg`A 40-acre parcel is about 16.2 hectares—common quarter-quarter section talk in metric reports. A 5-acre hobby farm is roughly 2.02 ha for EU subsidy forms.`,
	},

	[key("Area", "Hectare", "Acre")]: {
		whenToUse: msg`Convert hectares to acres when metric land registries, vineyard sizes, or park plans must be explained to an audience that uses acres. Multiply hectares by about 2.47105. Forestry and agronomy papers often need this for US readers.`,
		commonMistakes: msg`Using “2.5 acres per hectare” is close but high by about 1%. Confusing hectares with square kilometres (100 ha = 1 km²) blows land deals by two orders of magnitude. Pasture stocking rates change with area unit—convert area before applying head-per-acre rules.`,
		realWorldExample: msg`A 10 ha orchard is about 24.7 acres. A city park of 2.5 ha is roughly 6.2 acres—useful on bilingual trail signs.`,
	},

	[key("Area", "Square Kilometre", "Square Mile")]: {
		whenToUse: msg`Convert square kilometres to square miles for country size, wildfire perimeters, and city area comparisons in international news. Geographers and emergency management briefings use both. One square mile is 2.589988110336 km².`,
		commonMistakes: msg`Converting km to miles then forgetting to square the factor (use ÷2.59, not ÷1.61) understates area badly. Lakes and admin boundaries may use different shoreline rules—unit conversion does not fix definition differences. Do not mix nautical miles into land area.`,
		realWorldExample: msg`A 1,000 km² national park is about 386 sq mi. A wildfire mapped at 50 km² covers roughly 19.3 sq mi for US incident reports.`,
	},

	[key("Area", "Square Mile", "Square Kilometre")]: {
		whenToUse: msg`Use square miles to square kilometres when US state or county areas must appear in metric atlases and climate datasets. Multiply sq mi by about 2.58999. Journalists localizing US stories for global readers need this pair.`,
		commonMistakes: msg`Multiplying by 1.6 (the linear mile factor) instead of ~2.59 is the standard mistake. Township grids and “sections” (1 sq mi) convert cleanly; irregular coastal counties still use the same factor on their reported area. Keep water vs land area labels intact after converting.`,
		realWorldExample: msg`Rhode Island’s land area near 1,034 sq mi is about 2,678 km². A 10 sq mi flood zone is roughly 25.9 km² for metric emergency maps.`,
	},

	[key("Area", "Square Inch", "Square Centimetre")]: {
		whenToUse: msg`Convert square inches to square centimetres for packaging labels, gasket cross-sections, and sheet sticker sizes when US print specs meet metric manufacturing. Multiply in² by 6.4516 exactly (since 1 in = 2.54 cm).`,
		commonMistakes: msg`Converting inches to cm then forgetting to square (×2.54 instead of ×6.4516) understates area by a factor of 2.54. Screen sizes in inches are usually diagonals, not areas—do not convert a “27-inch” monitor as 27 in². Paper “lb” weights are not areas.`,
		realWorldExample: msg`A 4×6 inch photo is 24 in², about 155 cm² of print area. A 1 in² ventilation hole is 6.45 cm² for metric airflow notes.`,
	},

	[key("Area", "Square Centimetre", "Square Inch")]: {
		whenToUse: msg`Convert square centimetres to square inches for US packaging die-lines, bandage sizes, and small panel cutouts when the CAD file is metric. Divide cm² by 6.4516. Print finishers and medical device labeling use this often.`,
		commonMistakes: msg`Using ÷2.54 on an area value is wrong—that is a length factor. Skin lesion charts sometimes mix mm² and cm²; convert to one unit before switching to in². Do not confuse cm² with cc (cm³) used for volume.`,
		realWorldExample: msg`A 50 cm² adhesive patch is about 7.75 in²—compare to US first-aid box labels. A business card near 46 cm² is roughly 7.1 in².`,
	},

	[key("Area", "Square Metre", "Hectare")]: {
		whenToUse: msg`Convert square metres to hectares for gardens, solar arrays, and small farms when a site survey in m² must match agricultural hectare language. Divide m² by 10,000. Planners jump from building footprints to plot scale with this pair.`,
		commonMistakes: msg`Dividing by 1,000 (thinking like metres→kilometres) makes the plot 10× too large in hectares. A hectare is 100 m × 100 m, not 1,000 m × 1,000 m. Keep building footprint m² separate from whole-parcel hectares in reports.`,
		realWorldExample: msg`A 2,500 m² community garden is 0.25 ha. A 40,000 m² warehouse yard is 4 ha—handy for logistics land-use filings.`,
	},

	[key("Area", "Acre", "Square Metre")]: {
		whenToUse: msg`Convert acres to square metres when a US land deed in acres must feed metric civil engineering, drainage calculations, or EU-style planning apps. One acre is exactly 4,046.8564224 m². Surveyors and solar designers use this for panel layout density.`,
		commonMistakes: msg`Using 4,000 m² per acre is a rough cut that drifts ~1.2%. Acre-feet measure water volume, not area—do not drop the “feet” and convert as pure acres. City lots listed in fractions of an acre need full decimal acres before multiplying.`,
		realWorldExample: msg`A half-acre suburban lot is about 2,023 m². A 10-acre solar field offers roughly 40,469 m² of land before setbacks and roads.`,
	},

	// ── Volume ──────────────────────────────────────────────────────────────

	[key("Volume", "Litre", "Cubic Metre")]: {
		whenToUse: msg`Convert litres to cubic metres for water tanks, aquarium sums, and HVAC airflow-adjacent liquid volumes when SI building models want m³. One cubic metre is exactly 1,000 L. Civil and aquarium hobby math share this pair.`,
		commonMistakes: msg`Treating litres and m³ as interchangeable off-by-1000 errors. Rainfall in mm over an area yields litres or m³ only after multiplying by surface area—do not convert mm rain as if it were litres. Keep oil barrels and US gallons out of this SI-only path unless converted first.`,
		realWorldExample: msg`A 500 L rain barrel is 0.5 m³. A small pool holding 25,000 L is 25 m³ for chemical dosing charts that use grams per m³.`,
	},

	[key("Volume", "Cubic Metre", "Litre")]: {
		whenToUse: msg`Convert cubic metres to litres for bottled-water equivalents, fish stocking guides, and pump capacity when the engineering drawing uses m³. Multiply m³ by 1,000. Municipal water reports often flip between these for public communication.`,
		commonMistakes: msg`Multiplying by 100 or 10,000 from digit-counting slips. Concrete “cubic metres” are solid volume; do not assume the same number of litres of mix water without the recipe. Gas metres in m³ are not liquid litres without density and state conditions.`,
		realWorldExample: msg`A 3 m³ water delivery is 3,000 L—about sixty 50 L barrels. An aquarium billed as 0.36 m³ is a 360 L tank in hobby shop language.`,
	},

	[key("Volume", "Millimetre", "Litre")]: {
		whenToUse: msg`Convert millilitres (named Millimetre in this volume set) to litres for medicine cups, cocktail jiggers, and lab aliquots when labels use mL but dosing math wants litres. Divide millilitres by 1,000. Pharmacies and home brewing share this scale jump.`,
		commonMistakes: msg`Confusing this volume unit with length millimetres will derail DIY projects—here “Millimetre” means millilitre (mL). Dropping or adding three zeros is the usual arithmetic bug. Do not equate mL with grams unless density is 1 g/mL (true for water near room temperature, not for syrups or oils).`,
		realWorldExample: msg`A 750 mL wine bottle is 0.75 L. A 5 mL medicine teaspoon is 0.005 L—useful when a protocol lists litres only.`,
	},

	[key("Volume", "Litre", "Millimetre")]: {
		whenToUse: msg`Convert litres to millilitres when a metric recipe, IV bag scale, or fuel additive dose starts in litres but syringes and measuring cups read mL. Multiply litres by 1,000. Clinical and culinary workflows both need this.`,
		commonMistakes: msg`Writing “mL” on a value still in litres by habit (1 L ≠ 1 mL). Baby formula and concentrate ratios break if you convert volume but keep the powder mass wrong. Carbonated beverage “litres” on bottles are liquid volume, not dissolved-gas volume.`,
		realWorldExample: msg`A 1.5 L soft drink is 1,500 mL for calorie apps that expect millilitres. Mixing 0.25 L of stock means 250 mL on a kitchen measuring jug.`,
	},

	[key("Volume", "Cup", "Millimetre")]: {
		whenToUse: msg`Convert cups to millilitres when baking and cooking across US/metric recipes. Cup sizes vary by country; this tool’s Cup unit maps to its configured cup definition—check which cup your recipe assumes (US legal cup is 240 mL; many metric recipes use 250 mL).`,
		commonMistakes: msg`Assuming every “cup” is 250 mL when the recipe is US customary (240 mL) shifts sugar and flour enough to change texture. Scooping flour by volume is already imprecise—conversion cannot fix packing density. Liquid cups and dry cups are the same volume unit; weight still differs by ingredient.`,
		realWorldExample: msg`One US cup of water is 240 mL; two cups of broth in a soup is 480 mL. A metric cake that wants 250 mL milk is essentially one metric cup, not a level US cup.`,
	},

	[key("Volume", "Millimetre", "Cup")]: {
		whenToUse: msg`Convert millilitres to cups when a European recipe lists mL but your scoop set is cups only. Divide by your cup size (often 240 or 250 mL). Home bakers scaling drink and batter volumes use this daily.`,
		commonMistakes: msg`Using 236.59 mL (US customary cup) vs 240 mL (US legal cup) vs 250 mL (metric cup) without matching the recipe’s origin. Thick batters measured in a liquid cup still need leveling technique. Do not convert mL of flour to cups and then to grams with a single universal factor.`,
		realWorldExample: msg`120 mL of oil is ½ US cup (240 mL cup). A 15 mL vanilla note is 1 tablespoon, not a full cup—sanity-check small millilitre amounts before calling them cups.`,
	},

	[key("Volume", "Cubic Foot", "Litre")]: {
		whenToUse: msg`Convert cubic feet to litres for fridge interiors, grow-tent volumes, and compressed-air receiver sizing when US appliance specs meet metric lab or aquarium gear. One cubic foot is about 28.3168 L.`,
		commonMistakes: msg`Using 30 L per ft³ is a rough estimate (~6% high). Shipping “dimensional weight” in ft³ is not the same as liquid litres of capacity—confirm whether the spec is internal volume. Natural gas ccf is hundred cubic feet of gas, not liquid litres.`,
		realWorldExample: msg`A 18 ft³ refrigerator is about 510 L—compare to European fridge labels in litres. A 2 ft³ minifridge is roughly 56.6 L of internal volume.`,
	},

	[key("Volume", "Litre", "Cubic Foot")]: {
		whenToUse: msg`Convert litres to cubic feet when metric cooler, tank, or heater capacities must match US appliance and HVAC catalog language. Divide litres by about 28.3168. Importers localizing EU product sheets use this pair.`,
		commonMistakes: msg`Dividing by 28 or 30 casually for sales copy is fine; for chargeable shipping volume use the precise factor. Do not convert litres of fuel directly to engine displacement in cubic inches without the right chain. Chest freezer “litres” are usually internal volume, same idea as ft³ capacity.`,
		realWorldExample: msg`A 200 L chest freezer is about 7.06 ft³ on US retail tags. A 1000 L IBC tote is roughly 35.3 ft³ for warehouse slot planning.`,
	},

	[key("Volume", "Tablespoon (Metric)", "Teaspoon (Metric)")]: {
		whenToUse: msg`Convert metric tablespoons to teaspoons when scaling dressings, baking powder, and medicine-style kitchen doses. In the metric set used here, 1 tablespoon = 3 teaspoons (15 mL vs 5 mL). Recipe scaling and substitution both need this.`,
		commonMistakes: msg`US customary tablespoons are 14.8 mL and Australian tablespoons are 20 mL—do not assume every tbsp is metric 15 mL. Heaping vs level spoons dominate error more than unit math. Do not convert spoon volumes to grams without the ingredient density.`,
		realWorldExample: msg`2 metric tablespoons of olive oil equal 6 metric teaspoons—handy when you only have a 5 mL spoon. A recipe calling for 1½ tbsp yeast is 4.5 tsp.`,
	},

	[key("Volume", "Teaspoon (Metric)", "Tablespoon (Metric)")]: {
		whenToUse: msg`Convert metric teaspoons to tablespoons to simplify long spoon counts in cooking and home remedies. Divide teaspoons by 3 when using the metric 5 mL / 15 mL pair. Cake recipes with many small leavening doses benefit from consolidating to tablespoons.`,
		commonMistakes: msg`Using 4 teaspoons per tablespoon (an older US folk rule for some ingredients) breaks metric recipes. Liquid medicines may use a “teaspoon” marking that is not exactly 5 mL—prefer the mL scale on the syringe. Salt and spices packed tightly change mass a lot even when volume conversion is perfect.`,
		realWorldExample: msg`9 metric teaspoons of cocoa is 3 metric tablespoons for a brownie batch. A ½ tsp salt pinch is 1/6 tablespoon—usually left as teaspoons for readability.`,
	},

	[key("Volume", "Hectolitre", "Litre")]: {
		whenToUse: msg`Convert hectolitres to litres for brewery output, wine harvest tanks, and agricultural liquid fertilizer when industry quotes hL but cellar or field gear is labeled in L. Multiply hL by 100. European beer statistics are often in hectolitres.`,
		commonMistakes: msg`Confusing hectolitres with hectolitres of pure alcohol (a tax statistic) versus beer volume. Using ×1,000 (as if converting kL) overshoots. Decalitres (10 L) are another step—do not mix daL and hL labels on farm tanks.`,
		realWorldExample: msg`A brewery making 50 hL per batch produces 5,000 L—about 88 half-hectolitre kegs depending on keg size. A 2 hL fermenter is a 200 L vessel.`,
	},

	[key("Volume", "Litre", "Hectolitre")]: {
		whenToUse: msg`Convert litres to hectolitres for brewery KPIs, dairy intakes, and bulk wine contracts that report in hL. Divide litres by 100. Trade statistics and cooperative milk collections often prefer hectolitres.`,
		commonMistakes: msg`Dividing by 1,000 gives cubic metres, not hectolitres (though 1 m³ = 10 hL). Small-batch homebrew in litres rarely needs hL—avoid forcing tiny numbers like 0.02 hL unless the form requires it. Keep temperature correction for beer volume separate from unit conversion.`,
		realWorldExample: msg`A 2,500 L bright tank is 25 hL on a production schedule. Milk intake of 12,000 L in a morning is 120 hL for a co-op report.`,
	},

	// ── Weight (new popular pairs) ──────────────────────────────────────────

	[key("Weight", "Kilogram", "Pound (Avoirdupois)")]: {
		whenToUse: msg`Convert kilograms to avoirdupois pounds for body weight, luggage, and gym plates when scales or airlines mix SI and US customary units. Shipping rate cards and protein powder tubs cross this pair constantly. One kilogram is about 2.20462 lb.`,
		commonMistakes: msg`Using 2.2 lb/kg is fine for luggage estimates but drifts on commercial invoices. Do not confuse avoirdupois pounds with troy pounds used for precious metals. Force in pounds-force vs mass in pounds is a physics trap—this conversion is mass to mass.`,
		realWorldExample: msg`A 23 kg airline allowance is about 50.7 lb—just over a common 50 lb US checked-bag limit. A 100 kg barbell is roughly 220.5 lb on a US plate math board.`,
	},

	[key("Weight", "Pound (Avoirdupois)", "Kilogram")]: {
		whenToUse: msg`Convert avoirdupois pounds to kilograms for passport medical forms, EU shipping labels, and metric gym programs when the starting number is in pounds. Multiply lb by 0.45359237 exactly. Couriers and coaches use this daily.`,
		commonMistakes: msg`Halving the pound value (“close enough to kg”) is ~10% low. Baby weight in pounds and ounces needs ounces converted (16 oz = 1 lb) before switching to kg. Do not use troy or tower pounds here.`,
		realWorldExample: msg`A 180 lb adult is about 81.6 kg on a metric chart. A 40 lb bag of dog food is roughly 18.1 kg for shelves labeled only in kilograms.`,
	},

	[key("Weight", "Gram", "Ounce (Avoirdupois)")]: {
		whenToUse: msg`Convert grams to avoirdupois ounces for coffee beans, mailers, and recipe scaling when kitchen scales show grams but US packaging lists ounces. One ounce is exactly 28.349523125 g. Portion control and postage brackets use this scale.`,
		commonMistakes: msg`Using 30 g per ounce is a rough kitchen shortcut (~6% high). Fluid ounces measure volume, not weight—do not convert fl oz with this mass pair. Troy ounces for silver and gold differ from avoirdupois ounces.`,
		realWorldExample: msg`A 250 g coffee bag is about 8.82 oz—near a common 8 oz retail size after rounding. A 28 g protein snack is essentially 1 oz.`,
	},

	[key("Weight", "Ounce (Avoirdupois)", "Gram")]: {
		whenToUse: msg`Convert avoirdupois ounces to grams for metric baking, lab sample limits, and nutrition labels when the US package speaks in ounces. Multiply oz by 28.349523125. Letter mail and spice jars often need grams for customs forms.`,
		commonMistakes: msg`Treating 1 oz as 25 g or 30 g shifts chocolate tempering and postage. “Net wt 16 oz” is one pound (453.6 g), not 16 × 30. Distinguish ounce-force if you came from an older engineering table.`,
		realWorldExample: msg`A 12 oz steak is about 340 g—handy for metric doneness charts per centimetre thickness. First-class mail at 3.5 oz is about 99 g.`,
	},

	[key("Weight", "Kilogram", "Stone")]: {
		whenToUse: msg`Convert kilograms to stone for body weight in the UK and Ireland, where stone remains common in conversation and some medical contexts. One stone is 14 avoirdupois pounds, exactly 6.35029318 kg. Athletes and clinics still quote stone and pounds together.`,
		commonMistakes: msg`Forgetting the leftover pounds after whole stone (11 st 4 lb ≠ 11.4 st in the casual sense people speak). Using 6 kg per stone is rough. Stone is not used for freight—do not put stone on a bill of lading.`,
		realWorldExample: msg`70 kg is about 11 stone 0 lb (11.02 st). A fighter listed at 12 stone is 76.2 kg—useful when comparing to metric weight classes.`,
	},

	[key("Weight", "Stone", "Kilogram")]: {
		whenToUse: msg`Convert stone to kilograms when a UK weight mention must enter a metric BMI calculator, racing form, or EU medical record. Multiply stone by 6.35029318. Include any extra pounds by converting them to kg and adding.`,
		commonMistakes: msg`Entering “11.6 stone” when someone meant 11 st 6 lb (11 stone + 6/14 ≈ 11.43 st) misstates mass. Livestock “stone” traditions vary historically—stick to the 14 lb stone for people. Do not mix stone with hundredweight without knowing long vs short hundredweight.`,
		realWorldExample: msg`10 stone is 63.5 kg. Someone at 13 st 7 lb is 13.5 stone ≈ 85.7 kg for a metric hospital chart.`,
	},

	[key("Weight", "Tonne (Metric)", "Pound (Avoirdupois)")]: {
		whenToUse: msg`Convert metric tonnes to avoirdupois pounds for freight, scrap metal, and agricultural loads when SI shipping weight must meet US scale tickets. One tonne is 1,000 kg ≈ 2,204.62 lb. Logistics brokers quote both constantly.`,
		commonMistakes: msg`Confusing metric tonnes with US short tons (2,000 lb) or UK long tons (2,240 lb). A “ton” in casual US speech is usually the short ton, ~9% lighter than a tonne. Crane limits may be in tons-force—confirm mass vs force.`,
		realWorldExample: msg`A 2 t palletized load is about 4,409 lb—check a forklift rated in pounds. A 0.5 t delivery is roughly 1,102 lb for a US pickup payload chart.`,
	},

	[key("Weight", "Pound (Avoirdupois)", "Tonne (Metric)")]: {
		whenToUse: msg`Convert avoirdupois pounds to metric tonnes for export documents, port tariffs, and metric axle-load rules when the weighbridge ticket is in pounds. Divide lb by about 2,204.62. Containerized cargo filings often need tonnes.`,
		commonMistakes: msg`Dividing by 2,000 gives short tons, not metric tonnes. Mixing net and gross pounds before converting still yields the wrong tonne figure for duties. Very small pound amounts become awkward tonne decimals—prefer kilograms under about 100 lb.`,
		realWorldExample: msg`A 4,400 lb machine is about 2.00 t for a metric bill of lading. A 500 lb crate is roughly 0.227 t (227 kg)—often better written in kilograms on the same form.`,
	},

	[key("Weight", "Gram", "Kilogram")]: {
		whenToUse: msg`Convert grams to kilograms for shopping, lab reagents, and postage when fine scales use grams but tariffs and recipes batch in kilograms. Divide grams by 1,000. Food service and compounding pharmacies jump this scale often.`,
		commonMistakes: msg`Sliding three decimal places the wrong way turns 500 g into 500 kg. Nutrition labels in grams per serving still need portion count before totaling kilograms for bulk prep. Do not confuse g with mg on medicine labels.`,
		realWorldExample: msg`A 750 g loaf is 0.75 kg. Buying 2,500 g of flour is a 2.5 kg bag—standard supermarket sizing.`,
	},

	[key("Weight", "Kilogram", "Gram")]: {
		whenToUse: msg`Convert kilograms to grams for baking percentages, supplement scoops, and chemistry stock solutions when the bulk bag is in kg but the formula lists grams. Multiply kg by 1,000. Baker’s percentages become easier in grams.`,
		commonMistakes: msg`Writing 1.5 kg as 1.5 g on a scale that reads grams underdoses by 1,000×. Shipping dimensional weight in kg is unrelated to converting product mass to grams—keep those workflows separate. Jewelry grams are mass; carats are different.`,
		realWorldExample: msg`1.2 kg of sugar for syrup is 1,200 g on a recipe card. A 0.025 kg spice purchase is 25 g—typical jar size.`,
	},

	[key("Weight", "Milligram", "Gram")]: {
		whenToUse: msg`Convert milligrams to grams for medicine, caffeine content, and analytical chemistry when labels use mg but balances or protocols use grams. Divide mg by 1,000. Pharmacy math depends on this shift.`,
		commonMistakes: msg`Confusing mg with µg (micrograms)—a 1,000× error that is dangerous for medication. Tablet strength in mg is not the same as dose if you take multiple tablets—convert the total mass you swallow. Do not assume mg of a vitamin equals mg of elemental nutrient without the salt form factor.`,
		realWorldExample: msg`A 500 mg pain tablet is 0.5 g of drug substance labeled strength. Caffeine at 80 mg in espresso is 0.08 g—useful when a lab protocol wants grams.`,
	},

	[key("Weight", "Gram", "Milligram")]: {
		whenToUse: msg`Convert grams to milligrams when a lab balance reading in grams must match pharmaceutical or supplement labels in mg. Multiply grams by 1,000. Compounding and nutrition science use this constantly.`,
		commonMistakes: msg`Moving the decimal three places left instead of right understates dose. Purity percentages apply to mass—convert units first, then apply purity. Moisture loss can change gram readings on a balance without changing the labeled mg of active ingredient.`,
		realWorldExample: msg`0.25 g of caffeine powder is 250 mg—matching many anhydrous caffeine capsule labels. A 1.5 g electrolyte packet is 1,500 mg of total salts before splitting components.`,
	},

	// ── Speed ───────────────────────────────────────────────────────────────

	[key("Speed", "Kilometre per hour", "Mile per hour")]: {
		whenToUse: msg`Convert km/h to mph for road speed limits, car dashboards, and running pace talk when traveling between metric and US/UK customary roads. Divide km/h by 1.609344. Rental cars and GPS unit settings drive this daily.`,
		commonMistakes: msg`Using ÷1.6 is fine for rough driving; for calibration use the exact factor. Wind forecasts in km/h vs mph change perceived severity—convert before comparing to Beaufort mental models. Do not convert pace min/km with a pure speed formula without inverting correctly.`,
		realWorldExample: msg`A 100 km/h highway limit is about 62 mph. A city 50 km/h zone is roughly 31 mph—close to many US 30 mph neighborhood limits.`,
	},

	[key("Speed", "Mile per hour", "Kilometre per hour")]: {
		whenToUse: msg`Convert mph to km/h when US speed limits, bike computers, or sports radar guns must match metric signage and telemetry. Multiply mph by 1.609344. Touring cyclists and fleet managers localize reports this way.`,
		commonMistakes: msg`Adding 50% (×1.5) understates true km/h. Aircraft indicated airspeed in knots is not mph—convert knots separately. Treadmill mph to km/h is the same factor as road speed.`,
		realWorldExample: msg`70 mph on an interstate is about 113 km/h. A 6 mph walking pace is roughly 9.7 km/h for metric fitness watches.`,
	},

	[key("Speed", "Metre per second", "Kilometre per hour")]: {
		whenToUse: msg`Convert metres per second to kilometres per hour for weather winds, physics problems, and athletics when SI base speed must become everyday road units. Multiply m/s by 3.6 exactly. Meteorology and school labs share this pair.`,
		commonMistakes: msg`Multiplying by 3.0 or forgetting 3.6 leaves wind speeds looking too calm. Swimming and current speeds in m/s look tiny next to km/h—expect large-looking km/h numbers. Do not mix per-second pace clocks with this without converting time bases.`,
		realWorldExample: msg`A gale at 20 m/s is 72 km/h. A sprinter near 10 m/s peaks around 36 km/h—useful when comparing to traffic speeds.`,
	},

	[key("Speed", "Kilometre per hour", "Metre per second")]: {
		whenToUse: msg`Convert km/h to m/s for drag equations, ballistic apps, and lab write-ups that need SI base units. Divide km/h by 3.6. Engineering fluid notes and school physics prefer m/s.`,
		commonMistakes: msg`Dividing by 3.0 or by 60 (thinking minutes) breaks the result. Car crash Δv in km/h must become m/s before kinetic-energy formulas in joules. Steady cruise in km/h converts cleanly; gust factors are separate meteorology.`,
		realWorldExample: msg`90 km/h traffic is 25 m/s—handy for estimating stopping-distance thought experiments. A 18 km/h bike speed is 5 m/s.`,
	},

	[key("Speed", "Mile per hour", "Foot per second")]: {
		whenToUse: msg`Convert mph to feet per second for ballistics, amusement-ride specs, and US engineering notes that keep length in feet. Multiply mph by 1.46667 (since 88 ft/s = 60 mph). Sports biomechanics in customary units use this.`,
		commonMistakes: msg`Using 1.5 ft/s per mph is close; precision work wants 22/15. Free-fall “fps” tables are not vehicle mph conversions—context matters. Do not confuse ft/s with ft/min used in some conveyor specs.`,
		realWorldExample: msg`60 mph is exactly 88 ft/s—the classic driving-physics mnemonic. A baseball at 90 mph is 132 ft/s toward the plate.`,
	},

	[key("Speed", "Foot per second", "Mile per hour")]: {
		whenToUse: msg`Convert feet per second to mph when a US lab, wind-tunnel, or projectile chronograph reads ft/s but you want road-speed intuition. Divide ft/s by 1.46667, or use mph = ft/s × 15/22. Safety briefings often want mph.`,
		commonMistakes: msg`Dividing by 1.5 is a rough estimate. River currents quoted in ft/s can look slow in mph—0–5 mph still matters for boats. Chronograph “fps” for airsoft vs firearms differ in magnitude; convert the number you actually measured.`,
		realWorldExample: msg`44 ft/s is 30 mph—a common residential speed comparison. A fall speed of 100 ft/s is about 68 mph before drag limits.`,
	},

	[key("Speed", "Knot", "Kilometre per hour")]: {
		whenToUse: msg`Convert knots to km/h for marine and aviation contexts when instruments show knots but coastal forecasts or metric pilots want km/h. One knot is one nautical mile per hour = 1.852 km/h exactly. Charts and AIS traffic use knots; phones often show km/h.`,
		commonMistakes: msg`Using the statute-mile factor 1.609 instead of 1.852 understates maritime speed. Airspeed indicated in knots is not ground speed—wind correction is separate. Do not treat knot as a land mph synonym.`,
		realWorldExample: msg`A 20-knot wind is 37 km/h—near a strong breeze on land-based km/h apps. A ship cruising at 15 kn makes about 27.8 km/h over water.`,
	},

	[key("Speed", "Kilometre per hour", "Knot")]: {
		whenToUse: msg`Convert km/h to knots when metric weather apps must match nautical instruments, sailing polars, or aviation METAR-style expectations. Divide km/h by 1.852. Harbor masters and student pilots do this when switching unit systems.`,
		commonMistakes: msg`Dividing by 1.6 (statute thinking) yields the wrong knot value. Gusts in km/h converted without noting “gust” vs sustained mislead seamanship decisions. GPS km/h over ground is not the same as speed through water in knots.`,
		realWorldExample: msg`37 km/h wind is 20 knots—common small-craft advisory territory depending on local rules. A ferry at 40 km/h is about 21.6 kn.`,
	},

	[key("Speed", "Metre per second", "Mile per hour")]: {
		whenToUse: msg`Convert m/s to mph when SI sensor logs, drone telemetry, or physics results must be explained in US customary road units. Multiply m/s by about 2.23694. Research papers often leave speed in m/s until the public summary.`,
		commonMistakes: msg`Using ×2.2 is rough. Mixing m/s wind with mph storm reports without conversion makes Category talk inconsistent. Vertical speed in m/s (sink rate) is not the same conversation as horizontal mph.`,
		realWorldExample: msg`10 m/s is about 22.4 mph—a stiff cycling headwind. Terminal-velocity ballpark 50 m/s is roughly 112 mph before posture and drag details.`,
	},

	[key("Speed", "Mile per hour", "Metre per second")]: {
		whenToUse: msg`Convert mph to m/s for simulations, crash reconstruction inputs, and metric scientific models fed by US speed limits or radar guns. Divide mph by about 2.23694. Automotive research bridging NHTSA and SI tools needs this.`,
		commonMistakes: msg`Dividing by 2.0 overstates m/s. Posted ramp speeds in mph become unsafe inputs if left unconverted in a metric model. Treadmill mph to m/s uses the same factor as vehicle speed.`,
		realWorldExample: msg`30 mph is about 13.4 m/s for a urban crash energy sketch. A 100 mph pitch (extreme) would be ~44.7 m/s—far above normal baseball, showing why unit checks matter.`,
	},

	// ── Time ────────────────────────────────────────────────────────────────

	[key("Time", "Minute", "Second")]: {
		whenToUse: msg`Convert minutes to seconds for workout intervals, exposure times, and PLC timers when coaches or cameras speak in minutes but devices count seconds. Multiply minutes by 60. HIIT clocks and lab protocols share this pair.`,
		commonMistakes: msg`Using 100 seconds per minute is a decimal-time fantasy, not civil time. Decimal minutes (1.5 min) are 90 s, not 1 min 5 s. Pace notation 4:30 per km is minutes:seconds, already partly in seconds—parse before converting whole minutes only.`,
		realWorldExample: msg`A 3-minute plank hold is 180 seconds on a phone timer. Developing film for 7.5 minutes means 450 seconds on a metronome-style process clock.`,
	},

	[key("Time", "Second", "Minute")]: {
		whenToUse: msg`Convert seconds to minutes for race results, microwave experiments, and API timeouts when logs show raw seconds. Divide seconds by 60. Sports broadcasting and backend SLAs both humanize seconds this way.`,
		commonMistakes: msg`Integer division that drops the remainder hides overtime seconds—keep a decimal or a seconds remainder. Leap seconds affect UTC civil time rarely and do not change everyday workout math. Do not convert seconds of arc (angles) with a time converter.`,
		realWorldExample: msg`150 seconds of rest is 2.5 minutes between sets. A 3,600-second timeout is 60 minutes—one hour for a long job.`,
	},

	[key("Time", "Hour", "Minute")]: {
		whenToUse: msg`Convert hours to minutes for parking tickets, roasting schedules, and billing increments when the quote is in hours but the clock works in minutes. Multiply hours by 60. Salons, ovens, and consultants use this constantly.`,
		commonMistakes: msg`Treating 1.5 hours as 1 hour 50 minutes (decimal 0.5 ≠ 50). Flight “hours” in block time still convert with 60; time-zone offsets are a separate problem. Do not mix sexagesimal HMS strings without parsing each field.`,
		realWorldExample: msg`A 2.25-hour seminar is 135 minutes. Slow-cooking for 8 hours is 480 minutes on a device that only accepts minutes.`,
	},

	[key("Time", "Minute", "Hour")]: {
		whenToUse: msg`Convert minutes to hours for payroll, flight duration summaries, and battery-life claims when the raw timer is in minutes. Divide minutes by 60. Timesheets and travel itineraries prefer fractional or HH:MM hours.`,
		commonMistakes: msg`Writing 90 minutes as 1.90 hours is wrong—90/60 = 1.5 h. Movie runtimes in minutes convert cleanly; including trailers is a content choice, not a unit issue. Keep overtime rules (e.g. round to next 15 min) separate from pure conversion.`,
		realWorldExample: msg`90 minutes of parking is 1.5 hours on a meter that bills hourly. A 105-minute feature film is 1.75 hours.`,
	},

	[key("Time", "Day", "Hour")]: {
		whenToUse: msg`Convert days to hours for shipping ETAs, antibiotic courses, and server uptime when plans use days but operations think in hours. Multiply days by 24 for civil mean days. Logistics and on-call rotations rely on this.`,
		commonMistakes: msg`Ignoring local daylight-saving transitions when you need wall-clock hours across a spring-forward night (23-hour civil day). Sidereal days differ slightly from solar days—irrelevant for parcel delivery, relevant for astronomy. “Business days” are not 24-hour multiples.`,
		realWorldExample: msg`A 3-day courier promise is 72 hours if counted continuously. A 10-day medication course is 240 hours of coverage at face value.`,
	},

	[key("Time", "Hour", "Day")]: {
		whenToUse: msg`Convert hours to days for project timelines, drug half-life discussions, and SLA windows when engineering logs hours but managers want days. Divide hours by 24. Incident postmortems often make this switch for readability.`,
		commonMistakes: msg`Using 8-hour “workdays” by accident when the context was continuous hours. 36 hours is 1.5 days, not 1 day 36 hours written carelessly. Keep UTC hour counts aligned if the day boundary matters legally.`,
		realWorldExample: msg`48 hours of ferment time is 2 days on a kitchen calendar. A 168-hour work stretch is 7 days—one full week of continuous hours.`,
	},

	[key("Time", "Week", "Day")]: {
		whenToUse: msg`Convert weeks to days for training plans, rental periods, and sprint schedules when coaches or leases say weeks but calendars show days. Multiply weeks by 7. Habit trackers and agile boards use this constantly.`,
		commonMistakes: msg`Using 5-day workweeks when the context was calendar weeks. Pregnancy “weeks” still use 7-day weeks, but trimester boundaries are medical conventions on top. Do not mix fortnight (2 weeks) without doubling.`,
		realWorldExample: msg`A 6-week physiotherapy program is 42 days. A 2-week vacation hold is 14 days of uninterrupted leave if using calendar days.`,
	},

	[key("Time", "Day", "Week")]: {
		whenToUse: msg`Convert days to weeks for long training blocks, visa stays, and content calendars when a day count must become week language. Divide days by 7. Athletes periodizing plans and PMs phasing releases use this.`,
		commonMistakes: msg`Integer weeks that discard remainder days hide partial weeks (10 days ≠ 1 week). ISO week numbers are a calendar system, not a pure duration conversion. Inclusive counting (“Monday to Friday”) can add an extra day if mishandled.`,
		realWorldExample: msg`21 days of meal prep is 3 weeks. A 10-day antibiotic leftover discussion is about 1.43 weeks—usually left in days for clarity.`,
	},

	[key("Time", "Year (Julian)", "Day")]: {
		whenToUse: msg`Convert Julian years to days for astronomy, orbital periods, and light-travel teaching when a Julian year (exactly 365.25 days) is the definition in play. This matches the year length used in the light-year definition. Science writing prefers Julian years over vague “calendar years” for long spans.`,
		commonMistakes: msg`A Gregorian mean year is 365.2425 days—close but not identical to 365.25. Calendar age in birthdays is not Julian-year duration. Leap-second tables affect civil time, not the Julian-year day count definition used here.`,
		realWorldExample: msg`1 Julian year is 365.25 days. 4 Julian years are 1,461 days—the leap-day pattern baked into that average.`,
	},

	[key("Time", "Day", "Year (Julian)")]: {
		whenToUse: msg`Convert days to Julian years when mission elapsed time, fossil age approximations, or simulation ticks in days should become year-scale figures using 365.25 d/yr. Divide days by 365.25. Astrophysics notebooks use this for tidy axes.`,
		commonMistakes: msg`Dividing by 365 only ignores the average leap day. Using 365.2425 (Gregorian) is better for civil history, not for Julian-year based constants. Do not convert “trading days” with 365.25.`,
		realWorldExample: msg`730.5 days is 2 Julian years. A 10,000-day time series spans about 27.38 Julian years—handy for long climate annotations.`,
	},

	[key("Time", "Hour", "Second")]: {
		whenToUse: msg`Convert hours to seconds for computation timeouts, video timecode budgets, and physics problems that need SI seconds from a human hour count. Multiply hours by 3,600. Software and lab DAQ systems prefer seconds.`,
		commonMistakes: msg`Using 60×60 incorrectly as 3,000 or 36,000 from zero slips. Decimal hours (0.5 h = 1,800 s) differ from HH:MM:SS parsing. Leap seconds rarely matter for app timeouts under a day.`,
		realWorldExample: msg`2 hours of battery life claimed is 7,200 seconds of runtime budget. A 0.25-hour quiz is 900 seconds on an auto-submit timer.`,
	},

	[key("Time", "Second", "Hour")]: {
		whenToUse: msg`Convert seconds to hours for uptime reports, render-farm jobs, and endurance sports when logs show seconds but humans want hours. Divide seconds by 3,600. Cloud billing dashboards often store seconds underneath.`,
		commonMistakes: msg`Dividing by 3,600 incorrectly as 3,000. Displaying only whole hours hides useful fractional hours for short jobs. Stopwatch sports times in seconds convert cleanly; including countdown pauses is a measurement issue.`,
		realWorldExample: msg`7,200 seconds of encode time is 2 hours. A 540-second kilometer split talk converts to 0.15 hours only if you truly need hours—minutes are usually clearer.`,
	},
};

export function getConversionPairContent(
	quantity: Quantity,
	from: UnitName,
	to: UnitName,
): ConversionPairContent | undefined {
	return CONVERSION_PAIR_CONTENT[key(quantity, from, to)];
}
