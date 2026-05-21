import posthog from "posthog-js";
import { PostHogProvider as BasePostHogProvider } from "@posthog/react";

const isDev = import.meta.env.DEV;

if (
	typeof window !== "undefined" &&
	import.meta.env.VITE_POSTHOG_KEY &&
	!isDev
) {
	posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
		api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
		person_profiles: "identified_only",
		capture_pageview: false,
		defaults: "2025-11-30",
	});
}

export default function PostHogProvider({ children }: React.PropsWithChildren) {
	return isDev ? (
		children
	) : (
		<BasePostHogProvider client={posthog}>{children}</BasePostHogProvider>
	);
}
