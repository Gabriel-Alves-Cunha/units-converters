export function WebsiteDescription() {
	return (
		<section
			className="flex flex-col gap-16 converter-content text-muted-foreground leading-relaxed"
			aria-label="Website Description"
		>
			<h2 className="mb-4 text-2xl font-medium tracking-tight md:text-4xl text-primary">
				Precision Unit Converter: Metric, Imperial & Scientific
			</h2>

			<p>
				Quickly convert between hundreds of units across <strong>Length</strong>
				,<strong> Temperature</strong>, <strong>Area</strong>, and{" "}
				<strong>Volume</strong>. Whether you are a student, engineer, or
				hobbyist, our tool provides high-precision results for everything from
				everyday measurements to advanced scientific data.
			</p>

			<div className="grid md:grid-cols-2 gap-4 mt-4">
				<div>
					<h3 className="font-semibold text-foreground">
						Comprehensive Categories
					</h3>

					<ul className="list-disc ml-5 space-y-1 text-sm">
						<li>
							<strong>Length:</strong> Nanometres to Light Years and Planck
							Length.
						</li>
						<li>
							<strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin, and
							Newton.
						</li>
						<li>
							<strong>Area:</strong> Square Meters, Acres, Hectares, and Barns.
						</li>
						<li>
							<strong>Volume:</strong> Litres, Cubic Inches, Gallons, and
							Millilitres.
						</li>
					</ul>
				</div>

				<div>
					<h3 className="font-semibold text-foreground">
						Why Use Our Converter?
					</h3>

					<ul className="list-disc ml-5 space-y-1 text-sm">
						<li>
							<strong>Ultimate Precision:</strong> Powered by Decimal.js for
							zero rounding errors.
						</li>
						<li>
							<strong>Scientific Grade:</strong> Includes rare units like Bohr,
							Ångström, and Parsecs.
						</li>
						<li>
							<strong>Instant Results:</strong> Real-time conversion as you
							type.
						</li>
						<li>
							<strong>Mobile Friendly:</strong> Optimized for use on any device.
						</li>
					</ul>
				</div>
			</div>

			<hr className="converter-content" />

			<p className="text-sm italic py-auto">
				Our free online converter is the fastest way to switch between metric
				and imperial systems. Save time on complex math and get reliable
				conversions for school, lab work, or construction projects.
			</p>
		</section>
	);
}
