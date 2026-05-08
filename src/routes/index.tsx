import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		// Redirect the user to a default high-traffic conversion page
		throw redirect({
			to: "/convert/$quantity/$from/to/$to",
			search: {
				fromValue: "1",
			},
			params: {
				quantity: "Length",
				to: "Kilometre",
				from: "Meter",
			},
		});
	},
});
