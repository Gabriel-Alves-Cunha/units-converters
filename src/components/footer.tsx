import { defaultSearchParams } from "#/lib/global-params-params";
import { Link } from "@tanstack/react-router";

export function Footer() {
	return (
		<footer className="flex h-20 w-full items-center justify-center gap-6 converter-full bg-muted text-sm">
			<Link
				search={defaultSearchParams}
				className="link underline"
				to="/privacy-policy"
			>
				Privacy Policy
			</Link>

			<p className="">
				&copy; {new Date().getFullYear()} Units Converters. All rights reserved.
			</p>
		</footer>
	);
}
