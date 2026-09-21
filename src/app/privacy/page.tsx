import type { Metadata } from "next";

import PageShell from "~/components/page-shell";
import { siteConfig } from "~/lib/site-config";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
};

export default function PrivacyPage() {
	return (
		<PageShell title="Privacy Policy">
			<p className="text-sm text-muted-foreground">
				Last updated {siteConfig.privacyUpdated}
			</p>

			<h2>What we collect</h2>
			<p>
				When you request a consultation we collect the email address you submit.
				Like most websites, we also receive standard technical information such
				as your IP address, browser type, and the pages you visit.
			</p>

			<h2>How we use it</h2>
			<ul>
				<li>To confirm your request and schedule your consultation.</li>
				<li>
					To send occasional financial education emails. Every one of them
					includes an unsubscribe link.
				</li>
				<li>To measure how well our advertising and website are working.</li>
			</ul>

			<h2>Who we share it with</h2>
			<p>
				We do not sell your personal information. We share it only with the
				service providers that make this site work: Notion (where signups are
				stored), our email provider, and our hosting provider. We also use
				advertising and analytics pixels from Meta and Reddit, which receive
				information about your visit in order to measure ad performance.
			</p>

			<h2>Cookies and tracking</h2>
			<p>
				This site uses cookies and tracking pixels for analytics and advertising
				measurement. You can block or delete cookies in your browser settings,
				though some parts of the site may not work as expected if you do.
			</p>

			<h2>Your choices</h2>
			<p>
				You can unsubscribe from our emails at any time, and you can ask us to
				delete the information we hold about you by emailing{" "}
				<a href={`mailto:${siteConfig.contactEmail}`}>
					{siteConfig.contactEmail}
				</a>
				. We will respond within 30 days.
			</p>

			<h2>Not financial advice</h2>
			<p>
				{siteConfig.name} provides financial education. Nothing on this site or
				in a consultation is personalized investment, tax, or legal advice, and
				we are not acting as your fiduciary. Consider consulting a licensed
				professional before making significant financial decisions.
			</p>

			<h2>Contact</h2>
			<p>
				Questions about this policy? Email{" "}
				<a href={`mailto:${siteConfig.contactEmail}`}>
					{siteConfig.contactEmail}
				</a>
				.
			</p>
		</PageShell>
	);
}
