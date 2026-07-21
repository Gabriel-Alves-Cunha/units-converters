/**
 * Media.net site ID for contextual ads (AdSense-like backup).
 * Leave unset until approved — the slot component no-ops without it.
 */
export const MEDIANET_SITE_ID = import.meta.env.VITE_MEDIANET_SITE_ID as
	| string
	| undefined;

export function isMediaNetConfigured(): boolean {
	return Boolean(MEDIANET_SITE_ID && MEDIANET_SITE_ID.length > 0);
}
