export type ConsentStatus = "accepted" | "declined" | null;

export const CONSENT_STORAGE_KEY = "cookie-consent";

type ConsentListener = (status: ConsentStatus) => void;

const listeners = new Set<ConsentListener>();

let bannerOpen = false;
const bannerListeners = new Set<(open: boolean) => void>();

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		adsbygoogle?: unknown[];
	}
}

function readStoredConsent(): ConsentStatus {
	if (typeof window === "undefined") {
		return null;
	}

	const value = localStorage.getItem(CONSENT_STORAGE_KEY);

	if (value === "accepted" || value === "declined") {
		return value;
	}

	return null;
}

export function getConsentStatus(): ConsentStatus {
	return readStoredConsent();
}

export function subscribeConsent(listener: ConsentListener): () => void {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function subscribeBannerOpen(
	listener: (open: boolean) => void,
): () => void {
	bannerListeners.add(listener);
	return () => {
		bannerListeners.delete(listener);
	};
}

export function isConsentBannerOpen(): boolean {
	return bannerOpen;
}

export function openConsentBanner(): void {
	bannerOpen = true;
	for (const listener of bannerListeners) {
		listener(true);
	}
}

export function closeConsentBanner(): void {
	bannerOpen = false;
	for (const listener of bannerListeners) {
		listener(false);
	}
}

function notifyConsent(status: ConsentStatus): void {
	for (const listener of listeners) {
		listener(status);
	}
}

/** Ensure gtag/dataLayer exist. Defaults are set inline in __root.tsx <head>. */
export function initConsentModeDefaults(): void {
	if (typeof window === "undefined") {
		return;
	}

	window.dataLayer = window.dataLayer || [];
	window.gtag =
		window.gtag ||
		function gtag(...args: unknown[]) {
			window.dataLayer?.push(args);
		};
}

export function updateConsentMode(status: "accepted" | "declined"): void {
	if (typeof window === "undefined" || typeof window.gtag !== "function") {
		return;
	}

	const granted = status === "accepted" ? "granted" : "denied";

	window.gtag("consent", "update", {
		ad_storage: granted,
		ad_user_data: granted,
		ad_personalization: granted,
		analytics_storage: granted,
	});
}

export const ADSENSE_CLIENT_ID = "ca-pub-4889381718129009";
export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;

export function loadAdSenseScript(): void {
	if (typeof document === "undefined") {
		return;
	}

	const existing =
		document.querySelector('script[data-adsense-loaded="true"]') ||
		document.querySelector(`script[src="${ADSENSE_SCRIPT_SRC}"]`);

	if (existing) {
		return;
	}

	const script = document.createElement("script");
	script.src = ADSENSE_SCRIPT_SRC;
	script.async = true;
	script.crossOrigin = "anonymous";
	script.dataset.adsenseLoaded = "true";
	document.head.appendChild(script);
}

export function applyConsent(status: "accepted" | "declined"): void {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.setItem(CONSENT_STORAGE_KEY, status);
	updateConsentMode(status);

	if (status === "accepted") {
		loadAdSenseScript();
	}

	notifyConsent(status);
	closeConsentBanner();
}

export function hydrateConsentFromStorage(): ConsentStatus {
	initConsentModeDefaults();

	const status = readStoredConsent();

	if (status === "accepted") {
		updateConsentMode("accepted");
		loadAdSenseScript();
	} else if (status === "declined") {
		updateConsentMode("declined");
	}

	return status;
}
