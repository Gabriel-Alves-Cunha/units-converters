import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";

import { defaultSearchParams } from "#/lib/global-params-params";
import { POPULAR_CONVERSIONS } from "#/lib/popular-conversions";
import { UnitNamesWithTranslations } from "#/lib/units";
import { scrollPageToTop } from "#/lib/utils";

export function CommonConversions() {
	const { lang } = useParams({ from: "/$lang" });
	const { i18n } = useLingui();

	return (
		<div className="flex flex-col gap-4 converter-content">
			<h3 className="text-2xl font-semibold">
				<Trans>Common conversions</Trans>
			</h3>

			<ul className="list-disc *:ml-5 grid grid-cols-2">
				{POPULAR_CONVERSIONS.map((cv) => (
					<li key={`${cv.quantity}-${cv.from}-${cv.to}`}>
						<Link
							to="/$lang/convert/$quantity/$from/to/$to"
							search={defaultSearchParams}
							className="link underline"
							onClick={scrollPageToTop}
							params={{
								...cv,
								lang,
							}}
						>
							<Trans>
								{i18n._(UnitNamesWithTranslations[cv.from])} to{" "}
								{i18n._(UnitNamesWithTranslations[cv.to])}
							</Trans>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
