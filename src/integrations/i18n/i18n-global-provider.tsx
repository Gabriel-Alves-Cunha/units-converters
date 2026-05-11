import type { I18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

export function I18nGlobalProvider({
	children,
	i18n,
}: React.PropsWithChildren<{ i18n: I18n }>) {
	return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
