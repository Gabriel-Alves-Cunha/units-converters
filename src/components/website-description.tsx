import { Trans } from "@lingui/react/macro";

export function WebsiteDescription() {
	return (
		<section
			className="flex flex-col gap-16 converter-content text-muted-foreground leading-relaxed"
			aria-label="Website Description"
		>
			<h2 className="mb-4 text-2xl font-medium tracking-tight md:text-4xl text-primary">
				<Trans>Precision Unit Converter: Metric, Imperial & Scientific</Trans>
			</h2>

			<p>
				<Trans>
					Quickly convert between hundreds of units across{" "}
					<strong>Length</strong>,<strong> Temperature</strong>,{" "}
					<strong>Area</strong>, and <strong>Volume</strong>. Whether you are a
					student, engineer, or hobbyist, our tool provides high-precision
					results for everything from everyday measurements to advanced
					scientific data.
				</Trans>
			</p>

			<div className="grid md:grid-cols-2 gap-4 mt-4">
				<div>
					<h3 className="font-semibold text-foreground">
						<Trans>Comprehensive Categories</Trans>
					</h3>

					<ul className="list-disc ml-5 space-y-1 text-sm">
						<li>
							<Trans>
								<strong>Length:</strong> Nanometres to Light Years and Planck
								Length.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin, and
								Newton.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Area:</strong> Square Meters, Acres, Hectares, and
								Barns.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Volume:</strong> Litres, Cubic Inches, Gallons, and
								Millilitres.
							</Trans>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="font-semibold text-foreground">
						<Trans>Why Use Our Converter?</Trans>
					</h3>

					<ul className="list-disc ml-5 space-y-1 text-sm">
						<li>
							<Trans>
								<strong>Ultimate Precision:</strong> Powered by Decimal.js for
								zero rounding errors.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Scientific Grade:</strong> Includes rare units like
								Bohr, Ångström, and Parsecs.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Instant Results:</strong> Real-time conversion as you
								type.
							</Trans>
						</li>

						<li>
							<Trans>
								<strong>Mobile Friendly:</strong> Optimized for use on any
								device.
							</Trans>
						</li>
					</ul>
				</div>
			</div>

			<hr className="converter-content" />

			<p className="text-sm py-auto">
				<Trans>
					Our free online converter is the fastest way to switch between metric
					and imperial systems. Save time on complex math and get reliable
					conversions for school, lab work, or construction projects.
				</Trans>
			</p>
		</section>
	);
}
