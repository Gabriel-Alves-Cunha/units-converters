import { useEffect, useRef, useState } from "react";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/core/macro";

import {
	ADSENSE_CLIENT_ID,
	getConsentStatus,
	subscribeConsent,
	type ConsentStatus,
} from "#/features/consent/consent-store";
import { cn } from "#/lib/utils";

interface AdSlotProps {
	slot: string;
	format?: "auto" | "rectangle" | "horizontal" | "vertical";
	className?: string | undefined;
	/** Accessible label for the ad region — defaults to translated "Advertisement" */
	label?: string | undefined;
}

/**
 * Renders a Google AdSense unit only after the user has accepted cookies.
 * Uses Auto Ads–compatible responsive format when slot is a placeholder
 * until real ad unit IDs are created in AdSense.
 */
export function AdSlot({
	slot,
	format = "auto",
	className,
	label,
}: AdSlotProps) {
	const { i18n } = useLingui();
	const [consent, setConsent] = useState<ConsentStatus>(null);
	const pushedRef = useRef(false);
	const resolvedLabel = label ?? i18n._(msg`Advertisement`);

	useEffect(() => {
		setConsent(getConsentStatus());
		return subscribeConsent(setConsent);
	}, []);

	useEffect(() => {
		if (consent !== "accepted" || pushedRef.current) {
			return;
		}

		try {
			window.adsbygoogle = window.adsbygoogle || [];
			window.adsbygoogle.push({});
			pushedRef.current = true;
		} catch {
			// AdSense may throw if the script is still loading; ignore.
		}
	}, [consent, slot]);

	if (consent !== "accepted") {
		return null;
	}

	return (
		<aside
			className={cn(
				"ad-slot w-full min-h-[90px] overflow-hidden rounded-lg border border-border/60 bg-muted/30",
				className,
			)}
			aria-label={resolvedLabel}
			data-ad-slot={slot}
		>
			<ins
				className="adsbygoogle"
				style={{ display: "block" }}
				data-ad-client={ADSENSE_CLIENT_ID}
				data-ad-slot={slot}
				data-ad-format={format}
				data-full-width-responsive="true"
			/>
		</aside>
	);
}
