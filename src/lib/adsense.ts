import { ADSENSE_CLIENT_ID } from "#/features/consent/consent-store";

/**
 * AdSense display unit IDs. Set real IDs in env after creating units in AdSense.
 * Placeholders keep the layout stable until approval.
 */
export const ADSENSE_SLOTS = {
	guide: import.meta.env.VITE_ADSENSE_SLOT_GUIDE || "1234567890",
	category: import.meta.env.VITE_ADSENSE_SLOT_CATEGORY || "1234567891",
	conversionDetails:
		import.meta.env.VITE_ADSENSE_SLOT_CONVERSION_DETAILS || "1234567892",
	convert: import.meta.env.VITE_ADSENSE_SLOT_CONVERT || "1234567893",
} as const;

export { ADSENSE_CLIENT_ID };
