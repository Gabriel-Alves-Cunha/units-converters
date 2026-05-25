import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Trans } from "@lingui/react/macro";

import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

export function CookieConsent() {
	const [mounted, setMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const { lang } = useParams({ from: "/$lang" });

	useEffect(() => {
		setMounted(true);

		const consent = localStorage.getItem("cookie-consent");

		let timer: ReturnType<typeof setTimeout> | undefined;

		if (!consent) {
			// Show the banner with a slight delay for a premium experience
			timer = setTimeout(() => setIsOpen(true), 1_000);
		}
		return () => {
			if (timer) { clearTimeout(timer); }
		};
	}, []);

	function handleAccept() {
		localStorage.setItem("cookie-consent", "accepted");

		setIsOpen(false);
	};

	function handleDecline() {
		localStorage.setItem("cookie-consent", "declined");

		setIsOpen(false);
	};

	if (!mounted) return null;

	return (
		<div
			className={`fixed bottom-6 right-6 z-[9999] max-w-md w-[calc(100vw-3rem)] p-6 rounded-2xl border shadow-2xl backdrop-blur-md bg-background/90 text-foreground transition-all duration-500 ease-out transform ${isOpen
				? "translate-y-0 opacity-100 scale-100"
				: "translate-y-8 opacity-0 scale-95 pointer-events-none"
				}`}
		>
			<div className="flex flex-col gap-4">
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-lg font-semibold tracking-tight">
						<Trans>Cookie Consent</Trans>
					</h3>

					<span className="text-2xl" role="img" aria-label="cookie">
						🍪
					</span>
				</div>

				<p className="text-sm leading-relaxed text-muted-foreground">
					<Trans>
						We and our partners use cookies to analyze site traffic, personalize
						content, and serve relevant advertisements (such as Google AdSense).
						By clicking "Accept All", you agree to our use of cookies as
						detailed in our{" "}
						<Link
							className="link underline font-medium hover:text-link-hover"
							search={defaultSearchParams}
							to="/$lang/privacy-policy"
							onClick={scrollPageToTop}
							params={{ lang }}
						>
							Privacy Policy
						</Link>
						.
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
					>
						<Trans>Accept All</Trans>
					</button>
				</div>
			</div>
		</div>
	);
}
