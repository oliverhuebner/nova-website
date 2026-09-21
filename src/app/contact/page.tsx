import type { Metadata } from "next";

import PageShell from "~/components/page-shell";
import { siteConfig } from "~/lib/site-config";

export const metadata: Metadata = {
	title: "Contact",
	description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
	return (
		<PageShell title="Contact">
			<p>
				Have a question before you request a consultation? We&rsquo;d rather
				answer it than have you guess.
			</p>
			<p>
				Email us at{" "}
				<a href={`mailto:${siteConfig.contactEmail}`}>
					{siteConfig.contactEmail}
				</a>{" "}
				and we&rsquo;ll get back to you within two business days.
			</p>

			<h2>Common questions</h2>

			<h3>Is the consultation really free?</h3>
			<p>
				Yes. There is no cost and no obligation, and we don&rsquo;t ask for
				payment details to book one.
			</p>

			<h3>What happens on the call?</h3>
			<p>
				We ask what you&rsquo;re currently holding and what you want it to do,
				then talk through which strategies fit &mdash; covered calls,
				tax-loss harvesting, T-bills and bonds, or reading charts. You leave
				with concrete next steps.
			</p>

			<h3>Will you sell my email address?</h3>
			<p>
				No. See our <a href="/privacy">privacy policy</a> for exactly what we do
				with it.
			</p>
		</PageShell>
	);
}
