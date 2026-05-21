import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { msg, t } from "@lingui/core/macro";
import { useState } from "react";

const supportEmail = "voyagertecnologias@gmail.com";

export function FeedbackSection() {
	const [isSending, setIsSending] = useState(false);
	const { i18n } = useLingui();

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isSending) {
			return;
		}

		const form = e.currentTarget;
		const formData = new FormData(form);

		const description = formData.get("description") as string;

		if (description.length < 10) {
			alert("Description is too short.");

			return;
		}

		try {
			setIsSending(true);

			const emailjs = await import("@emailjs/browser");

			emailjs.init("T5a1tVm8R0SAqTsCs");

			await emailjs.send("service_fno0j57", "template_07drjao", {
				description,
			});

			alert("Thanks for the feedback!");

			form.reset();
		} catch (error) {
			console.error(error);
		} finally {
			setIsSending(false);
		}
	}

	return (
		<form className="converter-content" onSubmit={handleSubmit}>
			<div className="mb-10 text-center mobile:mt-4 px-4">
				<h3 className="text-2xl font-bold text-foreground">
					<Trans>How could this website improve?</Trans>
				</h3>

				<p className="text-muted-foreground">
					<Trans>
						Describe your issue and we'll get back to you as soon as possible.
					</Trans>
				</p>

				<p className="text-xs text-muted-foreground mt-1">
					<Trans>
						Support email:{" "}
						<a className="link" href={`mailto:${supportEmail}`}>
							{supportEmail}
						</a>
					</Trans>
				</p>
			</div>

			<fieldset className="data-[invalid=true]:text-destructive gap-3 flex w-full flex-col *:w-full">
				<label
					className="text-sm font-medium w-fit gap-2 leading-snug"
					htmlFor="description"
				>
					<Trans>Description</Trans>
				</label>

				<textarea
					className="flex field-sizing-content w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 min-h-44"
					placeholder={t`Please provide as much detail as possible…`}
					disabled={isSending}
					name="description"
					id="description"
					required
				/>
			</fieldset>

			<button
				className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
				disabled={isSending}
				type="submit"
			>
				{isSending ? i18n._(msg`Sending...`) : i18n._(msg`Submit Feedback`)}
			</button>
		</form>
	);
}
