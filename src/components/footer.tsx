import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";

import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";
import { openConsentBanner } from "#/features/consent/consent-store";

export function Footer() {
	const { lang } = useParams({ from: "/$lang" });

	return (
		<footer className="flex h-auto min-h-20 w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 converter-full bg-muted text-sm px-4 py-4">
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
				to="/$lang/guides"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>Guides</Trans>
			</Link>

			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/contact"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>Contact</Trans>
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

			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/terms-of-service"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>Terms of Service</Trans>
			</Link>

			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/disclaimer"
				onClick={scrollPageToTop}
				params={{ lang }}
			>
				<Trans>Disclaimer</Trans>
			</Link>

			<button
				type="button"
				className="link underline cursor-pointer bg-transparent border-0 p-0 text-sm"
				onClick={openConsentBanner}
			>
				<Trans>Cookie settings</Trans>
			</button>

			<p className="">
				<Trans>
					&copy; {new Date().getFullYear()} Units Converters. All rights
					reserved.
				</Trans>
			</p>
		</footer>
	);
}
