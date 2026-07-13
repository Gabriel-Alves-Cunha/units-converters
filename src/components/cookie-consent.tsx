import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";

import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";
import {
	applyConsent,
	hydrateConsentFromStorage,
	openConsentBanner,
	subscribeBannerOpen,
	isConsentBannerOpen,
} from "#/features/consent/consent-store";

export function CookieConsent() {
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { lang } = useParams({ from: "/$lang" });
	const { i18n } = useLingui();

	useEffect(() => {
		setMounted(true);

		const status = hydrateConsentFromStorage();

		if (status === "accepted" || status === "declined") {
			return;
		}

		const timer = setTimeout(() => {
			openConsentBanner();
		}, 1_000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	useEffect(() => {
		setIsOpen(isConsentBannerOpen());
		return subscribeBannerOpen(setIsOpen);
	}, []);

	function handleAccept() {
		applyConsent("accepted");
	}

	function handleDecline() {
		applyConsent("declined");
	}

	if (!mounted) return null;

	return (
		<div
			className={`fixed bottom-6 right-6 z-[9999] max-w-md w-[calc(100vw-3rem)] p-6 rounded-2xl border shadow-2xl backdrop-blur-md bg-background/90 text-foreground transition-all duration-500 ease-out transform ${
				isOpen
					? "translate-y-0 opacity-100 scale-100"
					: "translate-y-8 opacity-0 scale-95 pointer-events-none"
			}`}
			role="dialog"
			aria-labelledby="cookie-consent-title"
			aria-hidden={!isOpen}
		>
			<div className="flex flex-col gap-4">
				<h3
					id="cookie-consent-title"
					className="text-lg font-semibold tracking-tight"
				>
					<Trans>Cookie Consent</Trans>
				</h3>

				<p className="text-sm leading-relaxed text-muted-foreground">
					<Trans>
						We and our partners use cookies to analyze site traffic with
						PostHog, personalize content, and serve relevant advertisements
						(such as Google AdSense). By clicking &quot;Accept All&quot;, you
						agree to our use of cookies as detailed in our{" "}
						<Link
							className="link underline font-medium hover:text-link-hover"
							search={defaultSearchParams}
							to="/$lang/privacy-policy"
							onClick={scrollPageToTop}
							params={{ lang }}
						>
							Privacy Policy
						</Link>
						. You can decline non-essential cookies and still use the converter.
					</Trans>
				</p>

				<div className="flex flex-wrap items-center justify-end gap-3 mt-2">
					<button
						className="px-4 py-2 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97] transition-all cursor-pointer"
						onClick={handleDecline}
						type="button"
					>
						<Trans>Decline</Trans>
					</button>

					<button
						className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 shadow-sm active:scale-[0.97] transition-all cursor-pointer"
						onClick={handleAccept}
						type="button"
						aria-label={i18n._(msg`Accept All`)}
					>
						<Trans>Accept All</Trans>
					</button>
				</div>
			</div>
		</div>
	);
}
