/// <reference types="vite/client" />

import type { BrowserClerk } from "@clerk/clerk-react";
import "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			bdt: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}

declare global {
	interface Window {
		Clerk: BrowserClerk;
	}
}
