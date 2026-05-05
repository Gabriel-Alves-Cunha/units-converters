/// <reference types="vite/client" />

import type { BrowserClerk } from "@clerk/clerk-react";

declare global {
	interface Window {
		Clerk: BrowserClerk;
	}
}
