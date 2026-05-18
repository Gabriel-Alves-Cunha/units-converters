import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { defaultLocale } from "#/integrations/i18n/load-catalog";
import { defaultSearchParams } from "#/lib/global-params-params";
import {
	type UnitName,
	UnitNamesWithTranslations,
	QuantitiesWithTranslations,
	QuantitySchema,
	units,
} from "#/lib/units";
import { getFirstKeyOfRecord } from "#/lib/utils";

export const Route = createFileRoute("/$lang/")({
	component: Home,
});

function Home() {
	const { i18n } = useLingui();

	return (
		<div className="flex flex-col gap-12 min-h-svh converter-content py-8">
			<section className="text-center space-y-4">
				<h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
					<Trans>The Only Unit Converter You'll Ever Need</Trans>
				</h2>

				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					<Trans>
						Simple, fast, and scientific-grade precision. Convert anything from
						nanometres to light years in seconds.
					</Trans>
				</p>
			</section>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{QuantitySchema.options.map((quantity) => {
					const firstUnit = getFirstKeyOfRecord(units[quantity]);

					const translatedUnits = Object.keys(units[quantity])
						.slice(0, 3)
						.map((unit) => i18n._(UnitNamesWithTranslations[unit as UnitName]))
						.join(", ");

					return (
						<Link
							className="group relative flex flex-col p-6 rounded-2xl border bg-card button-hover"
							to="/$lang/convert/$quantity/$from/to/$to"
							search={defaultSearchParams}
							key={quantity}
							params={(params) => ({
								lang: params.lang || defaultLocale,
								from: firstUnit || "",
								to: firstUnit || "",
								quantity,
							})}
						>
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-2xl font-semibold text-primary">
									{i18n._(QuantitiesWithTranslations[quantity])}
								</h3>

								<ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
							</div>

							<p className="text-muted-foreground">
								<Trans>Convert {translatedUnits} and more.</Trans>
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
