import { useEffect, useState, type PropsWithChildren } from "react";
import posthog from "posthog-js";
import { PostHogProvider as BasePostHogProvider } from "@posthog/react";

import {
	getConsentStatus,
	subscribeConsent,
	type ConsentStatus,
} from "#/features/consent/consent-store";

const isDev = import.meta.env.DEV;
let posthogInitialized = false;

function ensurePostHogInitialized(): void {
	if (
		posthogInitialized ||
		typeof window === "undefined" ||
		!import.meta.env.VITE_POSTHOG_KEY ||
		isDev
	) {
		return;
	}

	posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
		api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
		person_profiles: "identified_only",
		capture_pageview: false,
		defaults: "2025-11-30",
	});
	posthogInitialized = true;
}

export default function PostHogProvider({ children }: PropsWithChildren) {
	const [consent, setConsent] = useState<ConsentStatus>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const status = getConsentStatus();
		setConsent(status);

		if (status === "accepted") {
			ensurePostHogInitialized();
			setReady(true);
		}

		return subscribeConsent((next) => {
			setConsent(next);

			if (next === "accepted") {
				ensurePostHogInitialized();
				posthog.opt_in_capturing?.();
				setReady(true);
			} else if (next === "declined" && posthogInitialized) {
				posthog.opt_out_capturing?.();
			}
		});
	}, []);

	if (isDev || !import.meta.env.VITE_POSTHOG_KEY) {
		return children;
	}

	if (consent !== "accepted" || !ready || !posthogInitialized) {
		return children;
	}

	return <BasePostHogProvider client={posthog}>{children}</BasePostHogProvider>;
}
