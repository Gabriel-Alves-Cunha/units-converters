import { Link, useParams } from "@tanstack/react-router";

import { defaultSearchParams } from "#/lib/global-params-params";

export function Footer() {
	const { lang } = useParams({ from: "/$lang" });

	return (
		<footer className="flex h-20 w-full items-center justify-center gap-6 converter-full bg-muted text-sm">
			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/$lang/privacy-policy"
				params={{ lang }}
			>
				Privacy Policy
			</Link>

			<p className="">
				&copy; {new Date().getFullYear()} Units Converters. All rights reserved.
			</p>
		</footer>
	);
}
