import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";

import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

export function Footer() {
	const { lang } = useParams({ from: "/$lang" });

	return (
		<footer className="flex h-20 w-full items-center justify-center gap-6 converter-full bg-muted text-sm px-4">
			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/about"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>About</Trans>
			</Link>

			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/privacy-policy"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>Privacy Policy</Trans>
			</Link>

			<p className="">
				<Trans>
					&copy; {new Date().getFullYear()} Units Converters. All rights
					reserved.
				</Trans>
			</p>
		</footer>
	);
}
