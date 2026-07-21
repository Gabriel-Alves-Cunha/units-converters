import { Trans } from "@lingui/react/macro";
import { Link, useParams } from "@tanstack/react-router";

import {
	amazonSearchUrl,
	isAmazonAssociatesConfigured,
} from "#/lib/affiliates";
import { defaultSearchParams } from "#/lib/global-params-params";
import { scrollPageToTop } from "#/lib/utils";

interface AffiliateCtaProps {
	/** Search terms for Amazon (e.g. "kitchen scale grams") */
	searchQuery: string;
	heading?: string | undefined;
}

/**
 * Optional Amazon Associates CTA for guide pages.
 * Hidden until VITE_AMAZON_ASSOCIATE_TAG is set. Includes disclosure link.
 */
export function AffiliateCta({ searchQuery, heading }: AffiliateCtaProps) {
	const { lang } = useParams({ from: "/$lang" });
	const href = amazonSearchUrl(searchQuery);

	if (!isAmazonAssociatesConfigured() || !href) {
		return null;
	}

	return (
		<aside className="space-y-2 rounded-lg border border-border/60 bg-muted/20 p-4 text-sm">
			{heading ? (
				<p className="font-medium text-foreground">{heading}</p>
			) : (
				<p className="font-medium text-foreground">
					<Trans>Helpful tools</Trans>
				</p>
			)}

			<p className="text-muted-foreground">
				<Trans>
					Looking for a physical tool that matches this guide? Search Amazon for
					related measuring equipment. We may earn a commission at no extra cost
					to you.
				</Trans>
			</p>

			<p>
				<a
					href={href}
					className="link underline font-medium"
					target="_blank"
					rel="noopener noreferrer sponsored"
				>
					<Trans>Browse related tools on Amazon</Trans>
				</a>
			</p>

			<p className="text-xs text-muted-foreground">
				<Trans>
					Affiliate disclosure: see our{" "}
					<Link
						params={{ lang }}
						search={defaultSearchParams}
						to="/$lang/disclaimer"
						onClick={scrollPageToTop}
						className="link underline"
					>
						Disclaimer
					</Link>
					.
				</Trans>
			</p>
		</aside>
	);
}
