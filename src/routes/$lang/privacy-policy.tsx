import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/privacy-policy")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="converter-content">Hello "/privacy-policy"! TBD</div>;
}
