import { useEffect, useState } from "react";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";

import {
	getConsentStatus,
	subscribeConsent,
	type ConsentStatus,
} from "#/features/consent/consent-store";
import { isMediaNetConfigured, MEDIANET_SITE_ID } from "#/lib/medianet";
import { cn } from "#/lib/utils";

interface MediaNetSlotProps {
	className?: string | undefined;
	/** Accessible label — defaults to translated "Advertisement" */
	label?: string | undefined;
}

/**
 * Consent-gated Media.net placeholder. Renders only when
 * VITE_MEDIANET_SITE_ID is set and the user accepted cookies.
 * Keep this off the AdSense review surface until you intentionally switch networks.
 */
export function MediaNetSlot({ className, label }: MediaNetSlotProps) {
	const { i18n } = useLingui();
	const [consent, setConsent] = useState<ConsentStatus>(null);
	const resolvedLabel = label ?? i18n._(msg`Advertisement`);

	useEffect(() => {
		setConsent(getConsentStatus());
		return subscribeConsent(setConsent);
	}, []);

	useEffect(() => {
		if (
			consent !== "accepted" ||
			!isMediaNetConfigured() ||
			!MEDIANET_SITE_ID
		) {
			return;
		}

		if (document.querySelector('script[data-medianet-loaded="true"]')) {
			return;
		}

		const script = document.createElement("script");
		script.async = true;
		script.src = `https://contextual.media.net/nmedianet.js?cid=${encodeURIComponent(MEDIANET_SITE_ID)}`;
		script.dataset.medianetLoaded = "true";
		document.head.appendChild(script);
	}, [consent]);

	if (consent !== "accepted" || !isMediaNetConfigured()) {
		return null;
	}

	return (
		<aside
			className={cn(
				"medianet-slot w-full min-h-[90px] overflow-hidden rounded-lg border border-border/60 bg-muted/30",
				className,
			)}
			aria-label={resolvedLabel}
			data-medianet-cid={MEDIANET_SITE_ID}
		/>
	);
}
