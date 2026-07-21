import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";
import type { Quantity, UnitName } from "#/lib/units";

export type GuideRelatedConverter = {
	quantity: Quantity;
	from: UnitName;
	to: UnitName;
};

export type GuideSection = {
	heading: MessageDescriptor;
	paragraphs: MessageDescriptor[];
};

export type GuideFaq = {
	question: MessageDescriptor;
	answer: MessageDescriptor;
};

export type Guide = {
	slug: string;
	title: MessageDescriptor;
	description: MessageDescriptor;
	relatedConverters: GuideRelatedConverter[];
	sections: GuideSection[];
	faqs: GuideFaq[];
};

export const guides: Guide[] = [
	{
		slug: "metric-vs-imperial",
		title: msg`Metric vs Imperial: Which System Should You Use?`,
		description: msg`A practical comparison of metric and imperial units for length, volume, and area—when each system wins and how to convert between them confidently.`,
		relatedConverters: [
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Length", from: "Kilometre", to: "Mile (International)" },
			{ quantity: "Volume", from: "Litre", to: "Cup" },
			{ quantity: "Area", from: "Hectare", to: "Acre" },
		],
		sections: [
			{
				heading: msg`Two systems, one physical world`,
				paragraphs: [
					msg`Almost every measurement you make describes the same physical quantity—distance, capacity, or surface—but the labels differ by country and industry. The metric system (SI and its everyday cousins) builds units from powers of ten. The imperial and US customary systems grew from trade, craft, and land practice, so their ratios are historical rather than decimal.`,
					msg`Neither system is more correct. A metre of road and a yard of fabric both measure length. What changes is how easy it is to scale, communicate internationally, and keep arithmetic simple. Engineers, scientists, and most of the world default to metric. Construction, aviation in some regions, cooking in the United States, and older legal documents still lean heavily on imperial or US customary units.`,
					msg`If you work across borders—or follow recipes, building plans, and product specs from different countries—you need fluent conversion, not loyalty to one system. The rest of this guide shows where each system shines and the conversion habits that prevent costly mistakes.`,
				],
			},
			{
				heading: msg`How metric units are organised`,
				paragraphs: [
					msg`Metric length starts at the metre. Prefixes multiply or divide by ten: kilometre (1 000 m), centimetre (0.01 m), millimetre (0.001 m). Area uses square metres and square kilometres; land often uses hectares (10 000 m²). Volume centres on the litre (exactly 0.001 m³) and smaller kitchen measures such as cups and cubic centimetres.`,
					msg`Because every step is a factor of ten, mental math is straightforward: 2.4 km is 2 400 m; 75 cm is 0.75 m. Spreadsheets and CAD tools handle metric cleanly, and international standards (ISO, IEC, most scientific journals) expect SI units or clearly defined metric derivatives.`,
					msg`Temperature in everyday life is usually Celsius; science and engineering often use Kelvin, which shares the same degree size as Celsius but starts at absolute zero. That separation of everyday and scientific scales is itself a metric-world habit.`,
				],
			},
			{
				heading: msg`How imperial and US customary units work`,
				paragraphs: [
					msg`Imperial length uses inches, feet, yards, and miles with fixed but non-decimal ratios: 12 inches in a foot, 3 feet in a yard, 1 760 yards in a mile. International definitions now pin the inch to exactly 25.4 mm, so conversions to metres are exact once you use the international foot and mile—not older survey definitions.`,
					msg`Volume is messier. A US cup, pint, and gallon differ from historical UK imperial measures. A US liquid gallon is about 3.785 L; an imperial gallon is about 4.546 L. Recipes that say cup without specifying the country can silently change batter hydration and cake structure.`,
					msg`Area for land still often uses acres (about 4 047 m²). Floor plans may mix square feet with metric room dimensions. That mixture is common on renovations spanning old and new drawings—always convert the whole drawing set to one system before cutting materials.`,
				],
			},
			{
				heading: msg`Everyday length: metres, feet, and miles`,
				paragraphs: [
					msg`Body height, furniture, and room sizes are where people feel the difference most. Rough mental anchors help: 1 m ≈ 3.28 ft; 30 cm ≈ 1 ft; 1.6 km ≈ 1 mile. For precision work—door clearances, CNC stock, 3D printing—use exact factors, not memory.`,
					msg`Road distances illustrate national habit more than physics. Most countries post kilometres; the US posts miles. Running and cycling training plans often mix 5K (metric branding) with mile pace. Convert deliberately when comparing workouts or GPS exports.`,
					msg`In manufacturing, mixed drawings are a classic failure mode: a part designed in millimetres, a fixture cut in inches, and a tolerance stack that quietly exceeds the budget. Pick one system for the project file and convert at the boundary only.`,
				],
			},
			{
				heading: msg`Volume and area in kitchens and on land`,
				paragraphs: [
					msg`Cooking is the most common place non-engineers hit unit friction. Metric recipes weigh flour and liquids in grams and millilitres; US recipes lean on cups and tablespoons. Weight is more reliable than volume for dry goods because packing density varies. When you must convert volume, treat cup and litre conversions carefully and prefer weighing when accuracy matters.`,
					msg`Land and property use hectares and acres side by side in international markets. One hectare is 10 000 m²; one acre is 4 046.856 422 4 m² under the international definition. Real-estate listings sometimes round aggressively—verify the survey plat, not the marketing brochure.`,
					msg`Garden soil, paint, and concrete are sold by volume or coverage area. Confusing square metres of wall with litres of paint, or acres of field with cubic metres of mulch, is an area-versus-volume error—not a metric-versus-imperial one. Keep the quantity type clear before you convert the unit.`,
				],
			},
			{
				heading: msg`Choosing a system—and converting safely`,
				paragraphs: [
					msg`Choose metric when you need international collaboration, scientific reporting, or simple scaling. Choose imperial or US customary when your local codes, tools, and suppliers already live there—and document the choice. Dual-dimension drawings can help on the shop floor if both values are derived from one master unit.`,
					msg`Safe conversion habits: convert through SI base units when possible (metres, cubic metres, square metres), use exact legal factors (25.4 mm per inch), and round only at the end for display. Intermediate rounding is how small errors become expensive after several steps.`,
					msg`If you are learning both systems, practice with lengths you can see—desk width, walking pace, milk carton volume—so the numbers stick. Fluency beats memorising long tables you will not use under pressure. Keep one exact anchor in memory—25.4 mm per inch—and derive the rest when precision matters.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is the metric system the same as SI?`,
				answer: msg`SI is the formal International System of Units. Everyday metric speech includes SI units plus convenient units like the litre and hectare that are accepted for use with SI. For technical work, prefer SI base and derived units and state any non-SI metric units explicitly.`,
			},
			{
				question: msg`Why do US and UK gallons differ?`,
				answer: msg`They come from different historical definitions of the gallon. The US liquid gallon is defined as 231 cubic inches (about 3.785 L). The imperial gallon used in the UK historically is larger (about 4.546 L). Always check which gallon a recipe, fuel economy figure, or chemical safety sheet assumes.`,
			},
			{
				question: msg`Should I convert every measurement I see?`,
				answer: msg`Convert when you must compare, manufacture, dose, or navigate across systems. If a local building code, speed limit, or packaging label already matches your tools, work in that system and convert only at interfaces—imports, exports, and published specs.`,
			},
		],
	},
	{
		slug: "how-unit-conversion-works",
		title: msg`How Unit Conversion Works: Factors, Bases, and Dimensional Analysis`,
		description: msg`Learn the mechanics behind unit conversion—base units, conversion factors, dimensional analysis, and why chaining conversions carefully keeps answers exact.`,
		relatedConverters: [
			{ quantity: "Length", from: "Inch (International)", to: "Centimetre" },
			{ quantity: "Length", from: "Mile (International)", to: "Kilometre" },
			{ quantity: "Area", from: "Square Foot", to: "Square Metre" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
		],
		sections: [
			{
				heading: msg`Conversion is multiplication by one`,
				paragraphs: [
					msg`A conversion factor is a ratio equal to 1 that changes the unit label without changing the physical quantity. Writing 1 in = 2.54 cm means the fraction (2.54 cm)/(1 in) equals one. Multiply a measurement by that fraction and the inches cancel, leaving centimetres.`,
					msg`That cancelation is dimensional analysis: track units the way you track algebra variables. If inches do not cancel, the factor is upside down. Students who treat conversion as look up a number and hope miss this check—and that check catches most homework and spreadsheet errors.`,
					msg`Professional converters do the same algebra under the hood. They store each unit as a scale (and sometimes an offset) relative to a base unit, then convert input → base → output. Understanding that pattern makes every converter less mysterious.`,
				],
			},
			{
				heading: msg`Base units and why they matter`,
				paragraphs: [
					msg`A coherent system picks one base for each quantity. For length, SI uses the metre. Feet, miles, nanometres, and light-years can all be expressed as a multiple of metres. For area, the coherent SI unit is the square metre; for volume, the cubic metre. Litres are convenient but still defined through cubic metres.`,
					msg`Offsets appear for temperature: Celsius and Fahrenheit are affine scales, not pure ratios. Converting 20 °C to Fahrenheit is not simply multiply by 1.8; you must apply the correct offset. Length, area, and volume conversions are almost always pure scale factors—temperature is the common exception.`,
					msg`Once every unit maps to a base, any pair converts in two steps. That is more maintainable than storing a giant matrix of every unit against every other unit, and it keeps factors consistent.`,
				],
			},
			{
				heading: msg`Exact factors versus measured factors`,
				paragraphs: [
					msg`Some factors are defined by law or international agreement and are exact. The international inch is exactly 25.4 mm. The litre is exactly 0.001 m³. Using those exact values avoids introducing false precision or systematic bias.`,
					msg`Other factors are measured or historically rounded. Older survey feet, local land measures, or experimental constants may carry uncertainty. When a factor is approximate, the converted result inherits that uncertainty—report significant figures honestly.`,
					msg`In software, exact factors should be stored as exact decimals or rational numbers where possible. Binary floating-point approximations of 0.001 or 25.4 can create tiny residuals that look like bugs when you convert back and forth.`,
				],
			},
			{
				heading: msg`Chaining conversions without losing the plot`,
				paragraphs: [
					msg`To go from miles per hour to metres per second, convert length and time separately, then combine. Write the full product of factors so each unwanted unit cancels. The same method scales to density, pressure, and energy once you know the compound dimensions.`,
					msg`Area and volume need squared or cubed length factors. If 1 m = 100 cm, then 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³. Forgetting to square or cube the factor is one of the most common conversion mistakes in engineering homework and DIY material estimates.`,
					msg`Prefer converting through the base unit rather than hopping through many intermediate customary units. Each unnecessary hop is another chance to grab the wrong factor or round too early.`,
				],
			},
			{
				heading: msg`Rounding, significant figures, and display`,
				paragraphs: [
					msg`Keep full precision through intermediate steps. Round once for the audience: a cooking blog may show one decimal place; a machine shop may need three. Rounding early in a multi-step calculation invents error that was not in the original measurement.`,
					msg`Significant figures should reflect the least precise input, not the calculator display. A tape measure good to the nearest millimetre does not justify reporting a converted inch value to six decimals.`,
					msg`When comparing converter outputs, tiny last-digit differences often come from rounding policy, not from different physical constants. Check whether both tools use the international inch, the same acre definition, and the same display precision.`,
				],
			},
			{
				heading: msg`Putting it into practice`,
				paragraphs: [
					msg`Worked habit: convert 12 ft to metres. Use 1 ft (international) = 0.3048 m exactly. 12 × 0.3048 = 3.6576 m. For display you might write 3.658 m or 3.66 m depending on tolerance.`,
					msg`Worked habit for area: 200 ft² to m². First convert length: 1 ft = 0.3048 m, so 1 ft² = 0.092 903 04 m². Then 200 × 0.092 903 04 = 18.580 608 m². Notice the squared factor—skipping that step would be catastrophically wrong.`,
					msg`Once the algebra is automatic, online converters become a speed tool rather than a crutch. You will spot inverted factors, wrong quantity types, and temperature offset mistakes before they reach a drawing or a dose. That skill matters even if you trust a particular website—because you still need to validate its quantity mode and rounding behaviour.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Why convert through a base unit instead of direct factors?`,
				answer: msg`A single base keeps every unit definition consistent and reduces the number of stored factors. Direct factors are fine when you trust them; the base-unit path is the reliable pattern for software and for checking hand calculations.`,
			},
			{
				question: msg`Do I always multiply, or sometimes divide?`,
				answer: msg`You always multiply by a ratio equal to one. Whether the numerical factor looks like multiplication or division depends on which way you write the ratio. If the unit you want to eliminate is in the denominator of your measurement, put it in the numerator of the factor so it cancels.`,
			},
			{
				question: msg`Why is temperature conversion different?`,
				answer: msg`Celsius and Fahrenheit include an offset from absolute zero, so the mapping is of the form y = ax + b, not y = ax alone. Kelvin is an absolute scale and converts by scale factor once you are comparing absolute temperatures.`,
			},
		],
	},

	{
		slug: "why-floating-point-converters-fail",
		title: msg`Why Floating-Point Converters Fail (and How Decimal Math Fixes It)`,
		description: msg`Understand why binary floating-point creates weird conversion residuals, when those errors matter, and how decimal or rational arithmetic keeps unit converters trustworthy.`,
		relatedConverters: [
			{ quantity: "Length", from: "Inch (International)", to: "Millimetre" },
			{ quantity: "Length", from: "Foot (International)", to: "Meter" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Centimetre" },
		],
		sections: [
			{
				heading: msg`The classic 0.1 + 0.2 problem meets units`,
				paragraphs: [
					msg`Most CPUs store non-integer numbers in binary floating-point (IEEE 754). Fractions that look simple in decimal—0.1, 0.001, 2.54—often cannot be represented exactly in binary. The stored value is the nearest representable approximation, and arithmetic on approximations accumulates tiny residuals.`,
					msg`Unit conversion multiplies and divides those values repeatedly. Convert inches to millimetres and back, or litres to cubic metres and back, and you may see 2.9999999997 instead of 3. The physical conversion factor was exact; the computer representation was not.`,
					msg`For many displays the difference is invisible after rounding. For finance-adjacent dosing, CNC toolpaths, legal land area, or automated test assertions that expect exact equality, those residuals become real bugs.`,
				],
			},
			{
				heading: msg`Which conversion factors are exact on paper`,
				paragraphs: [
					msg`The international inch is exactly 25.4 mm. The international foot is exactly 0.3048 m. The litre is exactly 0.001 m³. A cubic centimetre is exactly 1 mL in the usual laboratory sense (1 cm³ = 10⁻⁶ m³). These are definitions, not measurements.`,
					msg`If software stores 25.4 as a binary float, it may already be slightly wrong before any conversion runs. Multiplying by another inexact factor compounds the error. Round-trip tests that assert strict equality then fail even when the algorithm is conceptually correct.`,
					msg`Temperature adds offsets: Celsius ↔ Kelvin uses 273.15. That constant is also a decimal value that binary floats only approximate. Affine conversions are especially sensitive because addition of an inexact offset shifts every result.`,
				],
			},
			{
				heading: msg`Where floating-point errors show up in practice`,
				paragraphs: [
					msg`UI converters often hide the issue by rounding to a fixed number of decimals. Users see clean results and never notice the internal noise. Problems appear when another system consumes the raw float: a CAD kernel, a CSV export, or a unit test comparing strings of full precision.`,
					msg`Chained conversions amplify trouble. Going mile → yard → foot → inch → millimetre → metre with binary floats at each step is worse than a single mile → metre conversion with a high-precision factor. Each hop re-rounds the intermediate value.`,
					msg`Squared and cubed quantities make errors worse. Area and volume multiply length scales, so a tiny relative error in length becomes two or three times larger in relative terms for area or volume when you expand (1+ε)ⁿ.`,
				],
			},
			{
				heading: msg`Decimal, rational, and fixed-point alternatives`,
				paragraphs: [
					msg`Decimal libraries (for example decimal.js, Big.js, or language-native decimals) store numbers in base 10. Exact decimal factors like 0.3048 and 0.001 stay exact within the chosen precision. Unit converters that care about correctness often convert through a decimal base unit.`,
					msg`Rational arithmetic stores factors as fractions of integers. If 1 inch = 127/5000 metres exactly (because 25.4 mm = 127/5000 m), multiplication can cancel exactly. Rationals are ideal for pure scale conversions; offsets still need careful handling for temperature.`,
					msg`Fixed-point math scales everything to an integer count of the smallest tick—nanometres, microlitres, or thousandths of an inch. Integer arithmetic is exact until you overflow. It works well for domains with a clear quantum of measurement.`,
				],
			},
			{
				heading: msg`Practical rules for trustworthy converters`,
				paragraphs: [
					msg`Store exact legal factors as decimals or rationals, not as hastily typed binary floats. Convert input → base → output in as few steps as possible. Round only when formatting for humans, and document the rounding mode.`,
					msg`Never test converters with strict equality on binary floats. Compare within an absolute or relative tolerance, or compare decimal string forms at a stated precision. Prefer golden tests that use known exact pairs such as 1 in = 25.4 mm.`,
					msg`If you build a calculator UI, show enough precision to be useful but not so many digits that floating noise looks like signal. A length tool showing twelve decimals after converting through floats is advertising its representation error.`,
				],
			},
			{
				heading: msg`When binary floats are still fine`,
				paragraphs: [
					msg`Rough comparisons, games, data visualisation, and many scientific simulations tolerate float error because the model uncertainty dwarfs representation error. The key is knowing your tolerance. If a millimetre matters, floats need discipline or replacement.`,
					msg`Hardware acceleration and GPU pipelines often force floats. In those cases, keep authoritative conversion in decimal on the CPU or server, and treat GPU floats as a display or intermediate approximation.`,
					msg`Good engineering is matching numeric representation to the decision you will make with the number. Unit conversion for manufacturing, medicine, and legal metrology deserves decimal or rational math; a weather widget converting city temperatures does not. When in doubt, choose the stricter representation—the performance cost of decimals is usually smaller than the cost of a silent round-trip bug.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Why does converting back and forth change my number?`,
				answer: msg`Binary floating-point cannot represent many decimal factors exactly. Each multiply or divide adds a tiny rounding error. Round-trip conversion through floats often fails to restore the original bits even when the conversion factors are conceptually exact.`,
			},
			{
				question: msg`Is double precision enough for unit conversion?`,
				answer: msg`Double precision (float64) is enough for many everyday conversions after display rounding, but it is not a substitute for exact decimal factors when you need bit-stable round trips, legal metrology, or strict automated tests. Prefer decimals or rationals for authoritative converters.`,
			},
			{
				question: msg`How should I compare converter results in tests?`,
				answer: msg`Compare at a declared precision, use decimal string equality, or assert absolute and relative tolerances. Avoid expecting exact binary equality after several arithmetic steps.`,
			},
		],
	},
	{
		slug: "celsius-fahrenheit-kelvin-explained",
		title: msg`Celsius, Fahrenheit, and Kelvin Explained`,
		description: msg`Clear formulas, fixed points, and practical advice for converting between Celsius, Fahrenheit, and Kelvin without mixing offsets and scale factors.`,
		relatedConverters: [
			{ quantity: "Temperature", from: "Celsius", to: "Fahrenheit" },
			{ quantity: "Temperature", from: "Celsius", to: "Kelvin" },
			{ quantity: "Temperature", from: "Fahrenheit", to: "Kelvin" },
			{ quantity: "Temperature", from: "Celsius", to: "Newton" },
		],
		sections: [
			{
				heading: msg`Three scales, two kinds of zero`,
				paragraphs: [
					msg`Celsius and Fahrenheit are everyday interval scales: equal degree sizes measure temperature differences, but their zeros are chosen for human convenience. Kelvin is an absolute thermodynamic scale: zero kelvin is absolute zero, where molecular motion reaches its theoretical minimum.`,
					msg`A degree Celsius and a kelvin are the same size. That is why converting Celsius to Kelvin is addition: T(K) = t(°C) + 273.15. Fahrenheit degrees are smaller: one Fahrenheit degree is 5/9 of a Celsius degree.`,
					msg`The Newton temperature scale (not to be confused with the force unit) is a historical scale sometimes still listed in converters. It is rarely used in modern lab work, but it reminds us that many scales once competed before Celsius and Kelvin dominated science.`,
				],
			},
			{
				heading: msg`Fixed points that define the scales`,
				paragraphs: [
					msg`On the modern Celsius scale, 0 °C is the freezing point of water and 100 °C is the boiling point at standard atmospheric pressure—useful anchors, though precise metrology now defines scales through absolute thermodynamic methods and fixed points of pure substances.`,
					msg`Fahrenheit set 32 °F at the freezing point of water and 212 °F at boiling, so there are 180 Fahrenheit degrees between those points versus 100 Celsius degrees. That 180/100 ratio is exactly 9/5, which appears in every conversion formula.`,
					msg`Kelvin anchors absolute zero at 0 K. The triple point of water and other defining fixed points connect Kelvin to laboratory practice. Scientists prefer Kelvin for equations of state, cryogenics, and colour temperature because ratios and absolute values behave cleanly.`,
				],
			},
			{
				heading: msg`The formulas you actually need`,
				paragraphs: [
					msg`Celsius to Fahrenheit: °F = °C × 9/5 + 32. Fahrenheit to Celsius: °C = (°F − 32) × 5/9. Memorise the offset and the 9/5 factor together—dropping either step is the usual classroom error.`,
					msg`Celsius to Kelvin: K = °C + 273.15. Kelvin to Celsius: °C = K − 273.15. Fahrenheit to Kelvin is safest as a two-step conversion: Fahrenheit → Celsius → Kelvin, unless you carefully apply a combined formula.`,
					msg`For temperature differences, offsets cancel. A rise of 10 °C is a rise of 10 K and a rise of 18 °F. People often confuse converting a reading with converting a change—room temperature 20 °C is 68 °F, but a 20 °C increase is 36 °F, not 68 °F.`,
				],
			},
			{
				heading: msg`Everyday intuition for each scale`,
				paragraphs: [
					msg`Weather and cooking dominate Celsius and Fahrenheit use. Comfortable room temperature is about 20–22 °C (68–72 °F). Body temperature is about 37 °C (98.6 °F). Oven recipes may list both; always confirm whether a converted oven setting matches your appliance’s markings.`,
					msg`Kelvin appears in physics, chemistry, astronomy, and lighting. Deep space backgrounds near 2.7 K, liquid nitrogen near 77 K, and steelmaking temperatures in the thousands of kelvin are easier to reason about without negative values.`,
					msg`Negative Celsius temperatures are common in winter climates. Negative Kelvin is physically meaningless for ordinary thermodynamic temperature. If a converter produces negative kelvin from a valid input path, the formula implementation is wrong.`,
				],
			},
			{
				heading: msg`Common conversion mistakes`,
				paragraphs: [
					msg`Multiplying Celsius by 1.8 without adding 32 yields a wrong Fahrenheit reading. Adding 273 instead of 273.15 introduces a 0.15 K bias—negligible for weather, unacceptable for careful lab work.`,
					msg`Spreadsheets sometimes store temperatures as numbers without units in the header. Downstream scripts then apply the wrong formula. Always label columns with the scale, including the degree symbol or the letter K.`,
					msg`Medical and industrial alarms must use the correct scale and the correct notion of difference versus absolute reading. A thermostat set incorrectly by 5 °F versus 5 °C is a very different safety margin.`,
				],
			},
			{
				heading: msg`Choosing a scale for your work`,
				paragraphs: [
					msg`Use Celsius for weather, cooking, and most international engineering communication. Use Fahrenheit where local practice and equipment displays require it. Use Kelvin for scientific equations, cryogenics, and any context where absolute temperature matters.`,
					msg`When publishing data, state the scale in every table and plot axis. Dual-scale axes are fine for public communication if both are computed from one master dataset.`,
					msg`If you only remember one habit, remember this: convert readings with the full affine formula; convert differences with the scale factor alone. Print that sentence near any lab oven or environmental chamber that displays a different scale than your protocol documents.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is 0 K the same as −273.15 °C?`,
				answer: msg`Yes. Absolute zero is 0 K, which equals −273.15 °C. No ordinary thermodynamic system reaches temperatures below that value.`,
			},
			{
				question: msg`Why is a Celsius degree the same size as a kelvin?`,
				answer: msg`By definition the kelvin and the degree Celsius have equal magnitude. The scales differ only by the location of zero: Kelvin starts at absolute zero; Celsius is offset by 273.15.`,
			},
			{
				question: msg`Can I convert a temperature change the same way as a temperature reading?`,
				answer: msg`No. For changes, skip the offsets. Δ°F = Δ°C × 9/5, and ΔK = Δ°C. Applying +32 or +273.15 to a difference is incorrect.`,
			},
		],
	},
	{
		slug: "cooking-volume-conversions",
		title: msg`Cooking Volume Conversions: Cups, Litres, and Spoons`,
		description: msg`Practical kitchen guidance for converting cups, litres, tablespoons, and teaspoons—plus when weighing beats volume for consistent baking.`,
		relatedConverters: [
			{ quantity: "Volume", from: "Cup", to: "Litre" },
			{
				quantity: "Volume",
				from: "Tablespoon (Metric)",
				to: "Teaspoon (Metric)",
			},
			{ quantity: "Volume", from: "Litre", to: "Cubic Centimetre" },
			{ quantity: "Volume", from: "Cup", to: "Tablespoon (Metric)" },
		],
		sections: [
			{
				heading: msg`Why kitchen volumes feel inconsistent`,
				paragraphs: [
					msg`Home cooking mixes traditions. US recipes lean on cups and spoons; many European and professional pastry recipes prefer grams and millilitres. A cup is a volume, not a weight, so a cup of sifted flour and a cup of packed brown sugar are different masses even when the cup is identical.`,
					msg`National cup definitions also differ. A common US customary cup is 240 mL in modern nutrition labelling contexts (historically often treated as 236.588 mL from 8 US fluid ounces). Metric cups in some countries are 250 mL. Using the wrong cup changes hydration and texture.`,
					msg`Tablespoons and teaspoons vary too. Metric tablespoons are often 15 mL and metric teaspoons 5 mL, with three teaspoons per tablespoon. Older utensils in a drawer may not match those standards—calibrate once with a measuring jug if precision matters.`,
				],
			},
			{
				heading: msg`Core volume relationships for the kitchen`,
				paragraphs: [
					msg`One litre is 1 000 mL and equals 1 000 cm³. That identity connects recipe language to laboratory language: 250 mL of stock is 250 cm³. A cubic metre is 1 000 L—useful for catering tanks, not cake batter.`,
					msg`A metric cup of 250 mL is one-quarter of a litre. Sixteen US tablespoons make a US cup in customary cooking arithmetic, but verify against millilitres when converting a metric recipe. When in doubt, convert everything to millilitres first, then back to the utensil you own.`,
					msg`Liquid oils, water, milk, and stocks convert cleanly by volume because they fill a cup without packing voids. Dry powders do not. That is why bread bakers live by weight.`,
				],
			},
			{
				heading: msg`When to prefer weight over volume`,
				paragraphs: [
					msg`Flour, cocoa, grated cheese, and chopped nuts vary wildly by packing. Weighing removes that variance. If a recipe lists only cups, look for a reputable weight conversion for that ingredient and note whether flour was spooned or scooped.`,
					msg`Small quantities of baking powder, yeast, and salt are often safer by volume spoons only when the recipe was developed that way—or by grams on a 0.1 g scale for serious baking. Tiny absolute errors are large relative errors in a teaspoon.`,
					msg`Scaling a recipe up for a party magnifies volume error. Convert the master recipe to grams and millilitres, scale by a pure number, then convert back to cups only if your guests insist on seeing familiar utensils.`,
				],
			},
			{
				heading: msg`Liquids, reductions, and substitutions`,
				paragraphs: [
					msg`Stock, wine, and milk listed in cups convert to litres by simple scale factors once you fix the cup definition. Reductions change concentration but not the conversion math: 500 mL reduced by half is still a volume statement about what remains.`,
					msg`Honey, syrup, and molasses are viscous. They cling to measuring cups, so weight or a flexible silicone cup improves accuracy. Oiling a spoon lightly can help sticky transfers without changing volume much.`,
					msg`Alcohol and extracts in teaspoons look trivial until you scale cocktails or flavourings for a crowd. Convert to millilitres, scale, then portion with a jug or syringe for consistency.`,
				],
			},
			{
				heading: msg`Oven temperatures are not volumes—but they travel with recipes`,
				paragraphs: [
					msg`International recipes often pair metric volumes with Celsius ovens, while US recipes pair cups with Fahrenheit. Convert temperatures with the proper affine formulas; do not treat oven settings like volume factors.`,
					msg`Fan (convection) ovens may need temperature adjustments independent of unit conversion. Read your appliance manual; a correct Celsius ↔ Fahrenheit conversion still will not fix a fan-versus-conventional mismatch.`,
					msg`Keep a small card on the fridge with your most-used pairs: cup ↔ mL, tablespoon ↔ mL, butter stick ↔ grams if relevant in your country. Habit beats hunting mid-batter.`,
				],
			},
			{
				heading: msg`A reliable workflow for converting any recipe`,
				paragraphs: [
					msg`Identify the cup and spoon standard assumed by the author. Convert all volumes to millilitres. Convert dry ingredients to grams where possible. Scale. Convert back only to the tools you will actually use.`,
					msg`Test critical recipes at the original yield before scaling. Conversion errors and scaling errors look the same in a collapsed cake—controlled tests separate them. Keep a conversion log for bakery R&D: original unit, assumed cup standard, millilitre value, and weighed confirmation for flour and sugar.`,
					msg`When sharing your own recipes online, publish millilitres and grams alongside cups. Future readers in every country will thank you, and you will reduce support questions that are really unit questions.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many millilitres are in a cup?`,
				answer: msg`It depends on which cup. A common modern US legal cup for nutrition labelling is 240 mL. A metric cup is often 250 mL. Check the recipe’s origin and prefer millilitre measurements when accuracy matters.`,
			},
			{
				question: msg`Are metric tablespoons always 15 mL?`,
				answer: msg`In many metric cooking standards, yes: 15 mL per tablespoon and 5 mL per teaspoon. Antique spoons and some regional utensils differ, so measure once into a jug if you need consistency.`,
			},
			{
				question: msg`Should I convert flour by volume or weight?`,
				answer: msg`Prefer weight. Flour packing density varies enough to change crumb and rise. If you only have cups, use a consistent method (typically spoon and level) and accept more batch-to-batch variation.`,
			},
		],
	},

	{
		slug: "si-prefixes-explained",
		title: msg`SI Prefixes Explained: From Nano to Giga and Beyond`,
		description: msg`A clear tour of SI prefixes—milli, centi, kilo, mega, nano, and more—so you can scale length, area, and volume without losing track of powers of ten.`,
		relatedConverters: [
			{ quantity: "Length", from: "Nanometre", to: "Meter" },
			{ quantity: "Length", from: "Millimetre", to: "Kilometre" },
			{ quantity: "Length", from: "Micrometre", to: "Millimetre" },
			{ quantity: "Area", from: "Square Millimetre", to: "Square Metre" },
		],
		sections: [
			{
				heading: msg`Prefixes are powers of ten`,
				paragraphs: [
					msg`SI prefixes attach to unit names to multiply or divide by powers of ten. A kilometre is 10³ metres; a millimetre is 10⁻³ metres; a nanometre is 10⁻⁹ metres. Learning the prefix table once unlocks length, mass, and many derived units.`,
					msg`Common prefixes in daily technical work include milli (10⁻³), centi (10⁻²), deci (10⁻¹), deka (10¹), hecto (10²), and kilo (10³). Science and engineering add micro (10⁻⁶), nano (10⁻⁹), pico (10⁻¹²), mega (10⁶), giga (10⁹), and beyond.`,
					msg`The symbol matters: m means milli, M means mega. Writing Mm when you mean millimetre is a three-orders-of-magnitude disaster. Teach juniors to read symbols carefully before they trust a CAD export.`,
				],
			},
			{
				heading: msg`Length examples that stick`,
				paragraphs: [
					msg`A human hair is on the order of tens of micrometres. Visible light wavelengths sit around hundreds of nanometres. Atomic spacings are on the order of tenths of a nanometre (ångströms). Road distances use kilometres; machining uses millimetres; optics and semiconductors live in micrometres and nanometres.`,
					msg`Moving between prefixes is shifting the decimal point. 3.5 km = 3 500 m = 3 500 000 mm. Avoid mixing mental shifts with calculator typos by writing the power explicitly: 3.5 × 10³ m.`,
					msg`Light-travel units and astronomical units sit outside everyday prefixes but still convert to metres. Prefix fluency helps you sanity-check whether a result belonging in kilometres accidentally landed in metres.`,
				],
			},
			{
				heading: msg`Area and volume need squared and cubed prefixes`,
				paragraphs: [
					msg`A square kilometre is not 10³ square metres—it is (10³)² = 10⁶ square metres. A cubic centimetre is (10⁻²)³ = 10⁻⁶ cubic metres. Forgetting to square or cube the prefix power is the classic SI scaling mistake.`,
					msg`Practical check: 1 m³ = 1 000 L = 1 000 000 cm³. 1 m² = 10 000 cm². If your converted area or volume is off by factors of 100 or 1 000, suspect a missing square or cube on the prefix.`,
					msg`Land metric units add hectare (10⁴ m²) and are (10² m²). They are accepted for use with SI even though they are not prefix forms of the metre. Still convert through square metres when mixing with square kilometres or acres.`,
				],
			},
			{
				heading: msg`Micro, nano, and pico in the lab`,
				paragraphs: [
					msg`Biology and chemistry talk constantly in microlitres and nanomolar concentrations. Mechanical drawings for precision parts may call out micrometre tolerances. Electronics migrated from micrometre feature sizes toward nanometre nodes—the prefix is part of the industry vocabulary.`,
					msg`Pipettes, micrometers (the tool), and nanometre-resolution stages all demand that you keep prefix meaning separate from tool names. English uses micrometer for both a tool and a unit spelling variant—context prevents confusion.`,
					msg`When converting scientific length units, prefer explicit scientific notation alongside prefixed units in notebooks: 2.5 µm = 2.5 × 10⁻⁶ m. Dual writing catches transcription errors.`,
				],
			},
			{
				heading: msg`Mega, giga, and large-scale measures`,
				paragraphs: [
					msg`Megametres and gigametres appear in planetary science. Earth diameters and orbital distances are awkward in raw metres; prefixed megametres or scientific notation keep numbers readable.`,
					msg`Data storage uses mega and giga too, but binary multiples (mebi, gibi) complicate that domain. Do not import binary prefix confusion into physical unit conversion—metres remain decimal.`,
					msg`For public communication, choose a prefix that keeps the leading number between roughly 0.1 and 999. Saying 0.003 km is legal but unfriendly; 3 m is clearer.`,
				],
			},
			{
				heading: msg`Habits for error-free prefix conversion`,
				paragraphs: [
					msg`Convert to the base SI unit first, then to the destination prefix. That two-step habit prevents tangled mental decimal shifts when you are tired.`,
					msg`Write units on every line of a calculation. Prefix errors hide in bare numbers. Dimensional analysis still works when prefixes are treated as part of the unit token.`,
					msg`Keep a small reference of the prefixes you actually use. You do not need yocto and yotta memorised for construction work; you do need milli, micro, and kilo cold. Add nano if you read materials or electronics papers; add mega and giga if you work with planetary or data-centre physical plant scales.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is centi used as widely as milli and kilo?`,
				answer: msg`Centi appears constantly for centimetres in everyday length, but scientists often prefer millimetres or metres for technical drawings. Use the prefix that matches local practice and keeps numbers readable.`,
			},
			{
				question: msg`Why is 1 km² equal to 1 000 000 m²?`,
				answer: msg`Because the kilo prefix scales the underlying length by 1 000, and area squares that factor: 1 000 × 1 000 = 1 000 000. Always square or cube prefix factors for area and volume.`,
			},
			{
				question: msg`What is the difference between µ and m?`,
				answer: msg`The symbol µ (mu) means micro (10⁻⁶). The symbol m means milli (10⁻³) when used as a prefix. They differ by a factor of one thousand.`,
			},
		],
	},
	{
		slug: "length-units-everyday-life",
		title: msg`Length Units in Everyday Life: From Millimetres to Miles`,
		description: msg`How people actually use millimetres, centimetres, metres, kilometres, inches, feet, and miles—and how to pick the right unit for home, travel, and DIY.`,
		relatedConverters: [
			{ quantity: "Length", from: "Millimetre", to: "Inch (International)" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Length", from: "Kilometre", to: "Mile (International)" },
			{ quantity: "Length", from: "Centimetre", to: "Inch (International)" },
		],
		sections: [
			{
				heading: msg`Matching the unit to the task`,
				paragraphs: [
					msg`Good measurement starts by choosing a unit that keeps numbers comfortable. Furniture assembly lives in millimetres or inches. Room layouts live in metres or feet. Road trips live in kilometres or miles. Using kilometres to describe a screw pitch forces awkward decimals; using millimetres for a road trip forces huge integers. Comfortable magnitude is a usability feature, not a cosmetic preference.`,
					msg`Everyday fluency means knowing rough sizes without a calculator: a credit card is about 85 mm long; a doorway is about 2 m high; a city block varies but is often a few hundred metres; a 5K run is 5 km.`,
					msg`When plans mix units, convert the drawing once into the unit your tools display. Tape measures in the US often show inches; many metric tapes show centimetres and millimetres. Dual-scale tapes help but still require attention to which edge you read.`,
				],
			},
			{
				heading: msg`Millimetres and centimetres at home`,
				paragraphs: [
					msg`DIY shelving, 3D printing, and picture framing benefit from millimetres because tolerances are tight and decimals in centimetres become error-prone. A 19 mm shelf pin hole is clearer than 1.9 cm for many makers.`,
					msg`Clothing and body measurements often use centimetres internationally and inches in the US. Pattern drafting can mix both; convert seam allowances carefully so ease calculations stay consistent.`,
					msg`Phone screens, notebooks, and desk accessories are marketed in inches in some regions even when the rest of life is metric. Treat those inches as marketing conventions and convert if you need clearance in a metric bag or sleeve.`,
				],
			},
			{
				heading: msg`Metres and feet indoors`,
				paragraphs: [
					msg`Architects and interior designers choose metres or feet based on local codes and software defaults. Ceiling heights near 2.4 m (about 8 ft) are a common residential ballpark. Convert carefully when importing overseas furniture dimensions into a local floor plan.`,
					msg`Stride length and walking distance estimates often mix metres and minutes. Pedometers and phones may report kilometres while your mental map is in blocks or miles. Calibrate once on a known path.`,
					msg`Sports fields and courts have standardised dimensions—often published in metres internationally even where fans still talk in yards or feet. Check the governing body’s ruleset for the exact numbers.`,
				],
			},
			{
				heading: msg`Kilometres and miles outdoors`,
				paragraphs: [
					msg`Navigation, running, and cycling revolve around kilometres or miles depending on country. Pace (min/km versus min/mile) is a reciprocal-style conversion people get wrong under race stress—convert before the start, not mid-interval.`,
					msg`Fuel economy complicates matters further: L/100 km versus miles per gallon inverts both volume and length thinking. Convert with full dimensional analysis rather than a memorised approximate factor when comparing cars across markets.`,
					msg`Hiking maps may use contour intervals in metres while trail talk uses miles. GPS device settings should match the map and the group’s language to reduce rendezvous errors.`,
				],
			},
			{
				heading: msg`Inches, feet, and yards in trade skills`,
				paragraphs: [
					msg`Carpentry in the US still speaks feet and inches, including fractional inches. Metric-trained woodworkers converting plans must decide whether to soft-convert (nearest convenient millimetre) or hard-convert (exact 25.4 mm per inch) based on fit-critical parts.`,
					msg`Fabric and sports fields use yards historically. A yard is 0.9144 m exactly under the international definition. That exactness makes conversion trustworthy when you use international units.`,
					msg`Pipe and lumber nominal sizes are not always actual measured sizes. Unit conversion cannot fix a nominal-versus-actual mismatch—measure the part you have.`,
				],
			},
			{
				heading: msg`Building personal conversion anchors`,
				paragraphs: [
					msg`Memorise a few anchors tied to your body and home: your height in both cm and ft/in; your door width; 100 m on a local track; one mile on a familiar road. Anchors beat abstract tables for quick estimates.`,
					msg`For precision, abandon estimates. Use a converter or exact factors, then round to the tolerance of the task. Estimating a cabinet reveal is fine; estimating a lens focal clearance may not be.`,
					msg`Teach children both systems if they will travel or read international media. Dual literacy is a practical life skill, not a political statement. A kitchen thermometer, a road atlas, and a sewing pattern from another country are enough real objects to practice conversions without worksheets alone.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many millimetres are in an inch?`,
				answer: msg`Exactly 25.4 mm per international inch. Use that factor for technical work instead of the older approximate 25 mm rule of thumb.`,
			},
			{
				question: msg`Is a metre longer than a yard?`,
				answer: msg`Yes. One metre is about 1.094 yards, or roughly 3.281 feet. A metre is a little longer than a yard.`,
			},
			{
				question: msg`When should I use kilometres instead of metres?`,
				answer: msg`Use kilometres for distances where metres would produce thousands of units—typically travel, running routes, and geographic scales. Keep metres for buildings, rooms, and short outdoor segments.`,
			},
		],
	},
	{
		slug: "area-vs-volume-common-mistakes",
		title: msg`Area vs Volume: Common Mistakes and How to Avoid Them`,
		description: msg`Stop mixing square metres with cubic metres. Learn the dimensional difference between area and volume and the conversion errors that follow from confusing them.`,
		relatedConverters: [
			{ quantity: "Area", from: "Square Metre", to: "Square Foot" },
			{ quantity: "Volume", from: "Cubic Metre", to: "Litre" },
			{ quantity: "Area", from: "Acre", to: "Hectare" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
		],
		sections: [
			{
				heading: msg`Different quantities, different dimensions`,
				paragraphs: [
					msg`Area measures surface: length squared. Volume measures space: length cubed. A square metre (m²) cannot convert to a litre (a volume) without additional information such as thickness or depth. If a tool offers that conversion, it is either wrong or silently assuming a height.`,
					msg`People confuse the words because everyday language is loose. We say a room is 20 squares, a pool holds 50 000 litres, and a field is 2 acres—then ask a converter to jump between those numbers without checking dimensions.`,
					msg`The first question before any conversion is: what physical quantity am I measuring? Only then choose units. Quantity mistakes dwarf unit mistakes.`,
				],
			},
			{
				heading: msg`Classic DIY and gardening errors`,
				paragraphs: [
					msg`Paint coverage is area; paint purchase is volume. You need area of wall, number of coats, and coverage rate (m² per litre) to find litres. Converting wall m² directly into litres without coverage data is meaningless.`,
					msg`Mulch and topsoil are sold by volume (cubic metres or litres) but spread over area (square metres) at a chosen depth. Volume = area × depth with consistent length units. Mixing feet of depth with square metres of bed is a dimensional mash-up.`,
					msg`Concrete slabs need volume, not floor area alone. A 10 m² slab 0.1 m thick is 1 m³ of concrete before waste factors. Ordering 10 m³ because the floor is 10 m² is an expensive confusion of symbols.`,
				],
			},
			{
				heading: msg`Land area versus water volume`,
				paragraphs: [
					msg`Acres and hectares measure land area. Acre-feet measure volume of water covering an acre one foot deep—an irrigation and reservoir unit. The shared word acre tricks newcomers into treating them as interchangeable.`,
					msg`Rainfall is often discussed as a depth (millimetres) over a catchment area. Volume of rain equals area × depth. Flood planning lives on that relationship; unit conversion is only one step in the hydrology.`,
					msg`Real-estate listings that casually compare acreage to building floor area without saying so confuse land footprint with living space. Read the survey definitions.`,
				],
			},
			{
				heading: msg`Squared and cubed conversion factors`,
				paragraphs: [
					msg`When converting area, square the length factor. When converting volume, cube it. 1 m = 100 cm implies 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³. Applying the linear factor to an area value underconverts by ×100 in this example.`,
					msg`Square feet to square metres and cubic feet to cubic metres are frequent spreadsheet bugs. Someone stores 0.3048 as a constant named FT_TO_M and multiplies area by it once. The correct area factor is 0.3048².`,
					msg`Unit tests should include area and volume cases explicitly. Linear tests alone will not catch a missing power.`,
				],
			},
			{
				heading: msg`Labels, symbols, and UI pitfalls`,
				paragraphs: [
					msg`Write m² and m³ with clear superscripts or ASCII m^2 and m^3 in plain text. A bare m next to a number that meant cubic metres will be misread later.`,
					msg`Converter UIs should separate quantity tabs: Length, Area, Volume, Temperature. Cross-quantity conversion options invite nonsense results. If you build tools, disable impossible pairs.`,
					msg`CSV exports from CAD or GIS tools sometimes drop unit metadata. Re-attach units before converting, and sanity-check magnitudes: a house lot of 500 might be m²; a house lot of 500 000 is probably not acres.`,
				],
			},
			{
				heading: msg`A checklist before you convert`,
				paragraphs: [
					msg`Name the quantity. Confirm the dimension (L, L², L³, θ, …). Choose compatible units. Apply the correct power to length factors. Round at the end. Estimate a ballpark magnitude to catch 100× mistakes. If the ballpark fails, stop before ordering materials.`,
					msg`If a problem statement mixes coverage, depth, and capacity, draw a tiny diagram. Many homework and site errors vanish once the geometry is visible.`,
					msg`When results look surprising, ask whether you converted units or accidentally converted quantities. That single question saves projects. A second quick check is geometric: does the number imply a depth, a thickness, or a coverage rate that was never stated? Missing geometry usually means someone treated area as volume.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Can I convert square metres to litres?`,
				answer: msg`Not directly. Litres measure volume. You need a depth or thickness to turn area into volume, then convert cubic metres to litres (1 m³ = 1 000 L).`,
			},
			{
				question: msg`Why did my ft² to m² conversion look too small?`,
				answer: msg`You may have multiplied by 0.3048 once instead of by 0.3048 squared (about 0.0929). Area conversions must square the length factor.`,
			},
			{
				question: msg`Is an acre-foot an area unit?`,
				answer: msg`No. An acre-foot is a volume: the volume of water that would cover one acre to a depth of one foot. Acres alone measure area.`,
			},
		],
	},
	{
		slug: "light-year-explained",
		title: msg`What Is a Light-Year? Distance, Not Time`,
		description: msg`A clear explanation of the light-year as a length unit—how it relates to metres, why astronomy uses it, and how it compares to AUs and parsecs.`,
		relatedConverters: [
			{ quantity: "Length", from: "Light Year", to: "Kilometre" },
			{ quantity: "Length", from: "Light Year", to: "Meter" },
			{ quantity: "Length", from: "Light Year", to: "Astronomical Unit" },
			{ quantity: "Length", from: "Light Year", to: "Parsec" },
		],
		sections: [
			{
				heading: msg`A light-year measures distance`,
				paragraphs: [
					msg`A light-year is the distance light travels in vacuum in one Julian year. Despite the word year, it is a length unit, not a time unit. Saying a star is 4 light-years away means its light takes about four years to reach us—and that the path length is that many light-years.`,
					msg`In metres, one light-year is about 9.46 × 10¹⁵ m (roughly 9.46 petametres). In kilometres that is about 9.46 × 10¹² km. The huge size is exactly why astronomers like the unit: galactic distances stay readable.`,
					msg`Confusing light-years with years leads to wrong mental models of age versus distance. A galaxy 100 million light-years away is not necessarily 100 million years old; we see it as it was when the light left, which is a different statement.`,
				],
			},
			{
				heading: msg`How the unit is defined`,
				paragraphs: [
					msg`Light speed in vacuum is exactly 299 792 458 m/s by SI definition of the metre. A Julian year is 365.25 days of 86 400 seconds. Multiply speed by that time interval to get the light-year length used in astronomy.`,
					msg`Because the speed of light is exact in SI, the light-year inherits a precise relationship to the metre once the year convention is fixed. Converters should document which year definition they use; Julian year is the common astronomical choice.`,
					msg`Related units include the light-second, light-minute, light-hour, and light-day—useful for Solar System scales and communications delay discussions.`,
				],
			},
			{
				heading: msg`Comparing light-years, AUs, and parsecs`,
				paragraphs: [
					msg`The astronomical unit (AU) is roughly the Earth–Sun distance—about 1.496 × 10¹¹ m. Planetary orbits and spacecraft trajectories often use AU. One light-year is about 63 241 AU.`,
					msg`The parsec (parallax-second) is about 3.26 light-years and is preferred in professional astronomy because it connects cleanly to parallax measurements. Survey papers may report megaparsecs for cosmological distances.`,
					msg`Popular science favours light-years because the travel-time metaphor is intuitive. Research papers often favour parsecs. Converting between them is routine length conversion through metres.`,
				],
			},
			{
				heading: msg`Lookback time and what we see`,
				paragraphs: [
					msg`When we observe a distant object, we see light that left in the past. For nearby stars, that lookback time in years is numerically close to the distance in light-years. On cosmological scales, expanding-universe effects make the relationship between distance measures and lookback time more subtle.`,
					msg`Different distance measures exist in cosmology (comoving distance, luminosity distance, angular-diameter distance). A casual converter from redshift to light-years embeds cosmological model assumptions. Treat popular single-number conversions as approximate for deep-sky objects.`,
					msg`For educational Solar System and nearby-star problems, the simple light-travel distance is appropriate and clear. Save cosmological distance-measure nuance for courses that already cover expanding-space metrics; introducing it too early often confuses the core lesson that a light-year is length.`,
				],
			},
			{
				heading: msg`Classroom and communication tips`,
				paragraphs: [
					msg`Emphasise that the unit answers how far, not how long something lasts. Analogy: a three-hour drive describes a distance via a travel convention; it does not mean the destination is three hours old.`,
					msg`Scale models help: if the Earth–Sun distance is 1 cm, a light-year becomes an awkwardly large classroom length—which itself teaches why astronomers need big units.`,
					msg`When writing for the public, pair light-years with a metres-or-kilometres scientific notation value once so readers can cross-check magnitudes.`,
				],
			},
			{
				heading: msg`Using converters wisely`,
				paragraphs: [
					msg`Converting light-years to kilometres produces enormous integers. Prefer scientific notation in reports. Check that your converter’s light-year matches the Julian-year definition if you need agreement with catalogue values. A mismatch in year definition is tiny compared with cosmic distances for outreach, but it matters when you reconcile two catalogues to many significant figures.`,
					msg`Do not convert light-years to seconds and call it time without clearly switching quantity. Length converters should keep the result labelled as distance. If you need light-travel time, state time explicitly in years, days, or seconds after dividing distance by the speed of light.`,
					msg`Nearest-star examples (Proxima Centauri at about 4.25 light-years) make excellent worked problems for metre and kilometre conversion practice. Ask students to compute the same distance in AU and in metres using scientific notation, then explain why both answers describe one physical separation.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is a light-year a measure of time?`,
				answer: msg`No. It is a measure of distance: how far light travels in one year. The time metaphor helps intuition but the unit itself is length.`,
			},
			{
				question: msg`How many kilometres are in a light-year?`,
				answer: msg`About 9.46 trillion kilometres (9.46 × 10¹² km), depending on the exact year definition used. For precise work, convert via metres using your converter’s documented constant.`,
			},
			{
				question: msg`Which is larger, a parsec or a light-year?`,
				answer: msg`A parsec is larger—about 3.26 light-years. Professional astronomy often prefers parsecs; outreach often prefers light-years.`,
			},
		],
	},

	{
		slug: "scientific-length-units",
		title: msg`Scientific Length Units: Ångström, Nanometre, Micrometre, and More`,
		description: msg`Navigate ångströms, nanometres, micrometres, picometres, and related scientific length units used in chemistry, physics, and materials science.`,
		relatedConverters: [
			{ quantity: "Length", from: "Ångström", to: "Nanometre" },
			{ quantity: "Length", from: "Nanometre", to: "Micrometre" },
			{ quantity: "Length", from: "Picometre", to: "Nanometre" },
			{ quantity: "Length", from: "Micrometre", to: "Millimetre" },
		],
		sections: [
			{
				heading: msg`Why science needs tiny length units`,
				paragraphs: [
					msg`Atoms, molecules, wavelengths of light, and crystal lattices are far smaller than millimetres. Saying 0.000 000 000 2 m repeatedly is unreadable. Prefixed SI units and a few traditional scientific units keep numbers near human scale.`,
					msg`The micrometre (µm) covers cells and many manufacturing tolerances. The nanometre (nm) covers visible-light wavelengths and nanoparticle sizes. The ångström (Å), equal to 0.1 nm or 10⁻¹⁰ m, remains common in crystallography and chemistry for bond lengths.`,
					msg`Picometres and femtometres appear in nuclear and precision atomic contexts. Choosing among them is about readability and community convention, not different physics.`,
				],
			},
			{
				heading: msg`The ångström in chemistry and crystallography`,
				paragraphs: [
					msg`Typical covalent bond lengths fall around one to two ångströms. X-ray crystallography papers often report lattice parameters in ångströms. Converting to nanometres is a shift by ×0.1: 1.54 Å = 0.154 nm. Converting to picometres multiplies by 100: 1.54 Å = 154 pm—sometimes preferred in quantum-chemistry outputs.`,
					msg`SI purists prefer nanometres or picometres, and many journals accept either. When collaborating, agree on a unit for tables and convert consistently in supplementary data. Reviewers notice when Figure 1 uses nm and Table 2 uses Å without a conversion note.`,
					msg`Because 1 Å = 10⁻¹⁰ m exactly in ordinary use, conversion is a clean power of ten—ideal for decimal arithmetic and less prone to exotic floating-point drama than customary-unit factors. Still label every column; clean math does not excuse ambiguous headers.`,
				],
			},
			{
				heading: msg`Nanometres in optics and nanotechnology`,
				paragraphs: [
					msg`Visible light spans roughly 400–700 nm. Specifying a laser as 532 nm is clearer than 5.32 × 10⁻⁷ m. Thin-film coatings and diffraction problems live naturally in nanometres. Students who only ever see scientific notation often mis-count zeros when translating to nanometres—practice both forms side by side.`,
					msg`Semiconductor process nodes historically used nanometre branding; interpret marketing nodes cautiously versus physical gate lengths. Still, the nanometre remains the linguistic home of small electronic features. Materials papers on nanoparticles likewise default to nm for diameters and to m²/g for surface area—do not mix those quantity types.`,
					msg`Convert nm → m by multiplying by 10⁻⁹. Convert nm → µm by dividing by 1 000. Keep powers of ten explicit in lab notebooks. A one-line dimensional check after every conversion catches most transcription mistakes before they enter a paper draft.`,
				],
			},
			{
				heading: msg`Micrometres in biology and machining`,
				paragraphs: [
					msg`Bacteria sizes, human-cell diameters, and microfabricated channels are often quoted in micrometres. A red blood cell on the order of 7–8 µm is a classic teaching example. Plant cells and many protozoa push into tens or hundreds of micrometres, which is why biology lectures hop prefixes mid-sentence.`,
					msg`Precision machining and metrology may specify tolerances in micrometres (or microns in shop slang). Confirm whether a drawing’s micron means micrometre—almost always yes in modern practice. When a drawing mixes µm tolerances with inch nominals, convert one system to authority before quoting capability to a customer.`,
					msg`Optical microscope resolution discussions blur micrometre and nanometre scales depending on technique. Match the unit to the instrument’s meaningful precision. Reporting 12.345 µm from an instrument good to 0.2 µm invents false confidence after conversion from millimetres.`,
				],
			},
			{
				heading: msg`Planck length and other extreme units`,
				paragraphs: [
					msg`The Planck length (~1.6 × 10⁻³⁵ m) is a theoretical scale from fundamental constants, not a laboratory measuring stick. Converters may include it for education; it is not for machining parts. Treat any practical claim of measuring to a Planck length as a misunderstanding of the unit’s role.`,
					msg`Bohr radii and related atomic units appear in quantum chemistry. Convert to metres or picometres when comparing to experimental bond lengths in SI-friendly tables. Document the CODATA or software-default Bohr radius your package assumes if you need exact reproducibility.`,
					msg`Extreme units teach scale stacking: from Planck lengths to the observable universe spans dozens of orders of magnitude. Prefixed metres and scientific notation are the bridges. A one-page scale ladder on the lab wall—nm, µm, mm, m—prevents more mistakes than another slide of prefix trivia.`,
				],
			},
			{
				heading: msg`Best practices for scientific conversion`,
				paragraphs: [
					msg`State uncertainties with units. Converting 1.540 0 Å to nanometres should preserve significant figures: 0.154 00 nm if the precision is real.`,
					msg`Avoid mixing ångströms and nanometres in the same column without labels. Silent unit changes are a frequent source of plot errors.`,
					msg`Use a trusted converter or exact powers of ten for SI prefixes. Reserve careful factor lookup for customary units and specialised astronomical lengths.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many nanometres are in an ångström?`,
				answer: msg`One ångström equals 0.1 nanometre (and 100 picometres). Multiply ångströms by 0.1 to get nanometres.`,
			},
			{
				question: msg`Is a micron the same as a micrometre?`,
				answer: msg`In common scientific and engineering usage, yes: micron is informal language for micrometre (10⁻⁶ m). Prefer micrometre in formal writing.`,
			},
			{
				question: msg`Should I use ångströms or nanometres in a paper?`,
				answer: msg`Follow the journal and your field’s norms. Crystallography often still uses ångströms; much of nanoscience prefers nanometres. Consistency within a manuscript matters most.`,
			},
		],
	},
	{
		slug: "converting-acres-hectares-square-meters",
		title: msg`Converting Acres, Hectares, and Square Metres`,
		description: msg`Land-area conversion made clear: acres, hectares, square metres, and square kilometres—with exact factors and pitfalls from surveying history.`,
		relatedConverters: [
			{ quantity: "Area", from: "Acre", to: "Hectare" },
			{ quantity: "Area", from: "Hectare", to: "Square Metre" },
			{ quantity: "Area", from: "Acre", to: "Square Metre" },
			{ quantity: "Area", from: "Square Kilometre", to: "Hectare" },
		],
		sections: [
			{
				heading: msg`Land area units you will meet`,
				paragraphs: [
					msg`Square metres and square kilometres are SI-friendly area units. Hectares (1 ha = 10 000 m²) are accepted for land measurement worldwide. Acres dominate US land conversation and appear in many English-language property records. International investors often need all three on one fact sheet.`,
					msg`One hectare is a square 100 m on a side—easy to visualise on a metric map. One international acre is 4 046.856 422 4 m², defined via the international yard and foot. That exact definition replaced older regional acres for most conversion work. When a historical document says acre without geometry, treat marketing roundings as approximate until a survey confirms them.`,
					msg`Square kilometres suit regions and parks; hectares suit farms and forests; acres suit US parcels; square metres suit building footprints and small lots. Pick the unit that keeps the number readable for the decision at hand, then convert for comparison—not the other way around.`,
				],
			},
			{
				heading: msg`Exact relationships worth remembering`,
				paragraphs: [
					msg`1 ha = 10 000 m². 1 km² = 100 ha = 1 000 000 m². 1 acre ≈ 0.404 686 ha. 1 acre ≈ 4 047 m² (more precisely 4 046.856 422 4 m²). 1 acre = 43 560 ft² by definition in US customary land measure tied to the survey/international foot discussion. Memorise the hectare and the acre-to-square-metre pair; derive the rest when needed.`,
					msg`For quick mental math: multiply hectares by 2.47 to estimate acres; multiply acres by 0.4 to estimate hectares. Then refine with a precise converter for legal work. Field estimates can use the rough factors; contracts and cadastre updates should not.`,
					msg`Never use linear mile-to-kilometre factors on acreages without squaring. Area conversion is not the same as length conversion. A 10% length-factor mistake becomes roughly a 21% area mistake after squaring—large enough to matter in lease negotiations.`,
				],
			},
			{
				heading: msg`Survey feet and historical caveats`,
				paragraphs: [
					msg`The US has distinguished international feet from survey feet in geospatial contexts. Tiny differences per foot become measurable over large parcels. Modern practice is converging on the international foot, but old plats may embed survey-foot geometry.`,
					msg`If you convert archived legal descriptions, note the epoch and foot definition used by the surveying authority. GIS professionals care about this; backyard gardeners usually do not.`,
					msg`Deeds may list acres to two decimals while the underlying metes-and-bounds geometry is more precise—or less. Conversion cannot add accuracy that the survey never measured.`,
				],
			},
			{
				heading: msg`Practical property and agriculture examples`,
				paragraphs: [
					msg`A 2.5-acre hobby farm is about 1.01 ha or about 10 117 m². A 40-hectare orchard is 0.4 km² and about 98.8 acres. These ballparks help when reading international listings.`,
					msg`Seed and fertiliser rates mix area units with mass: kg/ha versus lb/acre. Convert area and mass separately, then combine. Dimensional analysis prevents inverted rates.`,
					msg`Solar farm and sports-pitch comparisons often quote hectares in one article and acres in another. Convert before arguing which site is larger.`,
				],
			},
			{
				heading: msg`Building footprints versus lot size`,
				paragraphs: [
					msg`Lot size may be acres; building floor area may be square metres or square feet. They measure different polygons. Floor-area ratio calculations fail if you convert units but mix the wrong polygons.`,
					msg`Zoning documents sometimes switch units between sections. Create a one-page unit key for the project and convert every cited figure into a single working unit.`,
					msg`When estimating permeable surface for drainage fees, keep everything in m² or ft² consistently; switching mid-spreadsheet is how permit numbers go wrong.`,
				],
			},
			{
				heading: msg`Workflow for trustworthy land conversions`,
				paragraphs: [
					msg`Prefer converting through square metres as a base. Acre → m² → hectare is transparent and easy to audit. Round to the precision required by the legal or agronomic context at the end only. Title reports and GIS layers should name the unit in the filename or layer metadata so downloads remain unambiguous.`,
					msg`Record the factor source (international acre, local regulation) in project notes. Future you will not remember which constant you typed. If a client provides acres from an old survey foot regime, flag that in the same note before anyone designs fencing from a soft-converted hectare figure.`,
					msg`Sanity-check magnitudes: a suburban house lot of 0.2 acres is hundreds of square metres, not hundreds of hectares. A national park listed as 2 000 hectares is tens of square kilometres—if your spreadsheet shows 2 000 km², you dropped a factor of one hundred.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many square metres are in a hectare?`,
				answer: msg`Exactly 10 000 square metres. A hectare is a square 100 metres on each side.`,
			},
			{
				question: msg`How many acres are in a hectare?`,
				answer: msg`One hectare is approximately 2.471 acres. One acre is approximately 0.4047 hectares.`,
			},
			{
				question: msg`Can I convert acres to square kilometres directly?`,
				answer: msg`Yes—both are area units. One square kilometre equals 100 hectares, or about 247.1 acres. Converting through square metres or hectares keeps the arithmetic clear.`,
			},
		],
	},
	{
		slug: "temperature-scales-history",
		title: msg`A Brief History of Temperature Scales`,
		description: msg`From early thermoscopes to Celsius, Fahrenheit, Kelvin, and Newton—how temperature scales evolved and why multiple scales still appear in converters.`,
		relatedConverters: [
			{ quantity: "Temperature", from: "Celsius", to: "Fahrenheit" },
			{ quantity: "Temperature", from: "Kelvin", to: "Celsius" },
			{ quantity: "Temperature", from: "Fahrenheit", to: "Newton" },
			{ quantity: "Temperature", from: "Newton", to: "Celsius" },
		],
		sections: [
			{
				heading: msg`Before standard degrees`,
				paragraphs: [
					msg`Early thermoscopes showed expansion of air or liquid with heat but lacked shared numeric scales. Without fixed points agreed between cities, a reading could not travel with a letter or a scientific paper. Reproducibility—not convenience—pushed instrument makers toward shared reference points.`,
					msg`Instrument makers began marking fixed points such as melting ice, boiling water, or human body temperature. The choice of fixed points and how many degrees to place between them created competing scales. Even the direction of numbering (which end was zero) varied before conventions settled.`,
					msg`That historical competition explains why converters still list scales most people never use daily: they are part of the documentary record of science and occasionally appear in older texts. Meeting an unfamiliar scale in an archive is less intimidating when you know it is usually just another affine mapping to kelvin.`,
				],
			},
			{
				heading: msg`Fahrenheit’s practical scale`,
				paragraphs: [
					msg`Daniel Gabriel Fahrenheit produced reliable mercury thermometers in the early eighteenth century and a scale that placed familiar weather and body temperatures in convenient numbers. Freezing water at 32 and boiling at 212 gave 180 divisions between those points. Those numbers were engineering choices as much as scientific ones.`,
					msg`The Fahrenheit scale spread with instrument trade and remains embedded in US weather culture and some industrial practices. Its degree size is smaller than Celsius, which can feel more granular for everyday weather talk. That cultural grip is why dual-scale forecasts remain useful for international audiences.`,
					msg`Modern Fahrenheit is defined by exact conversion to Celsius/Kelvin rather than by Fahrenheit’s original reference experiments—metrology moved on, the name stayed. When you convert today, you are using the modern definition, not reconstructing eighteenth-century brine experiments.`,
				],
			},
			{
				heading: msg`Celsius and centigrade`,
				paragraphs: [
					msg`Anders Celsius proposed a hundred-degree scale between water’s freezing and boiling points. The modern orientation (0 at freezing, 100 at boiling) became the everyday metric temperature scale.`,
					msg`The word centigrade historically described a hundred-grade scale; today Celsius is the preferred name in scientific communication, tied formally to kelvin.`,
					msg`Celsius conquered international weather reporting, cooking outside the US, and most engineering education. Its alignment with kelvin degree size makes scientific conversion tidy.`,
				],
			},
			{
				heading: msg`Kelvin and absolute temperature`,
				paragraphs: [
					msg`William Thomson (Lord Kelvin) advanced absolute thermodynamic temperature. The kelvin starts at absolute zero and uses the same degree size as Celsius. Equations of gas behaviour and statistical mechanics prefer absolute scales because ratios and absolute values behave cleanly without arbitrary offsets.`,
					msg`SI defines the kelvin via fundamental constants in modern metrology, completing a journey from ice baths to quantum standards. Everyday users still convert to Celsius for intuition. Lab notebooks should still record which scale a sensor firmware emits—assumptions here cause multi-degree biases.`,
					msg`Negative Celsius readings are normal; negative kelvin values are not used for ordinary thermodynamic temperatures. Historical oddities and pop-science misstatements sometimes confuse this point. If a conversion yields negative kelvin from a plausible Celsius input path, the implementation is wrong.`,
				],
			},
			{
				heading: msg`Newton and other historical scales`,
				paragraphs: [
					msg`Isaac Newton experimented with a temperature scale based on freely cooling materials and other references. The Newton scale appears in some converters as a historical curiosity with a zero near freezing and a smaller degree count to boiling.`,
					msg`Réaumur, Rankine, Delisle, and others also left traces in archives and specialised engineering domains (Rankine still appears in some US thermodynamic teaching as an absolute Fahrenheit-sized scale).`,
					msg`Knowing these scales exist helps when reading older papers—but for new work, prefer Celsius for communication and Kelvin for absolute thermodynamic quantities.`,
				],
			},
			{
				heading: msg`What history teaches converters`,
				paragraphs: [
					msg`Temperature conversion is affine because zeros were chosen for convenience. Length units rarely need offsets; temperature almost always does for Celsius and Fahrenheit.`,
					msg`Document which scale a dataset uses. Historical weather records may need station metadata and even scale reconstruction before comparison to modern Celsius series.`,
					msg`When you see Newton temperature beside Newton force in a unit list, read the quantity label carefully—name collisions are a historical accident. Good converters group by quantity first so a temperature Newton never sits beside a force newton in a way that invites clicking the wrong tool.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Why do we still use Fahrenheit if Celsius is international?`,
				answer: msg`Cultural and infrastructural inertia. Weather services, thermostats, and public expectations in some countries remain Fahrenheit-based. Science and most countries use Celsius or Kelvin.`,
			},
			{
				question: msg`Is Kelvin written with a degree symbol?`,
				answer: msg`No. Modern style writes 300 K without a degree symbol, unlike °C and °F. The unit is the kelvin.`,
			},
			{
				question: msg`What is the Newton temperature scale used for today?`,
				answer: msg`Almost nothing in daily practice. It appears mainly in historical discussions and comprehensive converters. Use Celsius or Kelvin for new scientific work.`,
			},
		],
	},
	{
		slug: "imperial-volume-us-vs-uk",
		title: msg`Imperial Volume: US vs UK Measures`,
		description: msg`Why US cups, pints, and gallons disagree with UK imperial measures—and how to convert cooking and liquid volumes without spoiling a recipe or a report.`,
		relatedConverters: [
			{ quantity: "Volume", from: "Cup", to: "Litre" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
			{ quantity: "Volume", from: "Cup", to: "Tablespoon (Metric)" },
			{ quantity: "Volume", from: "Tablespoon (Metric)", to: "Litre" },
		],
		sections: [
			{
				heading: msg`Same names, different volumes`,
				paragraphs: [
					msg`English-speaking countries reused words like pint, quart, and gallon for liquid measure, then standardised them differently. A US liquid gallon is 231 in³ (exactly 3.785 411 784 L). An imperial gallon is 4.546 09 L. That is roughly a 20% difference—large enough to ruin dilution math and beverage yield planning.`,
					msg`Pints follow their gallons: eight pints to a gallon in both systems, so the pints differ by the same ratio. Ordering a pint while travelling teaches metrology faster than a textbook. Pub glassware regulations and labelling laws encode these differences whether cooks notice or not.`,
					msg`Cups are even less consistent. US customary cups, US legal cups for nutrition labels, and metric cups (often 250 mL) all appear in recipes. Always identify which cup a source assumes. When a blog omits that detail, convert cautiously or find a weighed version of the same recipe.`,
				],
			},
			{
				heading: msg`Cooking consequences`,
				paragraphs: [
					msg`Baking formulas are sensitive to liquid ratios. Swapping a 250 mL metric cup into a recipe written for a 240 mL US cup quietly adds liquid. Cakes and breads may still work; macarons and laminated doughs may not forgive it. Professional kitchens avoid the ambiguity by weighing nearly everything.`,
					msg`British recipes sometimes use imperial pints alongside metric weights—a hybrid that makes sense locally and confuses importers. Convert liquids to millilitres and dry goods to grams for a portable version.`,
					msg`Tablespoons differ internationally as well. Many metric spoons are 15 mL; some traditional Australian tablespoons were 20 mL. When a recipe is critical, prefer weighed ingredients or millilitre measures.`,
				],
			},
			{
				heading: msg`Fuel, labs, and industry`,
				paragraphs: [
					msg`Fuel economy figures in miles per gallon depend on which gallon you mean. Comparing a US mpg sticker to a UK mpg figure without converting gallons misleads by about 20%. Prefer L/100 km for cross-border comparison, then convert only for local storytelling.`,
					msg`Chemical packaging and SDS documents should state litres or cubic metres explicitly. If gallons appear, look for US versus imperial labelling. Mistaking them in dilution calculations has safety implications, especially for concentrates where a 20% volume error is not cosmetic.`,
					msg`Brewing and beverage industries historically lived on barrels and gallons with local definitions. Modern quality systems increasingly standardise on litres while keeping traditional names for marketing. Treat marketing units as labels and production units as litres whenever possible.`,
				],
			},
			{
				heading: msg`A practical conversion strategy`,
				paragraphs: [
					msg`Convert regional units to litres (or millilitres) as soon as possible. Work in SI-friendly volume, then convert back to the utensil or legal unit required for output. That round trip through litres is the cheapest insurance against US/UK name collisions.`,
					msg`Keep a tiny reference card: US gal ≈ 3.785 L; imperial gal ≈ 4.546 L; metric cup = 250 mL; US legal cup = 240 mL. Those four numbers prevent most kitchen disasters.`,
					msg`In software and spreadsheets, name columns us_cup_mL or imperial_pint_mL rather than cup or pint. Ambiguous column headers are data bugs waiting to happen.`,
				],
			},
			{
				heading: msg`Dry versus liquid measures`,
				paragraphs: [
					msg`Historical dry pints and quarts add another layer rarely relevant to modern home cooking but still present in archives. Do not assume a dry pint equals a liquid pint without checking.`,
					msg`For pantry staples, weight beats any pint definition. A pint of blueberries and a pint of cooked rice are market conventions more than laboratory volumes.`,
					msg`If a canning recipe comes from another country, convert volumes carefully and prefer updated recipes tested in your jar system—food safety depends on more than unit math.`,
				],
			},
			{
				heading: msg`Communicating volumes across borders`,
				paragraphs: [
					msg`Publish millilitres alongside cups. Publish litres alongside gallons. Dual labelling is cheap compared with failed batches and angry comments.`,
					msg`When reading older UK material, assume imperial gallons unless told otherwise. When reading US material, assume US liquid measures unless a metric cup is specified.`,
					msg`Converters that expose a single cup unit should document which cup they implement. Users deserve that footnote. If you publish recipe software, store volumes internally in millilitres and localise the display unit—do not store ambiguous cup counts as if they were universal constants.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How much larger is an imperial gallon than a US gallon?`,
				answer: msg`An imperial gallon is about 4.546 L versus about 3.785 L for a US liquid gallon—roughly 20% larger. Always check which gallon a figure uses.`,
			},
			{
				question: msg`Which cup should I use for baking?`,
				answer: msg`Use the cup standard assumed by the recipe’s author, or convert the recipe to millilitres and grams. Metric cups (250 mL) and US cups (~240 mL) are not interchangeable for precision baking.`,
			},
			{
				question: msg`Why do converters list a single cup unit?`,
				answer: msg`Many tools pick one common definition for simplicity—often a US cup or a metric cup. Read the tool’s documentation and prefer litre-based measures when you need unambiguous results.`,
			},
		],
	},

	{
		slug: "precision-in-engineering-conversions",
		title: msg`Precision in Engineering Conversions`,
		description: msg`How engineers should convert units without destroying tolerances—significant figures, exact factors, stack-ups, and documentation habits that keep parts fitting.`,
		relatedConverters: [
			{ quantity: "Length", from: "Millimetre", to: "Inch (International)" },
			{ quantity: "Length", from: "Inch (International)", to: "Millimetre" },
			{ quantity: "Area", from: "Square Inch", to: "Square Millimetre" },
			{ quantity: "Length", from: "Foot (International)", to: "Meter" },
		],
		sections: [
			{
				heading: msg`Tolerances do not survive careless conversion`,
				paragraphs: [
					msg`A shaft specified as 10.00 ± 0.02 mm is not the same as casually writing 0.394 in after a phone conversion rounded to three decimals. Soft conversion can eat the tolerance budget before the machine starts. The scrap bin fills with parts that were converted casually rather than machined poorly.`,
					msg`Hard conversion uses exact factors and then rounds according to a stated rule that preserves the intent of the tolerance. Soft conversion picks a convenient nearby nominal in the other system. Both are valid strategies—but they are different strategies. Write which one you used in the revision block.`,
					msg`Engineering drawings should declare the conversion policy. Global teams that mix methods produce parts that almost fit, which is worse than parts that clearly do not. Almost-fitting parts waste inspection time and erode trust between suppliers.`,
				],
			},
			{
				heading: msg`Exact factors and significant figures`,
				paragraphs: [
					msg`Use exact definitions: 1 in = 25.4 mm. Convert with full precision, then round once for the drawing. Intermediate rounding in a multi-step spreadsheet is a common source of mysterious 0.01 mm disagreements between vendors. Lock conversion cells as formulas, not pasted values, when possible.`,
					msg`Significant figures should reflect measurement capability and functional need. Listing eight decimals after converting a tape-measure dimension pretends to precision you do not have. Inspectors should be told which digits are functional and which are artefacts of conversion display.`,
					msg`For statistical process control, keep one internal unit system in the database and convert only at presentation boundaries. Converting stored history repeatedly degrades data and complicates capability studies across plants.`,
				],
			},
			{
				heading: msg`Bilateral tolerances and unit changes`,
				paragraphs: [
					msg`When converting a nominal with ± tolerance, convert the limits (upper and lower) and then restate nominal and tolerance, or convert nominal and tolerance with consistent rounding rules that never shrink the allowed zone unintentionally.`,
					msg`Unequal tolerances and fits (H7/g6 style thinking, even when expressed in inches historically) need special care. Convert the limiting sizes that define the fit, not just a single mid value.`,
					msg`GD&T frames and datum schemes are unit-agnostic in logic but unit-specific in numbers. Update the entire feature control frame set coherently.`,
				],
			},
			{
				heading: msg`Area, volume, and derived quantities`,
				paragraphs: [
					msg`Stress, pressure, density, and flow combine units. Convert each base dimension with factors raised to the correct powers. A pressure conversion error often starts as a length or area factor used linearly.`,
					msg`Finite-element and CFD models are merciless about unit consistency. Pick SI for the model, convert inputs in, convert outputs out. Mixed-unit decks are legendary failure modes.`,
					msg`Bill-of-materials lengths might be metric while packaging volumes are litres and shipping weights are kilograms—still keep each quantity’s conversions isolated and labelled.`,
				],
			},
			{
				heading: msg`Software, PLM, and dual dimensioning`,
				paragraphs: [
					msg`CAD dual dimensioning should derive the secondary unit from the primary, never the reverse on alternate days. Primary units own the design authority. Secondary values are communication aids, not a second source of truth.`,
					msg`PLM exports to suppliers must state units in the file, not only in an email. Ambiguous CSV columns are scrap tickets waiting to happen.`,
					msg`Automated converters in ERP systems need decimal arithmetic for money-adjacent quantities and for regulated dimensions. Binary float leftovers show up as mismatched hashes between plants.`,
				],
			},
			{
				heading: msg`A field checklist`,
				paragraphs: [
					msg`Identify authoritative units. Choose hard or soft conversion deliberately. Use exact factors. Convert limits for fits. Round once. Record the policy. Verify with a go/no-go mental estimate.`,
					msg`On the shop floor, give machinists drawings in the unit their tools display. Forcing constant mental conversion increases scrap more than any factor-table debate. If dual dimensions are required, derive the secondary unit from one authoritative primary value every time the drawing updates.`,
					msg`When a part fails inspection after a unit change, audit the conversion before auditing the operator. Many escapes are metrological, not motivational. Keep a short conversion verification coupon on first-article inspections whenever drawings change unit systems.`,
				],
			},
		],
		faqs: [
			{
				question: msg`What is the difference between hard and soft conversion?`,
				answer: msg`Hard conversion uses exact factors and preserves the original intent as closely as rounding allows. Soft conversion chooses a convenient near value in the other unit system, possibly adjusting tolerances, for manufacturability in local tooling.`,
			},
			{
				question: msg`Should I round millimetre equivalents of inches to whole millimetres?`,
				answer: msg`Only for soft conversion where the design can tolerate it. For precision fits, keep the necessary decimals after multiplying by 25.4 and round according to a documented rule that protects the tolerance zone.`,
			},
			{
				question: msg`Why do two vendors disagree in the fourth decimal place?`,
				answer: msg`Often because of intermediate rounding, different foot definitions historically, or floating-point display modes. Agree on exact factors, a single conversion path, and a shared rounding policy.`,
			},
		],
	},
	{
		slug: "nanometre-to-metre-scale",
		title: msg`From Nanometre to Metre: Understanding Scale`,
		description: msg`Build intuition for lengths spanning nanometres to metres—powers of ten, everyday analogies, and clean conversion habits across SI prefixes.`,
		relatedConverters: [
			{ quantity: "Length", from: "Nanometre", to: "Meter" },
			{ quantity: "Length", from: "Nanometre", to: "Micrometre" },
			{ quantity: "Length", from: "Micrometre", to: "Millimetre" },
			{ quantity: "Length", from: "Millimetre", to: "Meter" },
		],
		sections: [
			{
				heading: msg`Nine orders of magnitude in one glance`,
				paragraphs: [
					msg`One metre is 1 000 millimetres, 1 000 000 micrometres, or 1 000 000 000 nanometres. Climbing from nm to m is climbing nine powers of ten. That span covers DNA widths, bacteria, human hairs, insects, and human-scale objects—one reason science communication leans so hard on scale ladders.`,
					msg`Powers-of-ten thinking prevents panic when a lab protocol says 250 nm and your calipers read millimetres. Convert to metres first: 250 nm = 2.5 × 10⁻⁷ m = 0.000 25 mm—far below caliper resolution. The conversion is correct; the instrument choice is wrong.`,
					msg`Scale intuition is a professional skill in science education, microfabrication, and biology. Converters give numbers; analogies give judgment. Teams that share a common set of landmarks waste less time arguing about whether a result looks reasonable.`,
				],
			},
			{
				heading: msg`Landmarks from nanometre upward`,
				paragraphs: [
					msg`Atomic diameters are on the order of 0.1 nm (1 Å). Small molecules span a few nanometres. Many viruses sit in tens to hundreds of nanometres. Wavelengths of visible light are hundreds of nanometres—linking optics to nanometre language.`,
					msg`Bacteria often measure about one micrometre. Human cells are typically tens of micrometres. A human hair might be 50–100 µm wide. These landmarks help students check whether a converted value is absurd.`,
					msg`Millimetres rule machining and product design. Metres rule architecture and human movement. Connecting the ladder of landmarks makes SI prefixes feel like places, not trivia.`,
				],
			},
			{
				heading: msg`Conversion patterns that never fail`,
				paragraphs: [
					msg`nm → µm: divide by 1 000. µm → mm: divide by 1 000. mm → m: divide by 1 000. Each step is three orders of ten. nm → m: divide by 10⁹ (or multiply by 10⁻⁹). Drill those shifts until they are automatic under exam or shift pressure.`,
					msg`Going the other way multiplies. 0.003 m = 3 mm = 3 000 µm = 3 000 000 nm. Writing scientific notation beside prefixed units catches slip errors. Dual writing is especially helpful when exporting CSV files that strip unit metadata.`,
					msg`For area and volume at small scales, remember to square and cube. A square micrometre is not related to a square millimetre by 1 000—it is related by 1 000² = 10⁶. Microfluidic volume calculations fail loudly when that power is missed.`,
				],
			},
			{
				heading: msg`Instruments and resolution`,
				paragraphs: [
					msg`You cannot verify a 20 nm feature with a kitchen ruler. Match the instrument to the scale: electron microscopy and specialised metrology for nanometres; optical microscopy for micrometres; micrometers and CMMs for millimetres. Conversion cannot upgrade an instrument’s resolution.`,
					msg`Reporting a converted value finer than the instrument’s resolution is false precision. Conversion should not invent digits the measurement never provided.`,
					msg`Calibration certificates themselves use units—read them. A gauge block set in inches converted carelessly into millimetres for a metric CMM program is a process risk.`,
				],
			},
			{
				heading: msg`Teaching and communicating scale`,
				paragraphs: [
					msg`Powers-of-ten videos and scale-of-universe graphics work because they walk the prefix ladder visually. Pair them with actual conversion drills so students can compute, not only watch.`,
					msg`In writing, introduce an unfamiliar small unit with an SI comparison once: 80 nm (0.08 µm) pores. Readers retain the comparison better than a bare nanometre figure. Repeat the comparison in figure captions, where readers often look first under time pressure.`,
					msg`Avoid mixing nm and Å in the same paragraph without conversion. Experts can switch; mixed audiences get lost. The same advice applies when slides jump from micrometres of cell width to nanometres of membrane thickness without a verbal bridge between the scales.`,
				],
			},
			{
				heading: msg`Using converters as a scale gym`,
				paragraphs: [
					msg`Practice converting the same length through nm, µm, mm, and m until the decimal shifts feel boring. Boredom here is competence.`,
					msg`Then practice area and volume at two scales to ensure the squared and cubed factors are automatic. Most residual mistakes are missing powers, not missing prefix names.`,
					msg`Finally, convert a real lab value from a paper into the unit your instrument displays. That end-to-end habit is what professional work demands. If the converted value sits below the instrument’s resolution, change the measurement plan—do not pretend the conversion created observability.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many nanometres are in a metre?`,
				answer: msg`Exactly 1 000 000 000 nanometres (10⁹ nm). One nanometre is 10⁻⁹ metre.`,
			},
			{
				question: msg`Is 1 µm equal to 1 000 nm?`,
				answer: msg`Yes. One micrometre equals 1 000 nanometres. Both equal 10⁻⁶ m and 10⁻⁹ m × 1 000 respectively.`,
			},
			{
				question: msg`Why do biologists say microns and nanometres in the same talk?`,
				answer: msg`Different structures sit at different scales. Cells may be discussed in microns (micrometres) while membranes, pores, or wavelengths are discussed in nanometres. Convert between them by factors of 1 000.`,
			},
		],
	},
	{
		slug: "choosing-the-right-unit",
		title: msg`Choosing the Right Unit for the Job`,
		description: msg`A practical decision guide for picking length, area, volume, and temperature units that keep numbers readable, standards-compliant, and hard to misinterpret.`,
		relatedConverters: [
			{ quantity: "Length", from: "Meter", to: "Kilometre" },
			{ quantity: "Area", from: "Square Metre", to: "Hectare" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
			{ quantity: "Temperature", from: "Celsius", to: "Kelvin" },
		],
		sections: [
			{
				heading: msg`Start with audience and standard`,
				paragraphs: [
					msg`The right unit is the one your audience already uses—and the one your regulator, journal, or customer contract requires. A perfect SI choice that nobody on the job site can read will still cause errors. Clarity for humans and compliance for auditors both count as correctness.`,
					msg`When audience and standard conflict, publish both: primary unit for compliance, secondary for local clarity, with an explicit conversion note. Dual labelling beats silent assumption. Make the primary unit visually dominant so readers know which value wins if rounding differs.`,
					msg`International teams should pick a project system of units in kickoff documents. Retrofits mid-project are expensive. Include firmware defaults, CAD templates, and supplier portals in that decision—not only the report text.`,
				],
			},
			{
				heading: msg`Keep leading digits readable`,
				paragraphs: [
					msg`Prefer units that keep values roughly between 0.1 and 999 for ordinary communication. Prefer 12.5 km over 12 500 m for a road distance; prefer 12.5 m over 0.0125 km for a room length. Readable magnitude is part of error prevention.`,
					msg`Scientific notation supplements prefixes when values span wide ranges in one table. Consistency within a column matters more than clever prefix switching every row. Readers compare numbers faster when the unit token does not change every line.`,
					msg`Dashboards and UI converters should default to locale-sensible units but allow overrides. Remember user preference without fighting legal labelling requirements. Logged analytics events should store a canonical unit so preference changes do not corrupt historical aggregates.`,
				],
			},
			{
				heading: msg`Match the quantity—then the unit`,
				paragraphs: [
					msg`Choose length versus area versus volume before choosing metres versus feet. Many “unit” problems are quantity problems in disguise, especially in construction estimates.`,
					msg`Temperature choices depend on whether you need absolute thermodynamic temperature (kelvin) or human-facing weather and cooking scales (Celsius or Fahrenheit).`,
					msg`Derived units (pressure, density, flow) should come from a coherent base system when possible. Coherence reduces the number of conversion factors in equations.`,
				],
			},
			{
				heading: msg`Industry patterns that work`,
				paragraphs: [
					msg`Machining: millimetres or inches, never both as authoritative. Civil land: hectares or acres plus square metres for footprints. Chemistry: litres and millilitres, with m³ for bulk tanks. Astrophysics: AU, parsecs, light-years depending on scale. Each domain already solved readability—borrow those norms instead of inventing a private system.`,
					msg`Food labelling regimes may legally define cups and servings differently from grandma’s measuring cup. Follow the regulation for packaging; follow tested recipes for cooking. When the two conflict in a product development kitchen, keep separate spec sheets rather than forcing one ambiguous cup column.`,
					msg`Software defaults influence everything. CAD templates, sensor firmwares, and CSV exporters silently choose units—audit them. A fifteen-minute defaults review at project start prevents weeks of forensic unit archaeology later.`,
				],
			},
			{
				heading: msg`Precision, uncertainty, and honesty`,
				paragraphs: [
					msg`A unit choice cannot fix a poor measurement. It can only present the measurement clearly. State uncertainties and significant figures honestly after conversion. Converting an uncertain value into a flashy tiny unit does not make the measurement more precise.`,
					msg`Prefer exact SI factors when converting customary units for engineering. Prefer documented legal definitions for trade and land. Prefer community convention in a field only after those constraints are satisfied.`,
					msg`If two unit choices are equally readable, pick the one that minimises conversion steps to your equations or machines. Fewer conversions mean fewer opportunities to invert a factor or forget to square an area scale.`,
				],
			},
			{
				heading: msg`A short decision recipe`,
				paragraphs: [
					msg`Identify quantity. Check legal and contractual requirements. Choose a readable unit for the magnitude. Confirm the audience recognises it. Convert through base units with exact factors. Round for display once. Label every number. If you cannot label a chart axis unambiguously, the unit choice is not finished.`,
					msg`Review one sample output with a colleague from another country or trade. If they misread it, your unit choice failed—even if the math was perfect. Usability testing for units sounds excessive until the first shipment fails incoming inspection.`,
					msg`Revisit choices when the project scale changes: a prototype in millimetres may become a site plan in metres without anyone updating the spreadsheet headers. Headers matter. Build a one-page unit register for long projects listing quantity, authoritative unit, display unit, and conversion owner so changes leave an audit trail.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is SI always the right choice?`,
				answer: msg`SI is usually best for science and international engineering, but local codes, tools, and audiences may require customary units. When they do, convert carefully and document the authoritative system.`,
			},
			{
				question: msg`Should I dual-label every measurement?`,
				answer: msg`Dual-label when audiences or regulations split across systems. Avoid cluttering specialist documents that already share one system—there, clear single-unit labelling is better.`,
			},
			{
				question: msg`What unit should temperature data use in a scientific archive?`,
				answer: msg`Prefer kelvin for absolute thermodynamic data, or Celsius with explicit labels for many experimental datasets. Never leave temperature numbers unlabeled.`,
			},
		],
	},
	{
		slug: "body-height-conversions",
		title: msg`Body Height Conversions: Feet, Inches, and Centimetres`,
		description: msg`How to convert height between centimetres, metres, feet, and inches for forms, sports, and health records—without mixing systems mid-sentence.`,
		relatedConverters: [
			{ quantity: "Length", from: "Centimetre", to: "Inch (International)" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Length", from: "Inch (International)", to: "Centimetre" },
			{ quantity: "Length", from: "Foot (International)", to: "Meter" },
		],
		sections: [
			{
				heading: msg`Why height forms cause so many errors`,
				paragraphs: [
					msg`Height looks simple until a form asks for feet and inches while your passport lists centimetres. People round early, forget the remaining inches, or paste a decimal foot value into an inches field. Those mistakes show up in clothing orders, medical charts, and sports eligibility checks.`,
					msg`Treat height as a length conversion problem with a clear target format. Decide whether the destination wants a single metric value (cm or m) or a dual customary pair (ft + in). Convert once, then format for display.`,
					msg`Units Converters can move between centimetres, metres, feet, and inches with exact factors. Use the worked example on each pair page when you need a quick sanity check for a common adult height.`,
				],
			},
			{
				heading: msg`Metric height: centimetres vs metres`,
				paragraphs: [
					msg`Most medical and ID systems outside the US store height in centimetres (for example, 175 cm). Metres (1.75 m) are clearer in scientific text but awkward on forms that expect whole centimetres.`,
					msg`When converting from feet and inches to metric, convert the whole height to inches first, then to centimetres, and round once at the end. Rounding each step separately can invent a centimetre you did not measure.`,
					msg`If a form accepts only metres with two decimals, 175 cm becomes 1.75 m. Keep the centimetre value as the authoritative measurement when possible.`,
				],
			},
			{
				heading: msg`Customary height: feet and inches`,
				paragraphs: [
					msg`US forms often want feet and remaining inches (5 ft 9 in), not a decimal foot (5.75 ft). Decimal feet are fine in surveying software but confuse humans on medical questionnaires.`,
					msg`To split a total inch value: divide by 12 for feet, and use the remainder as inches. Label both numbers. Never write “5.9 ft” when you mean 5 ft 9 in—those are different heights.`,
					msg`International inch definitions are standardized today; everyday body-height conversion can treat the international inch as exact. Still, label the unit so software importers do not guess.`,
				],
			},
			{
				heading: msg`Practical checklist`,
				paragraphs: [
					msg`Measure once with a clear method (wall-mounted stadiometer when accuracy matters). Convert to the form’s required unit. Round only for display. Double-check that feet and inches were not swapped.`,
					msg`For athletes and children, re-measure periodically instead of converting an old value forever. Growth and posture change the true length even when the unit system stays the same.`,
					msg`When sharing height internationally, prefer centimetres plus an optional feet-and-inches gloss. Dual labelling prevents silent unit assumptions in email and chat.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many centimetres are in 5 feet 10 inches?`,
				answer: msg`5 ft 10 in is 70 inches total. One international inch is 2.54 cm, so 70 × 2.54 = 177.8 cm. Round according to the form’s rules.`,
			},
			{
				question: msg`Should I enter height in metres or centimetres?`,
				answer: msg`Follow the form. If both are allowed, centimetres as a whole number are usually less error-prone than decimal metres.`,
			},
			{
				question: msg`Why did an online shop reject my height?`,
				answer: msg`Many shops validate ranges in one unit only. Converting with the wrong factor, or mixing ft/in with cm in one field, triggers those checks.`,
			},
		],
	},
	{
		slug: "room-area-flooring",
		title: msg`Room Area for Flooring: Square Metres and Square Feet`,
		description: msg`Convert room area between square metres and square feet, add waste factor the right way, and avoid the classic length×width unit mix-up.`,
		relatedConverters: [
			{ quantity: "Area", from: "Square Metre", to: "Square Foot" },
			{ quantity: "Area", from: "Square Foot", to: "Square Metre" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Area", from: "Square Metre", to: "Hectare" },
		],
		sections: [
			{
				heading: msg`Area is not length`,
				paragraphs: [
					msg`Flooring quotes need area (m² or ft²), not a single length. If you convert room length from metres to feet but forget to convert width the same way before multiplying, the area will be wrong by the length scale factor—not the square of it, and still disastrous for a materials order.`,
					msg`Best practice: measure both sides in one system, multiply to get area in that system, then convert area with an area converter. Do not convert only one side.`,
					msg`Square metres and square feet are related by the square of the metre–foot factor. That is why area conversions feel “larger” than length conversions for the same room.`,
				],
			},
			{
				heading: msg`Waste factor and packaging`,
				paragraphs: [
					msg`Tile, plank, and carpet orders usually add 5–15% waste for cuts and mistakes. Apply the waste percentage after you trust the measured area. Converting units does not replace waste planning.`,
					msg`Packaging is often sold in boxes covering a stated area. Convert your net area (plus waste) into the seller’s unit before dividing by coverage per box. Round up to whole boxes.`,
					msg`Irregular rooms: split into rectangles, compute each area, then sum. Convert the sum once. Piecemeal rounding of each rectangle can leave you short.`,
				],
			},
			{
				heading: msg`Metric vs US product sheets`,
				paragraphs: [
					msg`European product data sheets lean on m²; many North American sheets use ft². Keep a single project sheet with both columns if installers and suppliers disagree.`,
					msg`Underlayment, adhesive, and trim are sometimes sold by length even when flooring is sold by area. Track quantity types separately so you do not treat a linear metre like a square metre.`,
					msg`Our area hub and square-metre ↔ square-foot converter pages include tables for common room sizes so you can sanity-check contractor quotes quickly.`,
				],
			},
			{
				heading: msg`Field tips that save returns`,
				paragraphs: [
					msg`Write the unit on every sketch dimension. A bare “12 × 15” is ambiguous across borders. Prefer “12 ft × 15 ft” or “3.66 m × 4.57 m”.`,
					msg`Recheck closet and hallway areas; they are easy to omit and painful to under-order. Include niches if finish material continues into them.`,
					msg`When a quote jumps after a “unit clarification,” ask for the area in both m² and ft². Transparent dual totals catch silent conversion errors.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How do I convert m² to ft² for a room?`,
				answer: msg`Use an area converter (or multiply by the exact square-metre to square-foot factor). Do not convert metres to feet and forget to square the scale.`,
			},
			{
				question: msg`Should waste factor be added before or after conversion?`,
				answer: msg`Either works if you are consistent. Most people compute area in one unit, add waste, then convert for the supplier’s packaging unit.`,
			},
			{
				question: msg`Why is my flooring quote different from my calculator?`,
				answer: msg`Quotes may include waste, pattern matching, or different rounding. Compare net area in the same unit first, then discuss add-ons.`,
			},
		],
	},
	{
		slug: "oven-temperature-baking",
		title: msg`Oven Temperature for Baking: Celsius and Fahrenheit`,
		description: msg`Convert oven settings between Celsius and Fahrenheit, understand fan-assisted adjustments, and keep recipes reliable across regions.`,
		relatedConverters: [
			{ quantity: "Temperature", from: "Celsius", to: "Fahrenheit" },
			{ quantity: "Temperature", from: "Fahrenheit", to: "Celsius" },
			{ quantity: "Temperature", from: "Celsius", to: "Kelvin" },
			{ quantity: "Volume", from: "Cup", to: "Millimetre" },
		],
		sections: [
			{
				heading: msg`Recipes travel; oven dials do not`,
				paragraphs: [
					msg`A US cookie recipe at 350 °F is not the same sentence as a European recipe at 180 °C—even when those temperatures are the intended conversion pair. Writers round, ovens run hot or cold, and fan modes change heat transfer.`,
					msg`Start with a correct Celsius ↔ Fahrenheit conversion, then adjust for your oven’s behaviour. An oven thermometer is more valuable than a third significant digit on a website.`,
					msg`Temperature conversion is affine (scale plus offset), not a simple multiply. That is why “divide by two” folklore fails. Use a proper converter or the exact formulas.`,
				],
			},
			{
				heading: msg`Fan (convection) vs conventional`,
				paragraphs: [
					msg`Fan-assisted ovens often need a lower set point than conventional recipes assume. Many bakers reduce by about 20 °C (roughly 25–40 °F) when switching to fan—check your oven manual.`,
					msg`Convert the printed recipe temperature first, then apply the fan adjustment. Do not mix the steps or you will double-correct.`,
					msg`Air-fryers and toaster ovens have different thermal mass. Treat their charts as separate; still convert units carefully when a recipe only lists one scale.`,
				],
			},
			{
				heading: msg`Candy, meat, and probe temperatures`,
				paragraphs: [
					msg`Candy stages and meat doneness are often quoted in Fahrenheit in older US books and in Celsius elsewhere. Convert the target probe temperature the same way you convert oven set points—then verify with a calibrated thermometer.`,
					msg`Carryover cooking means food temperature rises after removal. Unit conversion does not change that physics; timing and resting still matter.`,
					msg`Kelvin is rarely printed on consumer recipes but appears in science-of-cooking texts. Knowing that a 1 °C change equals a 1 K change helps when reading those charts.`,
				],
			},
			{
				heading: msg`A simple baking workflow`,
				paragraphs: [
					msg`Identify the recipe’s scale. Convert to your oven’s scale. Adjust for fan if needed. Preheat fully. Confirm with an oven thermometer on the rack you will use.`,
					msg`Write both °C and °F on a sticky note for family recipes you reuse. Dual labels prevent weekend arguments and burnt trays.`,
					msg`When sharing recipes online, include both scales. Your international readers should not have to guess which “gas mark” culture you meant.`,
				],
			},
		],
		faqs: [
			{
				question: msg`What is 350 °F in Celsius?`,
				answer: msg`350 °F converts to about 177 °C, commonly rounded to 180 °C in home recipes. Confirm with your oven and recipe style.`,
			},
			{
				question: msg`Do I convert differently for fan ovens?`,
				answer: msg`Convert the printed temperature first, then apply your oven’s recommended fan reduction. Conversion and fan adjustment are separate steps.`,
			},
			{
				question: msg`Why did my cake still burn after converting correctly?`,
				answer: msg`Ovens vary. Rack position, pan colour, and calibration errors matter as much as the unit label. Use an oven thermometer.`,
			},
		],
	},
	{
		slug: "travel-distance-km-miles",
		title: msg`Travel Distance: Kilometres and Miles`,
		description: msg`Convert road and trail distances between kilometres and miles, read maps from different countries, and pace trips without unit confusion.`,
		relatedConverters: [
			{ quantity: "Length", from: "Kilometre", to: "Mile (International)" },
			{ quantity: "Length", from: "Mile (International)", to: "Kilometre" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Length", from: "Meter", to: "Kilometre" },
		],
		sections: [
			{
				heading: msg`Road signs disagree by country`,
				paragraphs: [
					msg`Most of the world posts highway distances in kilometres. The United States (and a few other contexts) still lean on miles. Navigation apps usually localize, but printed guides, race bibs, and rental-car dashboards may not match your instincts.`,
					msg`One international mile is exactly 1.609344 kilometres. For trip planning, that exact factor is enough; you rarely need more precision than a tenth of a kilometre or mile.`,
					msg`Confusing km/h with mph is a safety issue, not just a math issue. When you convert distance, also check whether speed limits were converted.`,
				],
			},
			{
				heading: msg`Hiking and running events`,
				paragraphs: [
					msg`Trail races may advertise a “10K” (kilometres) while US training plans talk in miles. Convert the race distance once and rebuild paces in your preferred unit.`,
					msg`Elevation gain is a length too—often in metres or feet. Convert gain separately from horizontal distance; they are different columns in a plan.`,
					msg`GPX tools sometimes default to metres internally. Export settings can silently switch display units; verify the summary totals before sharing a route.`,
				],
			},
			{
				heading: msg`Fuel economy adjacent confusion`,
				paragraphs: [
					msg`Distance units show up inside fuel economy (L/100 km vs mpg). Converting trip length alone does not convert economy figures—those need their own formulas.`,
					msg`When renting a car abroad, note whether the trip computer shows km or miles. Resetting averages mid-trip with the wrong mental unit produces nonsense cost estimates.`,
					msg`Our kilometre ↔ mile converter pages include tables for common road distances so you can translate itinerary notes quickly.`,
				],
			},
			{
				heading: msg`Planning checklist`,
				paragraphs: [
					msg`Pick one planning unit for the trip. Convert all legs into that unit. Add buffer for detours. Only then convert a summary into the local road-sign unit if needed.`,
					msg`For mixed groups, publish both km and miles on shared itineraries. Dual totals prevent “how much farther?” arguments in the car.`,
					msg`Keep nautical miles separate for marine and aviation contexts—they are not the same as statute miles.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many kilometres are in a mile?`,
				answer: msg`One international mile equals exactly 1.609344 kilometres. For rough estimates, 8 km ≈ 5 miles.`,
			},
			{
				question: msg`Is a 5K race five kilometres or five miles?`,
				answer: msg`A 5K is five kilometres (about 3.1 miles). Always read the K as kilometres in race names.`,
			},
			{
				question: msg`Should I convert speed limits the same way?`,
				answer: msg`Yes—distance and speed share the same length unit in km/h vs mph. Convert carefully; small mistakes matter at highway speeds.`,
			},
		],
	},
	{
		slug: "pool-volume-chemicals",
		title: msg`Pool Volume for Chemicals: Litres and Cubic Metres`,
		description: msg`Estimate swimming-pool volume in litres or cubic metres, convert between units, and dose chemicals from labels that disagree on volume units.`,
		relatedConverters: [
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
			{ quantity: "Volume", from: "Cubic Metre", to: "Litre" },
			{ quantity: "Volume", from: "Cubic Foot", to: "Litre" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
		],
		sections: [
			{
				heading: msg`Dose depends on volume`,
				paragraphs: [
					msg`Pool chemical labels assume you know the water volume. If your notes say gallons but the label says litres—or your builder quoted cubic metres—you must convert before multiplying dose per volume.`,
					msg`One cubic metre equals 1,000 litres. That SI relationship is exact and is the cleanest bridge for metric pool math.`,
					msg`Shape matters: rectangular, circular, and freeform pools need different geometric estimates. Convert units after you trust the geometric volume, not before.`,
				],
			},
			{
				heading: msg`Measuring a simple rectangular pool`,
				paragraphs: [
					msg`For a rectangle: length × width × average depth. Keep all three lengths in the same unit, compute cubic length (m³ or ft³), then convert to litres if your chemical chart needs litres.`,
					msg`Average depth for a sloping floor is often (shallow + deep) / 2. Confirm with the builder’s as-built drawings when available—guessing depth is the usual error source.`,
					msg`US customary pool calculators may output gallons. Convert gallons to litres only with a volume converter; do not treat gallons like litres.`,
				],
			},
			{
				heading: msg`Chemical charts and safety`,
				paragraphs: [
					msg`Always follow the product label and local regulations. Online converters help with units; they do not replace water testing or professional advice for commercial pools.`,
					msg`When a chart lists dose per 10,000 litres, convert your pool volume to litres, divide by 10,000, then multiply by the listed dose. Write the unit beside every intermediate number.`,
					msg`Shock, chlorine, and acid products can use different chart conventions. Convert volume once into a “home unit” you reuse for every product.`,
				],
			},
			{
				heading: msg`Keep a pool data card`,
				paragraphs: [
					msg`Record volume in litres and in cubic metres (and gallons if your local suppliers use them). Update the card if you change water level significantly or remodel.`,
					msg`Share the data card with anyone who helps maintain the pool. Dual units prevent weekend overdosing when a guest reads a foreign label.`,
					msg`Our litre ↔ cubic metre pages include reference tables that make a quick sanity check easy before you open a chemical jug.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many litres are in a cubic metre?`,
				answer: msg`Exactly 1,000 litres. Cubic metres and litres are linked by a power of ten in everyday metric volume.`,
			},
			{
				question: msg`Can I convert pool volume from length units alone?`,
				answer: msg`You need three length measurements (or an equivalent geometry) to get volume, then convert that volume to the chemical chart’s unit.`,
			},
			{
				question: msg`Why do my chemical doses seem too strong?`,
				answer: msg`Often the volume was underestimated, or gallons were treated as litres. Recalculate volume, convert units carefully, and retest the water.`,
			},
		],
	},
	{
		slug: "kilograms-vs-pounds-everyday",
		title: msg`Kilograms vs Pounds in Everyday Life`,
		description: msg`Convert body weight, luggage, and grocery labels between kilograms and pounds with exact factors, mental shortcuts, and habits that prevent airport and gym mistakes.`,
		relatedConverters: [
			{ quantity: "Weight", from: "Kilogram", to: "Pound (Avoirdupois)" },
			{ quantity: "Weight", from: "Pound (Avoirdupois)", to: "Kilogram" },
			{ quantity: "Weight", from: "Gram", to: "Ounce (Avoirdupois)" },
			{ quantity: "Weight", from: "Kilogram", to: "Stone" },
		],
		sections: [
			{
				heading: msg`Same mass, different everyday labels`,
				paragraphs: [
					msg`Kilograms and pounds both describe mass (weight under ordinary gravity). A suitcase that tips a scale at 23 kg is the same object whether a US tag says about 50.7 lb. The physics does not change; the number and the unit do. Confusion starts when people treat the numbers as interchangeable, round too early, or mix stone, pounds, and kilograms on one form.`,
					msg`One international avoirdupois pound equals exactly 0.45359237 kg by definition. That means 1 kg is about 2.2046226218 lb. For luggage and gym work, two or three decimal places on the conversion factor are enough; for legal trade and shipping manifests, use the exact factor and round only at the end.`,
					msg`Countries that use metric post body weight and baggage limits in kilograms. US gyms, some airlines’ US-facing pages, and older medical charts still speak in pounds. If you travel, train, or shop across those systems, convert once into a single “home unit,” then keep every note in that unit until you must publish the other.`,
				],
			},
			{
				heading: msg`Luggage and airline limits`,
				paragraphs: [
					msg`Many international economy limits sit at 23 kg (often marketed as 50 lb). That marketing round is slightly generous: 23 × 2.2046226218 ≈ 50.71 lb. If your home scale only shows pounds, do not pack to a flat 50 lb and assume you are safe—you may already be over. Convert the airline’s kilogram limit into pounds with a proper converter, then leave a buffer for scale disagreement between home and the check-in desk.`,
					msg`Carry-on limits are often lower and sometimes stated only in kilograms. Soft bags compress; hard cases do not. Weigh the packed bag, not the empty shell plus a guess. If you own a scale in pounds only, convert the limit first, write both numbers on a sticky note in the bag, and re-check after last-minute additions (duty-free bottles are a classic overage).`,
					msg`Freight and courier services may use kilograms worldwide even when the shipper thinks in pounds. Dimensional weight is a separate rule (volume-based billing). Convert actual scale weight correctly first; then apply the carrier’s dimensional-weight formula in the unit the carrier specifies.`,
				],
			},
			{
				heading: msg`Body weight, gym plates, and health forms`,
				paragraphs: [
					msg`Clinic forms may ask for kilograms while your bathroom scale shows pounds, or the reverse. Convert the reading you actually measured; do not “feel” a number in the other unit. A 2–3 lb morning fluctuation is normal; a unit mix-up of 2.2× is a medical-record disaster.`,
					msg`Gym plates in metric gyms are often 1.25, 2.5, 5, 10, 15, and 20 kg. US customary gyms use 2.5, 5, 10, 25, 35, and 45 lb plates. A “20 kg plate” is about 44.1 lb—not a 45 lb plate. When following a program written in the other system, convert working weights, then choose the nearest plate combination and log what you actually lifted.`,
					msg`Stone appears in UK everyday speech (for example, 11 st 4 lb). If a form wants kilograms, convert the full stone-and-pounds value to pounds first, then to kilograms—or use a stone↔kilogram converter and add the leftover pounds carefully. Never paste “11.4” into a kilogram field when you meant 11 stone 4 pounds.`,
				],
			},
			{
				heading: msg`Groceries, parcels, and kitchen intuition`,
				paragraphs: [
					msg`Packaged food in metric markets lists net weight in grams or kilograms; US labels use ounces and pounds. A 500 g block of cheese is about 1.10 lb; a 1 lb package is about 454 g. For recipes, prefer grams on a digital scale—volume cups vary by packing, but mass does not.`,
					msg`Parcel shops and post offices price by weight tiers. Crossing a tier by 50 g because you mixed oz and g is an expensive lesson. Keep the shipping label’s unit visible while you pack: if the rate card is in kilograms, convert ounces to grams or kilograms before you seal the box.`,
					msg`Mental anchors help day to day: 1 kg ≈ 2.2 lb; 5 kg ≈ 11 lb; 10 kg ≈ 22 lb; 20 kg ≈ 44 lb; 100 g ≈ 3.5 oz. Use anchors for sanity checks, then confirm important values with an exact conversion.`,
				],
			},
			{
				heading: msg`A reliable conversion workflow`,
				paragraphs: [
					msg`Decide the authoritative measurement (what the scale showed) and its unit. Convert to the destination unit with an exact factor. Round once for display according to the context—whole pounds for casual speech, one decimal for luggage, more for lab work.`,
					msg`When two people share numbers (coach and athlete, shipper and warehouse), agree on one unit for the shared log. Publish a dual label only at the interface (airport sign, product page), not inside every intermediate calculation.`,
					msg`Our kilogram ↔ pound converter pages include common luggage and body-weight tables so you can sanity-check a result in seconds before you argue with a check-in agent or a spreadsheet.`,
				],
			},
			{
				heading: msg`Common mistakes to avoid`,
				paragraphs: [
					msg`Using 2.2 as if it were exact for legal or shipping work. It is a handy approximation, not the definition. Multiplying by 2.2 and also adding a “safety pound” without knowing which scale unit you started from compounds error.`,
					msg`Confusing mass with force in technical settings (lbf vs lb mass). Everyday baggage and body weight ignore that distinction; engineering specs may not. Read the symbol on the datasheet.`,
					msg`Mixing troy ounces (precious metals) with avoirdupois ounces (food and freight). This site’s everyday ounce unit is avoirdupois. Gold and silver use a different ounce—do not convert jewellery the same way you convert flour.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many pounds are in one kilogram?`,
				answer: msg`One kilogram equals about 2.2046226218 avoirdupois pounds. For quick estimates, use 2.2 lb per kg, then refine with an exact converter when limits are tight.`,
			},
			{
				question: msg`Is 23 kg the same as 50 lb for airline bags?`,
				answer: msg`Airlines often market 23 kg as “50 lb,” but 23 kg is about 50.71 lb. Pack below the kilogram limit after converting with an exact factor, and leave a buffer for scale differences.`,
			},
			{
				question: msg`Should I convert stone or pounds for a metric form?`,
				answer: msg`Convert the full value you know. If you know stone and pounds, combine them (or convert via kilograms) so leftover pounds are not dropped. Forms that want kg should receive a single kilogram number.`,
			},
		],
	},
	{
		slug: "shipping-weight-vs-volume-weight",
		title: msg`Shipping Weight vs Volume Weight`,
		description: msg`Learn how carriers bill the higher of actual weight and dimensional (volume) weight, convert kilograms and pounds correctly, and measure boxes so quotes match invoices.`,
		relatedConverters: [
			{ quantity: "Weight", from: "Kilogram", to: "Pound (Avoirdupois)" },
			{ quantity: "Weight", from: "Pound (Avoirdupois)", to: "Kilogram" },
			{ quantity: "Weight", from: "Tonne (Metric)", to: "Kilogram" },
			{ quantity: "Volume", from: "Cubic Metre", to: "Litre" },
		],
		sections: [
			{
				heading: msg`Two numbers decide the invoice`,
				paragraphs: [
					msg`Carriers care about two constraints: how heavy a parcel is, and how much space it occupies on a truck or aircraft. Actual (scale) weight is what a calibrated scale reads in kilograms or pounds. Dimensional weight—also called volumetric weight—is a billing weight computed from the package’s outer dimensions using the carrier’s divisor formula.`,
					msg`You almost always pay on the greater of actual weight and dimensional weight. A box of pillows can be light on the scale and expensive on the invoice because volume weight wins. A small dense part can be heavy and tiny—actual weight wins. Unit conversion mistakes on either side change which number wins.`,
					msg`Before you convert anything, write down three facts: outer length, width, and height (with units), scale weight (with units), and the carrier’s dimensional divisor and rounding rules from the rate card you are using today—not a blog post from five years ago.`,
				],
			},
			{
				heading: msg`Measuring the box before you convert`,
				paragraphs: [
					msg`Use outer dimensions, including bulges and protruding handles. Soft packs are measured as the rectangular envelope they occupy. Convert all three sides into one length unit before multiplying. Mixing centimetres and inches in the same product is a classic quote killer.`,
					msg`Volume for shipping math is usually the rectangular product L × W × H, not the true geometric volume of an irregular shape. Carriers bill the rectangular cuboid. Convert that cuboid into the unit the divisor expects (often cm³ or in³), then apply the formula.`,
					msg`If your warehouse stores dimensions in millimetres and the carrier wants centimetres, divide each side by 10 before multiplying—or convert after computing mm³ into cm³ carefully. Keep a single spreadsheet column unit and validate with a known sample box.`,
				],
			},
			{
				heading: msg`Actual weight: kilograms and pounds`,
				paragraphs: [
					msg`International carriers usually quote chargeable weight in kilograms. US domestic services often speak in pounds. Convert scale readings with the exact pound–kilogram relationship before comparing to dimensional weight. Comparing 10 lb to a dimensional weight of 5 kg without converting is meaningless.`,
					msg`Tare the scale (subtract pallet or container weight) when the rate applies to net shipment weight. For multi-piece shipments, know whether the carrier sums chargeable weights per piece or allows shipment-level aggregation—those rules change optimization tactics.`,
					msg`Metric tonnes appear on freight, not parcels. One metric tonne is 1,000 kg (about 2,204.62 lb). Do not confuse it with a US ton (short ton) or UK long ton when reading ocean quotes.`,
				],
			},
			{
				heading: msg`Dimensional weight formulas in practice`,
				paragraphs: [
					msg`A typical pattern is: dimensional weight = (L × W × H) / divisor, with L, W, H in centimetres or inches and the result in kilograms or pounds matching the divisor’s definition. Divisors differ by air vs ground and by carrier. Always use the divisor printed for your service level.`,
					msg`Rounding rules matter as much as the divisor. Some carriers round each dimension up to the next centimetre; others round the final chargeable weight up to the next half kilogram. Convert units first, then apply rounding in the order the tariff states.`,
					msg`Volumetric litres and cubic metres help warehouse planning (1 m³ = 1,000 L) but do not replace the carrier’s dimensional-weight formula. Use volume converters for storage and cube utilization; use the tariff formula for billing weight.`,
				],
			},
			{
				heading: msg`Packaging choices that change chargeable weight`,
				paragraphs: [
					msg`Right-sizing the carton often saves more money than negotiating a tiny rate discount. Empty space increases dimensional weight. Lightweight void fill can still lose if the box stays huge. Dense goods in a snug carton usually bill near actual weight.`,
					msg`When you redesign packaging, re-measure and re-convert. A 2 cm reduction on one side changes volume by a percent equal to that side’s relative change—worth calculating before you order 10,000 cartons.`,
					msg`For exports, customs may care about net and gross mass in kilograms even when your commercial invoice was drafted in pounds. Keep both actual mass and package cube documented so logistics and compliance teams share one truth.`,
				],
			},
			{
				heading: msg`Checklist before you buy a label`,
				paragraphs: [
					msg`Measure outer L, W, H in one unit. Weigh on a trusted scale. Convert weight into the carrier’s billing unit. Compute dimensional weight with the correct divisor. Take the maximum. Add any oversize fees that ignore weight entirely.`,
					msg`Sanity-check with a dual display: show chargeable kilograms and pounds on the packing slip. Dual labels catch unit bugs when US and EU sites share one catalogue.`,
					msg`Use our kilogram ↔ pound tools for the mass side and cubic metre ↔ litre tools when you reason about cube. Then apply the carrier formula—converters handle units; tariffs handle money.`,
				],
			},
		],
		faqs: [
			{
				question: msg`What is dimensional weight?`,
				answer: msg`Dimensional (volumetric) weight is a billing weight derived from package dimensions using a carrier divisor. You typically pay on the higher of actual scale weight and dimensional weight.`,
			},
			{
				question: msg`Should I convert to kilograms or pounds first?`,
				answer: msg`Convert into the unit the carrier’s rate card uses for chargeable weight, then compare actual and dimensional weight in that same unit.`,
			},
			{
				question: msg`Does cubic metres equal shipping weight?`,
				answer: msg`No. Cubic metres measure volume. Shipping cost uses actual mass and a dimensional-weight formula. Volume helps you compute dimensional weight but is not the invoice by itself.`,
			},
		],
	},
	{
		slug: "mph-to-kmh-road-trips",
		title: msg`mph to km/h for Road Trips`,
		description: msg`Convert miles per hour and kilometres per hour for foreign road signs, rental cars, and trip planning—plus the distance and time links that keep ETA math honest.`,
		relatedConverters: [
			{ quantity: "Speed", from: "Mile per hour", to: "Kilometre per hour" },
			{ quantity: "Speed", from: "Kilometre per hour", to: "Mile per hour" },
			{ quantity: "Speed", from: "Metre per second", to: "Kilometre per hour" },
			{ quantity: "Length", from: "Mile (International)", to: "Kilometre" },
		],
		sections: [
			{
				heading: msg`Speed limits are unit limits`,
				paragraphs: [
					msg`A number on a white sign means nothing until you know whether it is mph or km/h. Driving 100 in a 100 km/h zone is not the same as driving 100 in a 100 mph zone—the second case is roughly 161 km/h. Tourists who “just match the number” cause genuine danger.`,
					msg`Exact relationship: 1 mph = 1.609344 km/h because the international mile is exactly 1.609344 km and the hour is the same in both units. Conversely, 1 km/h ≈ 0.621371192 mph. For dashboard glances, many drivers remember “multiply mph by 1.6” or “multiply km/h by 0.62,” then refine when planning.`,
					msg`Rental cars may display the other unit, or both. Learn how to switch the cluster before you leave the airport road. Navigation apps usually localize speed limits, but a paper map or temporary work-zone sign might not match your mental default.`,
				],
			},
			{
				heading: msg`Planning ETA when distance units also flip`,
				paragraphs: [
					msg`Trip time is distance divided by average speed—only when both use consistent length units. Mixing a 120 km leg with a 60 mph average without converting yields nonsense. Convert either all distances to miles and speeds to mph, or all to kilometres and km/h.`,
					msg`Average speed on a road trip is far below the posted limit. Use a realistic average (including fuel stops) in one unit system. Convert the posted limit separately when you want to know “how fast am I allowed to go,” not “how fast will I average.”`,
					msg`Our mile ↔ kilometre guides cover distance; this guide focuses on the speed pair. You will often need both pages open when building an itinerary across borders.`,
				],
			},
			{
				heading: msg`Common highway anchors`,
				paragraphs: [
					msg`Useful pairs to memorize for signs: 30 mph ≈ 48 km/h (urban); 50 mph ≈ 80 km/h; 60 mph ≈ 97 km/h; 70 mph ≈ 113 km/h; 80 mph ≈ 129 km/h. In the other direction: 50 km/h ≈ 31 mph; 80 km/h ≈ 50 mph; 100 km/h ≈ 62 mph; 120 km/h ≈ 75 mph; 130 km/h ≈ 81 mph.`,
					msg`School zones and temporary limits are where unit mistakes hurt most because the absolute speeds are lower but enforcement and child safety margins are tight. Convert the posted number before you “nudge a little over.”`,
					msg`Adaptive cruise control and speed-limit assist features depend on map data units. If the car was configured for another market, verify the shown limit against roadside signs once, especially after firmware or language changes.`,
				],
			},
			{
				heading: msg`mph, km/h, and metres per second`,
				paragraphs: [
					msg`Science and some vehicle test reports use metres per second. 1 m/s = 3.6 km/h exactly. That bridge is handy: convert m/s → km/h by multiplying by 3.6, then to mph if needed. Crash-test and physics problems almost never want mph as an intermediate.`,
					msg`Dashcams and OBD apps may log SI units internally and display your preference. When exporting a CSV for insurance or coaching, note the unit column. A silent m/s vs km/h swap makes you look ten times too slow or too fast.`,
					msg`Foot per second appears in some US engineering contexts. For road trips you rarely need it; stick to mph and km/h unless a technical report forces the issue.`,
				],
			},
			{
				heading: msg`Weather, tires, and “feels like” speed`,
				paragraphs: [
					msg`Unit conversion does not change stopping distance physics, but mixed mental models do. If you are used to thinking “60 mph needs X metres to stop,” rebuild that intuition in km/h before mountain descents abroad.`,
					msg`Tire speed ratings and placards may list km/h even on US cars. Convert before comparing to your planned cruise speed in mph. The rating is a limit, not a suggestion to drive that fast.`,
					msg`Keep a single sticky note on the dash for the first day abroad: “limits are km/h” or “limits are mph,” plus two anchor conversions you actually saw on the route.`,
				],
			},
			{
				heading: msg`Workflow for a border-crossing day`,
				paragraphs: [
					msg`Set the instrument cluster and phone navigation to the local unit. Convert any handwritten pace notes from home. Recalculate ETA with distance and average speed in one system. Recheck the first three posted limits against your display.`,
					msg`When sharing driving shifts with someone from another country, call out both units for the first hour (“90 km/h, about 56 mph”). Shared speech prevents one driver from “correcting” the other into a ticket.`,
					msg`Use the mile-per-hour ↔ kilometre-per-hour converter for exact values when a work zone lists an unusual number. Anchors are for glance checks; exact math is for planning and disputes.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How do I convert mph to km/h quickly?`,
				answer: msg`Multiply mph by 1.609344 for an exact value. For a mental estimate, multiply by 1.6. Example: 70 mph ≈ 112.7 km/h.`,
			},
			{
				question: msg`Is 100 on the sign mph or km/h?`,
				answer: msg`It depends on the country. In most of the world, highway “100” means 100 km/h (about 62 mph). In the United States, “100” would be mph if used—always read local unit conventions.`,
			},
			{
				question: msg`How is m/s related to km/h?`,
				answer: msg`Multiply metres per second by 3.6 to get kilometres per hour. Divide km/h by 3.6 to get m/s.`,
			},
		],
	},
	{
		slug: "knots-explained-boats-planes",
		title: msg`Knots Explained for Boats and Planes`,
		description: msg`Understand the knot as a speed unit tied to the nautical mile, convert knots to km/h and mph, and avoid mixing statute miles with nautical miles in navigation.`,
		relatedConverters: [
			{ quantity: "Speed", from: "Knot", to: "Kilometre per hour" },
			{ quantity: "Speed", from: "Knot", to: "Mile per hour" },
			{ quantity: "Speed", from: "Kilometre per hour", to: "Knot" },
			{
				quantity: "Length",
				from: "Nautical Mile (International)",
				to: "Kilometre",
			},
		],
		sections: [
			{
				heading: msg`A knot is a nautical mile per hour`,
				paragraphs: [
					msg`One knot means one nautical mile per hour. The international nautical mile is exactly 1,852 metres, so 1 knot = 1.852 km/h exactly. In statute (land) miles, 1 knot ≈ 1.15078 mph. Mariners and aviators use knots so speed and chart distance share the same mile definition.`,
					msg`If you convert boat speed into km/h but leave chart legs in nautical miles—or worse, statute miles—your ETA will be wrong. Keep the chain consistent: nautical miles with knots, kilometres with km/h, statute miles with mph.`,
					msg`Historical note: the name comes from counting knots in a line paid out over a sandglass interval. Modern instruments use sensors and GNSS; the unit definition is now fixed by the international nautical mile.`,
				],
			},
			{
				heading: msg`Boating: SOG, STW, and wind`,
				paragraphs: [
					msg`Speed through water (STW) and speed over ground (SOG) can differ because of current. Instruments may show knots for both. When you convert to km/h for a guest display, label which speed you converted—current-adjusted SOG is what gets you to the marina on time.`,
					msg`Wind reports in marine forecasts often use knots. A “20-knot wind” is about 37 km/h or 23 mph. Small-craft advice thresholds are written in knots in many countries; convert only after you understand the category boundaries.`,
					msg`Tide atlases and racing handicaps assume nautical miles and knots. Converting a race course to statute miles without converting the rating math breaks comparisons between seasons and fleets.`,
				],
			},
			{
				heading: msg`Aviation: airspeed in knots`,
				paragraphs: [
					msg`Pilots quote indicated, calibrated, true, and ground speed—often in knots. Those types already differ by instrument and atmosphere effects; unit conversion is a separate step. Convert only when talking to audiences that expect km/h or mph, and name which airspeed type you mean.`,
					msg`Jet streams and ATIS winds are typically in knots. Airport visibility and runway lengths may use metres or feet—different quantities. Do not treat a wind of 15 kt like 15 km/h; that underestimates wind by nearly half.`,
					msg`Flight-planning tools can switch display units. Before a cross-country lesson or sim session, verify the unit field. A silent switch from knots to mph changes every performance number you memorized.`,
				],
			},
			{
				heading: msg`Converting knots cleanly`,
				paragraphs: [
					msg`To km/h: multiply knots by 1.852. To mph: multiply knots by 1.150779448 (approximately). Reverse: divide km/h by 1.852 to get knots. Use a converter when filing plans or writing procedures; use 1.85 as a glance factor only for casual talk.`,
					msg`Related length conversion: 1 international nautical mile = 1.852 km ≈ 1.15078 statute miles. If you convert speed but not distance—or the reverse—you invent a fake average speed.`,
					msg`Metres per second sometimes appear in research or metric-only instrument logs: 1 kn = 1.852 km/h = 0.514444… m/s. Prefer knots in operational marine/aviation communication unless a local procedure says otherwise.`,
				],
			},
			{
				heading: msg`Common mix-ups with land units`,
				paragraphs: [
					msg`Car drivers often think in mph or km/h and underestimate boat/aircraft speeds quoted in knots because the numbers look “smaller.” Fifteen knots is not a jogging pace—it is about 28 km/h over ground if SOG matches.`,
					msg`News articles sometimes convert knots to mph incorrectly by using 1.6 (the statute mile factor) instead of about 1.15. When accuracy matters, re-convert from the original knot value.`,
					msg`GPS apps on phones may default to mph based on locale even on a boat. Switch the app to knots or nautical miles when navigating on water so the display matches charts.`,
				],
			},
			{
				heading: msg`Practical checklist`,
				paragraphs: [
					msg`Identify whether the source value is knots. Convert with 1.852 to km/h when talking to metric land audiences. Keep internal logs in knots if your charts are nautical. Dual-label passenger briefings (“8 knots, about 15 km/h”) when helpful.`,
					msg`For passage planning: distance in nautical miles ÷ speed in knots = hours. That simple formula is why the unit exists. Change either unit without the other and the formula collapses.`,
					msg`Use our knot ↔ km/h and knot ↔ mph pages for exact tables, and the nautical mile ↔ kilometre page when converting chart distances for mixed crews.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many km/h is one knot?`,
				answer: msg`Exactly 1.852 km/h, because the international nautical mile is exactly 1,852 metres and a knot is one nautical mile per hour.`,
			},
			{
				question: msg`Is a knot the same as a mph?`,
				answer: msg`No. One knot is about 1.15 statute miles per hour. Knots pair with nautical miles; mph pairs with statute (land) miles.`,
			},
			{
				question: msg`Why do pilots and sailors prefer knots?`,
				answer: msg`Charts and distances are often in nautical miles. Using knots keeps speed and distance in the same mile definition, so time = distance ÷ speed stays simple.`,
			},
		],
	},
	{
		slug: "seconds-minutes-hours-precision",
		title: msg`Seconds, Minutes, and Hours: Precision That Matters`,
		description: msg`Convert seconds, minutes, hours, and days without off-by-sixty errors, choose appropriate precision for sports and science, and keep timestamps consistent.`,
		relatedConverters: [
			{ quantity: "Time", from: "Second", to: "Minute" },
			{ quantity: "Time", from: "Minute", to: "Hour" },
			{ quantity: "Time", from: "Hour", to: "Day" },
			{ quantity: "Time", from: "Second", to: "Hour" },
		],
		sections: [
			{
				heading: msg`Time units nest by sixty—and then by twenty-four`,
				paragraphs: [
					msg`Exactly 60 seconds make a minute; 60 minutes make an hour; 24 hours make a day in ordinary civil usage. Those ratios are exact for conversion between these units. Mistakes come from treating decimal hours like sexagesimal minutes—writing 1.30 h when you mean 1 h 30 min (which is 1.5 h).`,
					msg`Digital tools often store seconds (or milliseconds) as the base and format displays as hh:mm:ss. When you convert, prefer going through seconds for multi-step work: hours → seconds → minutes, rather than chaining rounded intermediate displays.`,
					msg`A week is exactly 7 days in these converters. Months and calendar years are not fixed-length in the same way—use dedicated month/year units when that is what you mean, not 30 × day guesses baked into hour math.`,
				],
			},
			{
				heading: msg`Decimal hours vs hours and minutes`,
				paragraphs: [
					msg`Payroll and aviation sometimes use decimal hours (1.5 h). Sports and media use 1:30. To convert decimal hours to minutes, multiply the fractional part by 60. To convert hh:mm to decimal hours, divide minutes by 60. Never read the minutes field as a decimal fraction.`,
					msg`Spreadsheets aggravate this: formatting a cell as time versus number changes what “1.5” means. When exchanging files, store an explicit unit column (“hours decimal” or “seconds”) instead of relying on cell format alone.`,
					msg`For durations over 24 hours, decide whether to display total hours (36 h) or days plus hours (1 d 12 h). Converting total seconds into either presentation is fine—just label the result so readers know which form you chose.`,
				],
			},
			{
				heading: msg`Precision in sport and lab timing`,
				paragraphs: [
					msg`Track races may publish times to 0.01 s while road races use whole seconds. Converting a 3:45 marathon split into decimal minutes for pace math is useful; inventing hundredths the watch never measured is not. Preserve the precision you actually recorded.`,
					msg`Scientific experiments often need milliseconds or microseconds. Convert 0.0025 s to milliseconds (2.5 ms) carefully: multiply seconds by 1,000 for milliseconds, by 1,000,000 for microseconds. Off-by-thousand errors are common when SI prefixes and sexagesimal time mix.`,
					msg`Metronomes, frame rates, and sample rates link time to counts (beats per minute, frames per second). Convert the time unit first, then compute rates. Swapping BPM math with raw seconds without conversion produces unusable tempos.`,
				],
			},
			{
				heading: msg`Elapsed duration is not a clock time`,
				paragraphs: [
					msg`“2 hours 15 minutes” is a duration. “14:15” is a clock reading. Converters that change seconds into hours answer duration questions. Time-zone shifts and DST change clock labels without changing how long a process took.`,
					msg`If a log says a job finished at 01:10 after starting at 23:50, the duration is 80 minutes (or 1 h 20 min), including the midnight crossing. Convert that duration with time units; do not subtract the clock faces as decimal numbers without handling day rollover.`,
					msg`ISO-8601 durations (PT1H30M) encode units explicitly. When APIs return raw seconds, document that contract. Silent disagreement between “seconds since start” and “minutes since start” is a frequent integration bug.`,
				],
			},
			{
				heading: msg`Worked conversion patterns`,
				paragraphs: [
					msg`Minutes to seconds: multiply by 60. Hours to seconds: multiply by 3,600. Days to hours: multiply by 24. Reverse with division. For mixed inputs like 2 h 15 min 40 s, convert each part to seconds, add, then convert to the target unit once.`,
					msg`Pace and speed link time to length (min/km, km/h). Convert the time portion with time units, convert the length portion with length units, then recombine. Changing only one side breaks the rate.`,
					msg`Use our second ↔ minute ↔ hour tools for clean steps, and keep a notepad line with units on every intermediate value when the calculation feeds payroll, dosing intervals, or race results.`,
				],
			},
			{
				heading: msg`Rounding and reporting`,
				paragraphs: [
					msg`Round durations in the unit you publish. If you report minutes, compute from exact seconds first, then round minutes. Rounding each unit field separately can create impossible times like 2 h 60 min.`,
					msg`For public schedules, whole minutes are usually enough. For lab notebooks, keep enough digits to match instrument resolution. Matching precision to purpose beats always showing six decimals.`,
					msg`When in doubt, store seconds as integers (or milliseconds as integers) and format for humans at the edge. Integer bases avoid decimal-hour ambiguity entirely.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many seconds are in an hour?`,
				answer: msg`Exactly 3,600 seconds: 60 seconds per minute times 60 minutes per hour.`,
			},
			{
				question: msg`Is 1.30 hours the same as 1 hour 30 minutes?`,
				answer: msg`No. 1.30 hours means 1 hour + 0.30 × 60 = 18 minutes. 1 hour 30 minutes is 1.5 hours. Do not read mm as a decimal fraction.`,
			},
			{
				question: msg`Should I convert days using 24 hours?`,
				answer: msg`For ordinary duration conversions between day, hour, minute, and second as defined here, yes—1 day = 24 hours. Calendar date arithmetic and leap seconds are separate problems.`,
			},
		],
	},
	{
		slug: "julian-year-vs-calendar-year",
		title: msg`Julian Year vs Calendar Year`,
		description: msg`Learn why astronomy uses a Julian year of 365.25 days, how that differs from Gregorian calendar years, and when to convert days and years with each definition.`,
		relatedConverters: [
			{ quantity: "Time", from: "Year (Julian)", to: "Day" },
			{ quantity: "Time", from: "Day", to: "Year (Julian)" },
			{ quantity: "Time", from: "Year (Julian)", to: "Hour" },
			{ quantity: "Time", from: "Week", to: "Day" },
		],
		sections: [
			{
				heading: msg`Two meanings of “year”`,
				paragraphs: [
					msg`In everyday speech, a year is what calendars do: birthdays, fiscal periods, and school terms follow Gregorian rules with leap days. In astronomy and many scientific constants, a Julian year is a fixed duration of exactly 365.25 days, each day 86,400 seconds—exactly 31,557,600 seconds.`,
					msg`The Julian year is a unit of time duration, not a calendar system. Saying “4 Julian years” means a specific span of seconds. Saying “the year 2026” names a civil date range. Mixing those meanings breaks orbital periods, age estimates, and light-travel explanations.`,
					msg`The light-year as a length unit is defined using the Julian year: distance light travels in vacuum in one Julian year. That is why astronomy documentation is careful about which year it means.`,
				],
			},
			{
				heading: msg`Gregorian mean year vs Julian year`,
				paragraphs: [
					msg`The Gregorian calendar’s mean year is 365.2425 days (97 leap days per 400 years). That is about 0.0075 days (roughly 11 minutes) shorter than 365.25. Over one year the difference is tiny for casual talk; over millennia or precise ephemerides it accumulates.`,
					msg`For civil history—“how many calendar years between these two dates?”—use calendar arithmetic or a mean Gregorian year if you only need an approximation. For converting a physics duration labeled as Julian years, divide or multiply with 365.25 days per Julian year.`,
					msg`Julian calendar dates (the historical calendar Julius Caesar introduced) are yet another topic. “Julian year” as a 365.25-day unit should not be confused with Julian calendar day numbering or Julian Day Count (JD), though the shared adjective confuses newcomers.`,
				],
			},
			{
				heading: msg`Converting Julian years to days and hours`,
				paragraphs: [
					msg`1 Julian year = 365.25 days = 8,766 hours = 525,960 minutes = 31,557,600 seconds. Those relationships are exact under the definition used here. Converters that implement Year (Julian) should match these figures.`,
					msg`Example: 2.5 Julian years = 2.5 × 365.25 = 913.125 days. Example: 10,000 days ÷ 365.25 ≈ 27.378 Julian years. Keep enough decimals when the result feeds another scientific formula.`,
					msg`Weeks remain 7 days. Converting weeks to Julian years is just weeks → days → Julian years. There is no special “Julian week.”`,
				],
			},
			{
				heading: msg`When scientists choose Julian years`,
				paragraphs: [
					msg`Orbital periods, pulsar timing educational examples, and stellar age order-of-magnitude charts often prefer a fixed year so plots do not depend on calendar reform history. Simulation timesteps labeled in years usually mean this fixed unit unless stated otherwise.`,
					msg`Planetary fact sheets may list periods in days or in years—check the footnote. If a year is undefined, ask whether they mean 365.25 d, 365.2425 d, or Earth’s actual orbital period (which differs slightly from both).`,
					msg`Software libraries sometimes offer Julian century (36,525 days) for older astronomical formulas. That is 100 Julian years. Convert through days if your tool only exposes years and days.`,
				],
			},
			{
				heading: msg`Age, birthdays, and why they diverge`,
				paragraphs: [
					msg`Human age in years is a civil concept tied to calendar dates, not a pure second count divided by 31,557,600. Leap days, time zones, and local midnight rules affect birthday boundaries. Do not convert a person’s age with Julian years unless you are doing a physics-style duration exercise and say so.`,
					msg`Fossil and geological “millions of years” are long durations; the difference between Gregorian mean and Julian year is negligible next to dating uncertainty. Still, be consistent inside one paper or dataset.`,
					msg`Contract law and finance use calendar or business-day conventions. Scientific converters do not replace those legal definitions.`,
				],
			},
			{
				heading: msg`Practical guidance`,
				paragraphs: [
					msg`If the text mentions light-years, astronomical constants, or SI-style durations, interpret “year” as Julian unless another convention is stated. If the text mentions birthdays, tax years, or history timelines, use calendar rules.`,
					msg`Convert using Year (Julian) ↔ Day when you need transparent second-based duration. Document the choice in your notebook: “years mean Julian years (365.25 d).”`,
					msg`Our Julian year ↔ day converter pages exist specifically to keep that definition visible—use them when reconciling catalogue values or teaching why a light-year is a length.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many days are in a Julian year?`,
				answer: msg`Exactly 365.25 days, defined as 31,557,600 seconds. That fixed length is why astronomy prefers it for duration math.`,
			},
			{
				question: msg`Is a Julian year the same as a leap year?`,
				answer: msg`No. A leap year is a calendar year with an extra day. A Julian year is a constant duration equal to the average length of a year in the old Julian leap pattern (365.25 days).`,
			},
			{
				question: msg`Which year does a light-year use?`,
				answer: msg`The conventional light-year uses the Julian year: the distance light travels in vacuum in 365.25 days of 86,400 seconds each.`,
			},
		],
	},
	{
		slug: "carpet-area-calculator-workflow",
		title: msg`Carpet Area Calculator Workflow`,
		description: msg`Measure rooms, convert square metres and square feet, add waste, and order carpet or flooring without mixing length and area units.`,
		relatedConverters: [
			{ quantity: "Area", from: "Square Metre", to: "Square Foot" },
			{ quantity: "Area", from: "Square Foot", to: "Square Metre" },
			{ quantity: "Length", from: "Meter", to: "Foot (International)" },
			{ quantity: "Area", from: "Square Metre", to: "Acre" },
		],
		sections: [
			{
				heading: msg`Area first, then conversion`,
				paragraphs: [
					msg`Carpet and flooring are sold by area—square metres or square feet—not by a single length. The reliable workflow is: measure length and width in one unit → multiply for area → convert area if the seller uses another unit → add waste → round up to pack coverage.`,
					msg`If you convert metres to feet on only one side of a rectangle before multiplying, the area is wrong. If you convert both sides to feet and multiply, you get square feet directly. If you multiply in metres, convert with an area converter. Pick one path and stay on it.`,
					msg`Write units on the sketch: “3.20 m × 4.10 m” or “10 ft 6 in × 13 ft 5 in.” Bare numbers cause expensive callbacks.`,
				],
			},
			{
				heading: msg`Measuring real rooms`,
				paragraphs: [
					msg`Split L-shaped rooms into rectangles. Measure closets if carpet continues inside. Note doorways and transitions where material stops. For stairs, treat treads and risers with the installer’s method—stair carpet is often estimated separately from floor area.`,
					msg`Measure twice. Wall-to-wall carpet needs the clear floor span, not the exterior building footprint. Baseboards and undercut doors affect fitting but not the geometric area you start from.`,
					msg`Irregular bays: approximate with rectangles and triangles, sum areas in one unit, then convert once. Rounding each polygon before summing can leave you short by a square metre you will notice at the seam.`,
				],
			},
			{
				heading: msg`Square metres ↔ square feet`,
				paragraphs: [
					msg`1 m² ≈ 10.7639 ft². 1 ft² ≈ 0.092903 m². Those factors are squares of the metre–foot length relationship. That is why a “10% longer room” is not a “10% larger carpet order” when you also change width.`,
					msg`US retailers quote ft²; many international and commercial specs use m². Keep a project sheet with both columns. Convert the net area, then apply waste in your working unit, then convert again only if packaging demands it.`,
					msg`Large commercial spaces sometimes mention acres for campuses, not for a single room. One acre is 4,046.8564224 m². Do not use acre converters for a bedroom—use m²/ft².`,
				],
			},
			{
				heading: msg`Waste, pattern match, and roll width`,
				paragraphs: [
					msg`Waste factors of 5–15% are common; patterned carpet can need more for matching. Apply waste after you trust net area. Converting units does not replace waste judgment.`,
					msg`Broadloom rolls have fixed widths. Installers compute cuts from room dimensions and roll width—not from area alone. Still, purchasing starts from credible total area so the quote’s square footage matches your sketch.`,
					msg`Tile and plank sold in boxes list coverage area per box. Divide required area (with waste) by coverage per box in the same unit, then round up whole boxes.`,
				],
			},
			{
				heading: msg`From sketch to order form`,
				paragraphs: [
					msg`Create a line per room: raw L, raw W, unit, net area, waste %, order area, seller unit. Sum order areas. Compare to the installer’s takeoff. Differences larger than a few percent deserve a phone call before payment.`,
					msg`When an overseas seller lists m² and your contractor thinks in ft², send both totals. Dual reporting catches silent conversion errors faster than arguing about a single number.`,
					msg`Use our square metre ↔ square foot converter for the area step and metre ↔ foot for checking individual wall lengths on mixed drawings.`,
				],
			},
			{
				heading: msg`Mistakes that empty the truck`,
				paragraphs: [
					msg`Treating linear metres of skirting like square metres of carpet. Treating roll width as area. Forgetting hallways. Using interior paint-area estimates (which subtract windows) for flooring (which usually should not).`,
					msg`Ordering from room perimeter instead of area. Perimeter helps trim length; it does not equal carpet area.`,
					msg`Updating one dimension after furniture plans change but forgetting to recompute area and reconvert. Build the habit: any geometry change triggers a full pass through the workflow.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How do I convert room m² to ft² for carpet?`,
				answer: msg`Compute area in square metres, then multiply by about 10.7639—or use an area converter. Do not convert only one wall length to feet.`,
			},
			{
				question: msg`When do I add waste factor?`,
				answer: msg`After you trust net area. Add 5–15% (more for patterns), then convert to the seller’s unit if needed and round up to packaging.`,
			},
			{
				question: msg`Can I order carpet from length × width in mixed units?`,
				answer: msg`No. Convert lengths into one system first, or convert the finished area with an area converter. Mixed units in the product L × W are invalid.`,
			},
		],
	},
	{
		slug: "grams-ounces-kitchen-scale",
		title: msg`Grams and Ounces on a Kitchen Scale`,
		description: msg`Weigh ingredients in grams and ounces, convert between metric and US kitchen units, and know when mass beats cup volume for baking accuracy.`,
		relatedConverters: [
			{ quantity: "Weight", from: "Gram", to: "Ounce (Avoirdupois)" },
			{ quantity: "Weight", from: "Ounce (Avoirdupois)", to: "Gram" },
			{ quantity: "Weight", from: "Kilogram", to: "Pound (Avoirdupois)" },
			{ quantity: "Weight", from: "Milligram", to: "Gram" },
		],
		sections: [
			{
				heading: msg`Why bakers prefer weight`,
				paragraphs: [
					msg`A cup of flour can vary by tens of grams depending on scooping and humidity. A 120 g portion does not. Grams and ounces measure mass; cups measure volume. When a recipe lists weight, trust the scale and convert units—do not re-approximate with cups unless you accept variability.`,
					msg`Digital kitchen scales often toggle between g and oz (and sometimes lb:oz). Learn your scale’s tare button and unit button before you cream butter. Switching units mid-recipe without zeroing is a common way to double salt.`,
					msg`Avoirdupois ounces are the everyday food ounce: 1 oz = 28.349523125 g exactly by the international pound definition. Troy ounces are for precious metals—ignore them in the kitchen.`,
				],
			},
			{
				heading: msg`Grams, kilograms, and milligrams`,
				paragraphs: [
					msg`Recipes use grams for most ingredients. Kilograms appear for large dough batches (1 kg flour). Milligrams appear in nutrition labels and caffeine or supplement contexts—1,000 mg = 1 g. Do not dose medicine from a kitchen scale unless the device and procedure are appropriate; this guide is about cooking units.`,
					msg`Prefer whole grams for home baking. Tenths of a gram help for yeast or salt in small loaves if your scale resolves them. Converting 0.25 oz of yeast to grams (about 7.1 g) is clearer than leaving fractional ounces on a sticky note.`,
					msg`Batch scaling: convert everything to grams, multiply by the scale factor, then convert back to ounces only if your audience insists. Scaling in mixed units invites rounding drift.`,
				],
			},
			{
				heading: msg`Ounces and pounds in US recipes`,
				paragraphs: [
					msg`US recipes may list 8 oz of chocolate or 1 lb of butter. Remember 16 oz = 1 lb. Convert pounds to grams via ounces or use a kilogram ↔ pound converter for large amounts: 1 lb ≈ 453.592 g.`,
					msg`Fluid ounces measure volume, not mass. “8 fl oz of milk” is not the same measurement type as “8 oz of flour” by weight. Thick syrups and flour cannot be swapped between fl oz and oz without density.`,
					msg`When a US recipe says “ounces” for solids, it usually means weight ounces. When it says “fluid ounces” or uses cup marks on a jug, it means volume. Read the word “fluid” carefully.`,
				],
			},
			{
				heading: msg`Practical conversion habits`,
				paragraphs: [
					msg`Exact kitchen factor: grams = ounces × 28.349523125. Ounces = grams ÷ 28.349523125. For mental checks, 30 g ≈ 1 oz is rough; 28 g ≈ 1 oz is better.`,
					msg`Tare the bowl, add the first ingredient to its target weight, tare again, add the next. Working entirely in grams reduces unit toggling. If the recipe is in ounces, either convert the whole recipe before starting or keep the scale in oz for that session—do not mix mid-bowl.`,
					msg`Print or note dual totals for shared family recipes: “butter 113 g (4 oz).” Dual labels prevent weekend arguments and burnt cookies.`,
				],
			},
			{
				heading: msg`Nutrition labels and package net weights`,
				paragraphs: [
					msg`Package net weight may show grams and ounces together. Serving sizes sometimes mix mL and g. Convert only within the same quantity type. Calories per ounce change when you confuse weight ounces with fluid ounces of a drink.`,
					msg`Imported goods may show only metric net weight. US cooks can convert g → oz for intuition, but baking is usually easier if you stay in grams once you own a metric scale.`,
					msg`Portioning meal prep: convert the weekly protein target to grams, divide into containers, and ignore ounces until you publish a US-facing blog post.`,
				],
			},
			{
				heading: msg`When volume is still fine`,
				paragraphs: [
					msg`Water and many thin liquids have density near 1 g/mL, so millilitres and grams are roughly interchangeable for rough work. Oils, honey, and packed brown sugar are not. When accuracy matters, weigh.`,
					msg`Spices in pinches stay volumetric by nature. Convert spice weights only for large commercial batches.`,
					msg`Use our gram ↔ ounce and kilogram ↔ pound converters to rebuild a US recipe into metric mise en place before the oven preheats.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many grams are in an ounce?`,
				answer: msg`One avoirdupois ounce is exactly 28.349523125 grams. For cooking estimates, many people use 28 g ≈ 1 oz.`,
			},
			{
				question: msg`Are fluid ounces the same as ounces on a scale?`,
				answer: msg`No. Fluid ounces measure volume; scale ounces measure mass. Convert volume and mass separately, using density if you must bridge them.`,
			},
			{
				question: msg`Should I bake in grams or ounces?`,
				answer: msg`Grams are usually clearer for small ingredients and metric recipes. Ounces are fine if the whole recipe and your scale stay in ounces. Pick one system per bake.`,
			},
		],
	},
	{
		slug: "stone-weight-uk-us",
		title: msg`Stone Weight: UK Speech vs US Scales`,
		description: msg`Convert British stone and pounds to kilograms and pounds, read UK body-weight phrases correctly, and avoid decimal-stone mistakes on forms.`,
		relatedConverters: [
			{ quantity: "Weight", from: "Stone", to: "Kilogram" },
			{ quantity: "Weight", from: "Kilogram", to: "Stone" },
			{ quantity: "Weight", from: "Stone", to: "Pound (Avoirdupois)" },
			{ quantity: "Weight", from: "Pound (Avoirdupois)", to: "Kilogram" },
		],
		sections: [
			{
				heading: msg`What a stone is`,
				paragraphs: [
					msg`One stone equals exactly 14 avoirdupois pounds. Using the international pound, 1 stone = 6.35029318 kg. UK everyday speech still describes adult body weight in stone and pounds (“11 stone 4”), even though medical records increasingly prefer kilograms.`,
					msg`US bathroom scales and forms almost never use stone. If you move between the UK and US, you will translate between stone↔lb and stone↔kg often. Freight and science do not use stone—keep it in the body-weight and informal UK context.`,
					msg`Because 14 lb make a stone, leftover pounds always run from 0 to 13 in normal speech. Saying “11.4 stone” casually might mean 11 st 4 lb to a listener—or 11.4 × 14 lb to a spreadsheet. Those disagree. Prefer “11 st 4 lb” in writing.`,
				],
			},
			{
				heading: msg`Converting stone and pounds to kilograms`,
				paragraphs: [
					msg`Method A: convert stone to pounds (× 14), add leftover pounds, convert total pounds to kilograms. Method B: convert stone to kilograms (× 6.35029318) and convert leftover pounds to kilograms (× 0.45359237), then add. Both match if you use exact factors.`,
					msg`Example: 11 st 4 lb → (11 × 14) + 4 = 158 lb → about 71.67 kg. Round for the form’s rules (often whole kilograms in casual contexts, one decimal in clinics).`,
					msg`Reverse: kilograms to stone for conversation—divide kg by 6.35029318 to get decimal stone, then split into whole stone and remaining pounds carefully—or convert kg → lb first, then divide by 14 for stone and remainder.`,
				],
			},
			{
				heading: msg`US pounds-only world`,
				paragraphs: [
					msg`US friends and apps expect a single pound figure. Convert UK stone-and-pounds to total pounds before sharing. 11 st 4 lb = 158 lb, not “11.4 lb.” That error is an order of magnitude wrong and alarms health apps.`,
					msg`Gym programs written in pounds need working weights in pounds. Convert body weight only if the program indexes loads to body weight; otherwise convert the prescribed plate weights, not your nickname weight in stone.`,
					msg`Airline baggage is kilograms or pounds—not stone. Never put stone on a shipping label.`,
				],
			},
			{
				heading: msg`Medical and passport-adjacent forms`,
				paragraphs: [
					msg`NHS-style contexts may accept stones and pounds or kilograms depending on the form. Enter exactly the format requested. If it wants kilograms, convert fully; do not type stone into a kg box.`,
					msg`Pediatric and athletic charts may use kilograms internationally. Convert once from a measured scale reading. Re-weigh rather than eternally converting an old stone value after training cycles.`,
					msg`When a US telehealth portal rejects a weight, check whether it expects lb and you typed kg (or the reverse). Unit mismatch looks like physiologically impossible input.`,
				],
			},
			{
				heading: msg`Mental anchors`,
				paragraphs: [
					msg`10 st ≈ 63.5 kg ≈ 140 lb; 11 st ≈ 69.9 kg ≈ 154 lb; 12 st ≈ 76.2 kg ≈ 168 lb; 14 st ≈ 88.9 kg ≈ 196 lb. Anchors help conversation; exact converters help forms.`,
					msg`Half-stone changes (7 lb ≈ 3.2 kg) are common in fitness talk. Convert the change the same way you convert absolute weight.`,
					msg`If your scale shows kg but your coach talks stone, keep training logs in kilograms and convert only for the coach’s summary. One source of truth beats dual editing every session.`,
				],
			},
			{
				heading: msg`Workflow worth repeating`,
				paragraphs: [
					msg`Measure in whatever the scale displays. Convert to the audience’s unit with stone↔kg or lb↔kg tools. Write the compound UK form only for humans who expect it. Store metric in spreadsheets.`,
					msg`Label every number: “72.1 kg (11 st 4 lb).” Dual labels prevent the 11.4 disaster.`,
					msg`Use our stone ↔ kilogram and stone ↔ pound pages when you need exact splits instead of guessing leftover pounds.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How many pounds are in a stone?`,
				answer: msg`Exactly 14 avoirdupois pounds. One stone is also exactly 6.35029318 kilograms via the international pound.`,
			},
			{
				question: msg`Does the US use stone for body weight?`,
				answer: msg`Almost never in everyday US forms or scales. Convert stone to pounds or kilograms when talking to US audiences or software.`,
			},
			{
				question: msg`Is 12.5 stone the same as 12 st 5 lb?`,
				answer: msg`Not reliably. Decimal stone means fraction of 14 lb (12.5 st = 12 st 7 lb). Spoken “twelve stone five” means 12 st 5 lb. Prefer explicit stone and pounds.`,
			},
		],
	},
	{
		slug: "airspeed-units-explained",
		title: msg`Airspeed Units Explained`,
		description: msg`Convert knots, miles per hour, kilometres per hour, and metres per second for aviation and meteorology—without confusing airspeed types or nautical vs statute miles.`,
		relatedConverters: [
			{ quantity: "Speed", from: "Knot", to: "Kilometre per hour" },
			{ quantity: "Speed", from: "Knot", to: "Mile per hour" },
			{ quantity: "Speed", from: "Metre per second", to: "Kilometre per hour" },
			{ quantity: "Speed", from: "Mile per hour", to: "Kilometre per hour" },
		],
		sections: [
			{
				heading: msg`Airspeed is a speed—with extra labels`,
				paragraphs: [
					msg`Pilots talk about indicated airspeed (IAS), calibrated airspeed (CAS), true airspeed (TAS), and ground speed (GS). Those labels describe corrections for instrument error, altitude, and wind. Unit conversion (knots vs km/h) is separate: convert only after you know which airspeed type you are quoting.`,
					msg`Operational aviation prefers knots worldwide for airspeeds and winds. Popular articles may convert to mph or km/h for readers. Meteorology sometimes uses metres per second for wind. Know your audience before you change the number.`,
					msg`This guide focuses on unit conversion among knots, mph, km/h, and m/s. It does not replace performance charts or training on IAS/TAS relationships.`,
				],
			},
			{
				heading: msg`Knots as the aviation default`,
				paragraphs: [
					msg`Airspeeds and ATIS winds are typically in knots. One knot = 1.852 km/h = about 1.15078 mph. When a POH lists V-speeds in knots, convert for a passenger explanation if you want—but memorize and fly the knot values you trained with.`,
					msg`Ground speed from GNSS is also often shown in knots in cockpit devices. A car-oriented app on a tablet may default to mph; switch units so your ETAs match sectional-chart thinking in nautical miles.`,
					msg`Nautical miles and knots travel together. If you convert speed to km/h, convert distance to kilometres too before dividing for time.`,
				],
			},
			{
				heading: msg`km/h, mph, and m/s in reports`,
				paragraphs: [
					msg`Some civil documents and metric-country outreach use km/h. Convert knots → km/h by multiplying by 1.852. Example: 90 kt ≈ 166.7 km/h. For mph, multiply knots by about 1.15078.`,
					msg`Metres per second appear in scientific wind data and some European forecasts: 1 m/s = 3.6 km/h ≈ 1.94384 kt. A “10 m/s wind” is about 19.4 kt—not 10 kt.`,
					msg`Foot per second is rare in aviation ops but shows up in some engineering notes. Convert via m/s or mph using a speed converter rather than inventing factors mid-briefing.`,
				],
			},
			{
				heading: msg`Wind shear of the mental kind`,
				paragraphs: [
					msg`Students sometimes convert a wind of 15 kt to “15 mph” by changing the label without changing the number. That understates wind. Always run the factor.`,
					msg`News may say “gusts of 80 mph” while METARs use knots. Re-convert from the authoritative METAR when briefing. Dual-unit sticky notes help in mixed classrooms.`,
					msg`Helicopter and ultralight communities sometimes speak mph in certain countries. Check the unit column on every performance table—especially when PDFs were scanned from mixed sources.`,
				],
			},
			{
				heading: msg`Linking speed to distance and time`,
				paragraphs: [
					msg`Rule of thumb planning: time (hours) ≈ distance / speed when units match. Nautical miles with knots; kilometres with km/h; statute miles with mph. Crossing those streams is the main arithmetic failure in amateur flight planning.`,
					msg`Climb and descent rates use feet per minute—a vertical speed unit, not a horizontal airspeed unit. Do not convert fpm with knot converters.`,
					msg`Use knot ↔ km/h and m/s ↔ km/h tools to translate forecasts and stories, then return to knots for cockpit flows if that is your training standard.`,
				],
			},
			{
				heading: msg`Practical checklist`,
				paragraphs: [
					msg`Identify the airspeed type (IAS/TAS/GS) and the unit. Convert the unit only. Keep type labels attached (“TAS 140 kt ≈ 259 km/h”).`,
					msg`Align chart distance units with speed units before ETA math. Verify tablet app unit settings before navigation practice.`,
					msg`When teaching mixed audiences, give knots first (ops truth) and a converted gloss second (public truth).`,
				],
			},
		],
		faqs: [
			{
				question: msg`Why doesn’t this guide use Mach?`,
				answer: msg`Mach is a ratio to local speed of sound, not a fixed SI-style speed unit like knots or km/h. This converter set focuses on absolute speed units; use performance charts for Mach.`,
			},
			{
				question: msg`How do I convert knots to km/h?`,
				answer: msg`Multiply knots by 1.852. Example: 100 kt = 185.2 km/h.`,
			},
			{
				question: msg`Is ground speed the same as airspeed?`,
				answer: msg`No. Ground speed includes wind. You can convert either into km/h or mph, but they remain different physical quantities.`,
			},
		],
	},
	{
		slug: "time-zones-vs-duration-units",
		title: msg`Time Zones vs Duration Units`,
		description: msg`Separate clock labels (time zones, DST) from duration units (seconds, hours, days) so meeting math and layover math stop disagreeing.`,
		relatedConverters: [
			{ quantity: "Time", from: "Hour", to: "Minute" },
			{ quantity: "Time", from: "Minute", to: "Second" },
			{ quantity: "Time", from: "Hour", to: "Day" },
			{ quantity: "Time", from: "Day", to: "Week" },
		],
		sections: [
			{
				heading: msg`Clocks label moments; durations measure spans`,
				paragraphs: [
					msg`A time zone changes how we label the same instant (“15:00 UTC” vs “11:00 EDT”). A duration unit measures how much time elapses between two instants (3 hours, 180 minutes). Converting 3 hours to minutes never requires a time zone. Scheduling a call across zones never changes how long 3 hours lasts.`,
					msg`Confusion starts when people subtract clock faces in local labels without converting both instants to a common timeline. 22:00 in Paris to 08:00 next day in New York is not “10 hours” of subtraction on the printed numbers alone—you must interpret zones and dates.`,
					msg`Use duration converters for spans. Use time-zone tools or explicit UTC offsets for wall-clock labels. This guide trains you to pick the right tool.`,
				],
			},
			{
				heading: msg`Duration conversions that stay honest`,
				paragraphs: [
					msg`Hours, minutes, seconds, days, and weeks convert among themselves as pure spans: 1 h = 60 min = 3,600 s; 1 d = 24 h; 1 wk = 7 d. Those factors do not care whether you are in Tokyo or Toronto.`,
					msg`Layover math: if landing is at one local time and departure at another, convert both to UTC (or another single offset), subtract to get a duration in seconds or minutes, then format. Do not convert time zones by “adding duration units” blindly.`,
					msg`Work shifts logged as “7.5 hours” are durations. Convert to minutes (450) for payroll systems that want minutes. Time-zone entry only matters for when the shift started, not for how long 7.5 hours is.`,
				],
			},
			{
				heading: msg`Where time zones actually matter`,
				paragraphs: [
					msg`Meeting invites, flight itineraries, and “call me at 3 pm” messages need zone labels (CET, EST, UTC+9, etc.). Ambiguous “3 pm” is social debt. Ambiguous duration (“in 3 hours”) is relative to “now” and still needs a shared understanding of the starting instant.`,
					msg`Daylight saving shifts change civil labels by an hour on specific dates. The underlying duration of a movie does not become 59 minutes because DST started—though a civil midnight-to-midnight “day” can be 23 or 25 hours on transition dates.`,
					msg`APIs should store instants in UTC or with explicit offsets, and store durations in seconds. Display layers apply zones. Mixing display strings into arithmetic is the bug.`,
				],
			},
			{
				heading: msg`Travel examples`,
				paragraphs: [
					msg`A flight that leaves at 17:00 and lands at 19:00 local at the destination may last 8–12 hours depending on zones. Always trust block time (a duration) from the airline for “how long you sit,” and local times for “when to be at the gate.”`,
					msg`Jet lag feelings track circadian clocks, not unit converters. Still, computing elapsed awake time uses duration units: hours since last sleep, minutes of layover.`,
					msg`Train timetables that cross borders print local times per station. Differences require zone-aware subtraction; the resulting travel time is a duration you can convert to minutes for comparisons.`,
				],
			},
			{
				heading: msg`Software and spreadsheet pitfalls`,
				paragraphs: [
					msg`Spreadsheets store datetimes as serial numbers in a timezone-agnostic cell unless you add conventions. Duration cells formatted as time may wrap at 24 hours. Prefer an integer “total minutes” column for long spans.`,
					msg`Programming libraries distinguish Instant/ZonedDateTime from Duration/Period. Convert seconds with duration tools; convert zones with zone databases (IANA). Do not roll your own offset table from memory.`,
					msg`Logging “job took 2:30” without saying h:mm vs hh:mm:ss recreates decimal-hour bugs. ISO-8601 durations (PT2H30M) fix the ambiguity.`,
				],
			},
			{
				heading: msg`Practical rule of thumb`,
				paragraphs: [
					msg`If the question is “how long,” use second/minute/hour/day converters. If the question is “what time is it there,” use zone conversion. If the question is both—“how long until 09:00 in another city”—convert the target instant, then subtract from now as a duration.`,
					msg`Label outputs: “duration 2 h 15 min” vs “09:00 JST.” Clear nouns prevent Slack threads from inventing physics.`,
					msg`Use our hour ↔ minute ↔ second pages for the span half of the problem; keep a trustworthy world-clock for the label half.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Do I need a time zone to convert hours to minutes?`,
				answer: msg`No. One hour is always 60 minutes as a duration. Time zones only change clock labels for moments in time.`,
			},
			{
				question: msg`Why is my flight longer than landing time minus takeoff time?`,
				answer: msg`Those printed times are local. Zones and date changes hide the true duration. Use the airline’s block time or convert both instants to UTC before subtracting.`,
			},
			{
				question: msg`Can a day have other than 24 hours?`,
				answer: msg`As a duration unit in simple converters, 1 day = 24 hours. Civil clock days can be 23 or 25 hours across daylight-saving transitions.`,
			},
		],
	},
	{
		slug: "density-mass-volume-triangle",
		title: msg`Density, Mass, and Volume: The Triangle`,
		description: msg`Use density = mass / volume with consistent weight and volume units, convert kilograms, grams, litres, and cubic metres, and avoid cup-vs-gram mistakes.`,
		relatedConverters: [
			{ quantity: "Weight", from: "Kilogram", to: "Gram" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
			{ quantity: "Weight", from: "Pound (Avoirdupois)", to: "Kilogram" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Centimetre" },
		],
		sections: [
			{
				heading: msg`One relationship, three roles`,
				paragraphs: [
					msg`Density links mass and volume: density = mass / volume, mass = density × volume, volume = mass / density. Unit converters do not invent density for you—they make the mass and volume numbers consistent so the triangle arithmetic works.`,
					msg`If mass is in kilograms, volume should be in cubic metres for SI density (kg/m³), or you may use g and cm³ (numerically equal to kg/L for the same substance). Mixing lb with litres without converting produces a density nobody else can use.`,
					msg`Everyday liquids often quote g/mL or kg/L. Water is about 1 g/mL near room temperature—handy, not magical. Oils and syrups differ; always use the density for the material and temperature you care about.`,
				],
			},
			{
				heading: msg`Get mass units straight`,
				paragraphs: [
					msg`Convert pounds to kilograms or grams before combining with metric volumes. 1 lb ≈ 453.592 g. Kitchen scales that show ounces need the same care: convert oz → g, then apply density.`,
					msg`Large industrial batches may use metric tonnes (1 t = 1,000 kg) and cubic metres. Convert tonne → kg if your density table is in kg/m³.`,
					msg`Do not treat weight-on-Earth vs mass distinctions here unless you are in an engineering mechanics context. Kitchen and shipping “weight” numbers plug into the triangle as mass values for practical purposes.`,
				],
			},
			{
				heading: msg`Get volume units straight`,
				paragraphs: [
					msg`1 m³ = 1,000 L = 1,000,000 mL. Those metric relationships are exact. Convert volume into the unit that matches your density’s denominator before multiplying.`,
					msg`US cups and fluid ounces are volumes, not masses. A “cup of flour” cannot enter mass = density × volume until you know flour’s bulk density—and that bulk density varies with packing. Prefer weighing flour.`,
					msg`Cubic feet appear in US tanks and fridges. Convert ft³ → m³ or litres before using a metric density table.`,
				],
			},
			{
				heading: msg`Worked patterns`,
				paragraphs: [
					msg`Example: 2.5 L of a liquid with density 0.92 kg/L → mass = 2.5 × 0.92 = 2.3 kg. Convert to pounds only after: ≈ 5.07 lb.`,
					msg`Example: 500 g of material at 0.8 g/mL → volume = 500 / 0.8 = 625 mL. Convert to litres (0.625 L) if the tank chart uses litres.`,
					msg`Keep a paper trail: density value + source + temperature, mass with unit, volume with unit, then the computed third quantity. Unitless triangles are how lab notebooks go wrong.`,
				],
			},
			{
				heading: msg`Shipping and cooking crossovers`,
				paragraphs: [
					msg`Shipping cares about mass and dimensional volume separately for billing. Density explains why pillows bill on volume and steel bills on mass, but the carrier formula still wins for price.`,
					msg`Cooking syrups: converting a recipe from “grams of honey” to tablespoons requires density (or a tested volumetric equivalent). Guessing from water’s density over-pours honey.`,
					msg`Pool chemicals and fertilizers often dose by mass per volume of water. Convert the pool volume to litres, convert product mass to grams, then apply the label—not the other way around.`,
				],
			},
			{
				heading: msg`Practical checklist`,
				paragraphs: [
					msg`Identify which variable you know. Convert mass and volume into a consistent pair. Apply the triangle. Convert the answer into the display unit last.`,
					msg`If a density table uses g/cm³ and your volume is litres, remember 1 g/cm³ = 1 kg/L numerically for the same density value—still convert volume carefully (1 L = 1,000 cm³).`,
					msg`Use kilogram/gram and litre/cubic metre converters to sanitize inputs; look up density from a material datasheet, not from wishful arithmetic.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is density a unit you can convert like kilometres?`,
				answer: msg`Density is a derived quantity (mass per volume). You convert its mass and volume parts into consistent units; you do not treat density as a simple length-style unit on this site.`,
			},
			{
				question: msg`Why can’t I convert cups of flour with water’s density?`,
				answer: msg`Flour’s bulk density is not water’s, and it changes with packing. Weigh flour in grams instead of trusting a water-based volume bridge.`,
			},
			{
				question: msg`What volume unit pairs with kilograms for SI density?`,
				answer: msg`Cubic metres give kg/m³. For liquids, kg/L is common and equals g/mL numerically for the same density value.`,
			},
		],
	},
	{
		slug: "treadmill-pace-min-per-km",
		title: msg`Treadmill Pace: min/km and Speed Units`,
		description: msg`Convert between running pace (minutes per kilometre) and speed in km/h or mph, set treadmills correctly, and compare race paces across metric and US displays.`,
		relatedConverters: [
			{ quantity: "Speed", from: "Kilometre per hour", to: "Mile per hour" },
			{ quantity: "Speed", from: "Mile per hour", to: "Kilometre per hour" },
			{ quantity: "Speed", from: "Metre per second", to: "Kilometre per hour" },
			{ quantity: "Length", from: "Kilometre", to: "Mile (International)" },
		],
		sections: [
			{
				heading: msg`Pace is an inverse speed`,
				paragraphs: [
					msg`Runners quote pace as time per distance—minutes per kilometre or minutes per mile. Treadmills usually show speed in km/h or mph. They describe the same motion differently: pace = time / distance; speed = distance / time. Converting requires reciprocals, not a single multiply of the displayed number.`,
					msg`Example bridge: speed (km/h) = 60 ÷ pace (min/km). Pace (min/km) = 60 ÷ speed (km/h). For miles: speed (mph) = 60 ÷ pace (min/mile). Always track whether the pace distance is a kilometre or a mile.`,
					msg`A “5:00 min/km” pace is 12 km/h. A “8:00 min/mile” pace is 7.5 mph. Those are different efforts—convert carefully before you race your training partners’ screenshots.`,
				],
			},
			{
				heading: msg`Treadmill buttons and silent unit switches`,
				paragraphs: [
					msg`Gym treadmills may default to mph in the US and km/h elsewhere. Hitting “10” intending 10 km/h on an mph treadmill is an all-out sprint (~16 km/h). Check the unit indicator every time you start a belt on travel.`,
					msg`Some consoles let you display pace. Confirm whether that pace is per mile or per kilometre. A 6:00 pace sounds easy per mile and brutal per kilometre.`,
					msg`Calibration and belt wear affect true speed slightly. Unit conversion assumes the console’s number is correct; performance testing may need an external check.`,
				],
			},
			{
				heading: msg`Converting metric and US training plans`,
				paragraphs: [
					msg`Plans written in min/km need min/mile for US races (or the reverse). Convert distance first (1 mile = 1.609344 km), then scale the pace time: min/mile ≈ min/km × 1.609344. Example: 5:00 /km ≈ 8:03 /mile.`,
					msg`Alternatively, convert pace to a speed in km/h, convert speed to mph, then convert mph back to min/mile. Use whichever chain produces fewer rounding steps for you.`,
					msg`Interval workouts that mix “400 m repeats” with “mph recovery jogs” need both length and speed converters. Write every line with units before you lace up.`,
				],
			},
			{
				heading: msg`From m/s and race mathematics`,
				paragraphs: [
					msg`Sports science may log m/s. Multiply by 3.6 for km/h, then convert to pace with 60 / (km/h). Example: 3.33 m/s ≈ 12 km/h ≈ 5:00 min/km.`,
					msg`Race finish time ≈ pace × distance when units match. Convert a marathon distance to kilometres or miles to match your pace unit before multiplying. A marathon is 42.195 km or 26.21875 miles—not 42 miles.`,
					msg`Splits on odd distances (5K, 10K, half) are easier in the distance unit printed on the bib. Convert published pace after you fix the distance language.`,
				],
			},
			{
				heading: msg`Incline, effort, and why units still matter`,
				paragraphs: [
					msg`Incline changes effort at the same belt speed. Converting km/h to mph does not adjust for grade. Keep incline notes beside speed/pace notes.`,
					msg`Heart-rate or power targets are independent of unit labels, but the treadmill prescription you programmed is not. Log the unit you actually used.`,
					msg`Group classes calling “level 8.0” without units are ambiguous across equipment. Ask “km/h or mph?” once and save the workout.`,
				],
			},
			{
				heading: msg`Practical workflow`,
				paragraphs: [
					msg`Decide your coaching unit (min/km or min/mile). Convert the session into treadmill speed in the console’s unit. After the run, convert back to pace for the training log so weeks stay comparable.`,
					msg`Dual-label key sessions: “5:30 /km (8:51 /mile) ≈ 10.9 km/h (6.8 mph).” The first time takes a minute; the clarity lasts a season.`,
					msg`Use km/h ↔ mph converters for the speed side and kilometre ↔ mile for distance; apply the 60/pace bridge for the reciprocal relationship.`,
				],
			},
		],
		faqs: [
			{
				question: msg`How do I convert min/km to km/h?`,
				answer: msg`Divide 60 by the pace in minutes per kilometre. Example: 6:00 min/km → 60/6 = 10 km/h. Convert seconds into decimal minutes first (5:30 → 5.5).`,
			},
			{
				question: msg`How do I convert min/km to min/mile?`,
				answer: msg`Multiply the min/km pace by 1.609344. Example: 5:00 /km ≈ 8:03 /mile. Or convert via km/h ↔ mph and back to pace.`,
			},
			{
				question: msg`Why did 10 on the treadmill feel impossibly fast?`,
				answer: msg`The console was likely in mph while you expected km/h (or the reverse). Check the unit label before you trust the number.`,
			},
		],
	},
	{
		slug: "fuel-economy-units-basics",
		title: msg`Fuel Economy Units Basics`,
		description: msg`Understand L/100 km vs mpg thinking through speed, distance, and volume—convert trip length and pace correctly before you compare car efficiency figures.`,
		relatedConverters: [
			{ quantity: "Length", from: "Kilometre", to: "Mile (International)" },
			{ quantity: "Speed", from: "Kilometre per hour", to: "Mile per hour" },
			{ quantity: "Volume", from: "Litre", to: "Cubic Metre" },
			{ quantity: "Speed", from: "Mile per hour", to: "Kilometre per hour" },
		],
		sections: [
			{
				heading: msg`Economy combines volume and distance`,
				paragraphs: [
					msg`Fuel economy answers “how much fuel per distance” (L/100 km) or “how much distance per fuel” (mpg). Those are inverse styles: lower L/100 km is better; higher mpg is better. You cannot convert them by treating the number like a simple length.`,
					msg`This site’s converters handle the building blocks—kilometres vs miles, litres vs other volumes, km/h vs mph for trip pace. Use them to sanitize inputs, then apply a proper economy formula or a dedicated economy calculator when comparing L/100 km to mpg.`,
					msg`US mpg usually means US gallons; UK historical mpg used imperial gallons. Always note which gallon. Metric countries lean on L/100 km or km/L.`,
				],
			},
			{
				heading: msg`Trip math before economy math`,
				paragraphs: [
					msg`Record fuel volume added and distance driven in consistent units. Convert miles → kilometres (× 1.609344) if your odometer and pump disagree across a border rental. Convert gallons → litres if the receipt and the car computer disagree.`,
					msg`L/100 km ≈ (litres used × 100) / kilometres driven. km/L ≈ kilometres / litres. Those formulas only work after unit cleanup.`,
					msg`Partial fill-ups and forgotten top-ups ruin the dataset faster than unit mistakes. Start economy tests from full-to-full when you can.`,
				],
			},
			{
				heading: msg`Speed, distance, and why pace shows up`,
				paragraphs: [
					msg`Highway efficiency depends on speed. Comparing a US road trip logged in mph with a European test cycle talked about in km/h needs speed conversion so you compare similar driving, not just similar labels.`,
					msg`Average speed = distance / time. Convert distance and speed into one system before judging whether a tank was “mostly highway.” A 70 mph cruise is about 113 km/h—not a European “70” zone.`,
					msg`Idle time burns fuel with zero distance, wrecking L/100 km. Duration units (hours of idle) explain the hit; speed converters do not erase it.`,
				],
			},
			{
				heading: msg`mpg and L/100 km conceptual bridge`,
				paragraphs: [
					msg`Rough intuition: more miles per gallon means fewer litres per 100 km. Exact conversion needs both the mile–kilometre factor and the gallon–litre factor for the correct gallon. Do not invert the number alone (mpg → 1/mpg) and call it L/100 km.`,
					msg`Example directionality: about 8 L/100 km is roughly 29–30 US mpg (order of magnitude check). Always recompute with exact factors for claims or regulations.`,
					msg`Car stickers from different markets may already be converted—or may use different test cycles entirely. Unit conversion cannot fix a cycle mismatch (WLTP vs older cycles).`,
				],
			},
			{
				heading: msg`Volume units at the pump`,
				paragraphs: [
					msg`Litres dominate most of the world. US pumps use US gallons (≈ 3.785 L). Confusing imperial gallons (≈ 4.546 L) with US gallons skews mpg badly.`,
					msg`Cubic metres appear in industrial fuel gas, not petrol stations (1 m³ = 1,000 L). Convert bulk deliveries carefully before computing fleet economy.`,
					msg`Trip computers may let you switch L/100 km ↔ mpg. After switching, reset averages; old samples mixed under another unit display still confuse humans even if the computer converted correctly.`,
				],
			},
			{
				heading: msg`Practical checklist`,
				paragraphs: [
					msg`Pick economy style (L/100 km or mpg). Convert distance and fuel volume into the units that formula needs. Convert highway pace with km/h ↔ mph when comparing trips across countries. Only then compute or convert the economy figure with the correct gallon definition.`,
					msg`Label every log line: distance unit, volume unit, economy style. Dual-display dashboards are fine; dual-meaning spreadsheets are not.`,
					msg`Use kilometre ↔ mile and km/h ↔ mph pages to clean trip data, and litre ↔ cubic metre when bulk fuel deliveries show up in m³. Apply a dedicated L/100 km ↔ mpg formula when you need the economy number itself.`,
				],
			},
		],
		faqs: [
			{
				question: msg`Is higher mpg always better than lower L/100 km?`,
				answer: msg`They run in opposite directions: higher mpg is better; lower L/100 km is better. Convert with proper factors before comparing a US mpg sticker to a metric L/100 km sticker.`,
			},
			{
				question: msg`Can I convert mpg by flipping the number?`,
				answer: msg`No. You need both distance (mile↔km) and volume (gallon↔litre) factors, and you must know whether the gallon is US or imperial.`,
			},
			{
				question: msg`Why convert speed when talking about fuel economy?`,
				answer: msg`Economy depends strongly on driving speed. Converting km/h ↔ mph lets you compare trips or test conditions fairly before you compare L/100 km or mpg results.`,
			},
		],
	},
];

export function getGuideBySlug(slug: string): Guide | undefined {
	return guides.find((g) => g.slug === slug);
}

export { getAllGuideSlugs } from "./guide-slugs";

/** Guides that mention a quantity in related converters (for conversion-page links). */
export function getGuidesForQuantity(quantity: Quantity, limit = 3): Guide[] {
	const matched = guides.filter((guide) =>
		guide.relatedConverters.some(
			(converter) => converter.quantity === quantity,
		),
	);

	return matched.slice(0, limit);
}
