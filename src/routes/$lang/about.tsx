import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { createFileRoute, Link } from "@tanstack/react-router";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";

export const Route = createFileRoute("/$lang/about")({
	head({ match }) {
		const { i18n } = match.context;
		const title = i18n._(
			msg`About Units Converters | Our Mission & Technology`,
		);
		const description = i18n._(
			msg`Learn about Units Converters, our commitment to scientific precision, and the technology behind our zero-rounding-error conversion tool.`,
		);

		return {
			meta: [
				{ property: "og:description", content: description },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ title },
			],
		};
	},
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="flex flex-col gap-12 min-h-svh converter-content py-8 leading-relaxed">
			<section className="space-y-6">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>About Units Converters</Trans>
				</h2>

				<p className="text-xl text-muted-foreground">
					<Trans>
						At Units Converters, our mission is to provide the most accurate,
						reliable, and easy-to-use conversion tool on the web. Whether you
						are a student solving a physics problem, an engineer working on a
						global project, or just someone trying to follow a recipe, we ensure
						your measurements are exact.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Our Commitment to Precision</Trans>
				</h3>

				<p>
					<Trans>
						Most online converters suffer from rounding errors because they use
						standard floating-point arithmetic. Our tool is built using{" "}
						<strong>Decimal.js</strong>, a library for arbitrary-precision
						decimal arithmetic. This means that when you convert units, you get
						mathematically perfect results without the common "0.000000000004"
						artifacts found in other tools.
					</Trans>
				</p>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>Key Features</Trans>
				</h3>

				<ul className="list-disc ml-6 space-y-2">
					<li>
						<strong>
							<Trans>Scientific Grade:</Trans>
						</strong>{" "}
						<Trans>
							We include rare and precise units like Planck length, Bohr radius,
							and Ångström for advanced scientific research.
						</Trans>
					</li>

					<li>
						<strong>
							<Trans>Global Accessibility:</Trans>
						</strong>{" "}
						<Trans>
							Our platform is fully translated into English, Spanish, and
							Portuguese to serve users worldwide.
						</Trans>
					</li>

					<li>
						<strong>
							<Trans>Speed and Simplicity:</Trans>
						</strong>{" "}
						<Trans>
							Built on TanStack Start and React 19, the site is optimized for
							instant loading and real-time results as you type.
						</Trans>
					</li>
				</ul>
			</section>

			<section className="space-y-4">
				<h3 className="text-2xl font-semibold text-primary">
					<Trans>The Team</Trans>
				</h3>

				<p>
					<Trans>
						Units Converters is developed and maintained by{" "}
						<strong>Voyager Tecnologias LTDA</strong>. We are a small team
						passionate about building high-quality digital utilities that solve
						everyday problems with technical excellence.
					</Trans>
				</p>
			</section>

			<div className="pt-8 border-t">
				<Link
					params={(params) => ({ lang: params.lang || defaultLocale })}
					className="link font-medium inline-flex items-center gap-2"
					search={defaultSearchParams}
					to="/$lang"
				>
					← <Trans>Back to Home</Trans>
				</Link>
			</div>
		</div>
	);
}
