/**
 * Amazon Associates (and similar) affiliate tag.
 * Disclosure lives on the Disclaimer page; CTAs only render when configured.
 */
export const AMAZON_ASSOCIATE_TAG = import.meta.env
	.VITE_AMAZON_ASSOCIATE_TAG as string | undefined;

export function isAmazonAssociatesConfigured(): boolean {
	return Boolean(AMAZON_ASSOCIATE_TAG && AMAZON_ASSOCIATE_TAG.length > 0);
}

/** Build a search URL on Amazon.com with the associate tag. */
export function amazonSearchUrl(query: string): string | undefined {
	if (!isAmazonAssociatesConfigured() || !AMAZON_ASSOCIATE_TAG) {
		return undefined;
	}

	const params = new URLSearchParams({
		k: query,
		tag: AMAZON_ASSOCIATE_TAG,
	});

	return `https://www.amazon.com/s?${params.toString()}`;
}
