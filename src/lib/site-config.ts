/**
 * Single source of truth for landing page copy and offer configuration.
 *
 * The page is built around one offer: a free financial consultation. Headline,
 * button label and confirmation copy all have to keep describing that same
 * thing, so they live together here.
 */
export const siteConfig = {
	name: "Smart Money Nova",
	shortName: "Nova",
	url: "https://smartmoneynova.com",
	contactEmail: "hello@smartmoneynova.com",
	/** Bump by hand when the privacy policy actually changes. */
	privacyUpdated: "September 2026",

	meta: {
		title: "Smart Money Nova: Make Your Money Earn More Money",
		titleTemplate: "%s · Smart Money Nova",
		description:
			"Covered calls, tax-loss harvesting, T-bills and bonds, technical analysis, walked through one-on-one. Request your free consultation with Smart Money Nova.",
	},

	hero: {
		eyebrow: "Financial education",
		headline: "Make your money earn more money",
		subheadline:
			"Covered calls, tax-loss harvesting, T-bills and bonds, technical analysis, walked through one-on-one in plain English. Enter your email to request your free consultation.",
		successHeadline: "Your consultation request is in",
		successBody:
			"Check your inbox for a confirmation email. We'll follow up within two business days to schedule a time that works for you.",
	},

	form: {
		label: "Your email address",
		placeholder: "you@example.com",
		cta: "Request my free consultation",
		ctaLoading: "Sending...",
		reassurance:
			"Free to request. No obligation, no payment details, and you can unsubscribe at any time.",
	},

	socialProof: {
		/**
		 * Only rendered once the real subscriber count clears this threshold, so
		 * an early-stage page never shows a discouraging or invented number.
		 */
		minimumCount: 50,
		suffix: "people have requested a consultation",
	},

	/**
	 * The countdown is intentionally off. Turn it back on only for a real
	 * deadline. An expired timer reads as "this offer is gone".
	 */
	countdown: {
		enabled: false,
		deadline: "",
		label: "UNTIL APPLICATIONS CLOSE",
	},

	/**
	 * These four have to keep matching the ad creative that sends paid traffic
	 * here. A visitor who clicked for covered calls and lands on budgeting tips
	 * reads the page as a bait and switch and leaves.
	 */
	benefits: [
		{
			id: "covered-calls",
			title: "Covered calls",
			body: "Turn stock you already own into recurring income, and understand exactly what you give up in exchange for it.",
		},
		{
			id: "tax-loss-harvesting",
			title: "Tax-loss harvesting",
			body: "Put your losing positions to work against your tax bill without changing what your portfolio is actually holding.",
		},
		{
			id: "tbills-bonds",
			title: "T-Bills & bonds",
			body: "Stop leaving idle cash in a checking account when government-backed instruments are paying real yield.",
		},
		{
			id: "technical-analysis",
			title: "Technical analysis",
			body: "Read a chart well enough to enter and exit on a plan instead of a gut feeling, and know what charts can't tell you.",
		},
	],

	steps: [
		{
			id: "request",
			title: "Share your email",
			body: "That's the whole form. No phone number, no payment details.",
		},
		{
			id: "schedule",
			title: "We reach out to schedule",
			body: "You'll hear from us within two business days to pick a time for your consultation.",
		},
		{
			id: "plan",
			title: "Leave with clear next steps",
			body: "We talk through which strategies fit what you're actually holding, and you walk away knowing what to do first.",
		},
	],

	about: {
		heading: "About Smart Money Nova",
		body: [
			"Smart Money Nova is a financial education service. We teach the strategies that usually stay behind a wealth manager's door: how covered calls generate income, how tax-loss harvesting lowers a tax bill, when T-bills beat a savings account, and what a chart can and can't tell you.",
			"Your consultation is a conversation, not a sales pitch. We'll ask what you're holding and what you're trying to do with it, then walk through which of these strategies apply to you and which ones don't.",
		],
		/**
		 * Replace with real names and credentials before driving paid traffic.
		 * Personal finance pages need a real person behind them to be credible.
		 */
		founder: {
			name: "",
			role: "",
			bio: "",
		},
	},

	dataUse: {
		heading: "What happens to your email",
		body: "We use your email address to confirm your request and schedule your consultation. We may also send occasional financial education emails, which you can opt out of in one click. We don't sell or share your address with third parties.",
	},

	/**
	 * Has to stay visible on any page paid traffic can land on. The strategies
	 * above are the kind Meta's financial services policy looks at closely, and
	 * an education service naming them owes the reader this line.
	 */
	disclaimer:
		"Smart Money Nova provides financial education, not personalized investment, tax, or legal advice. Investing involves risk, including possible loss of principal. Past performance does not guarantee future results.",

	footerLinks: [
		{ id: "about", label: "About", href: "/#about" },
		{ id: "contact", label: "Contact", href: "/contact" },
		{ id: "privacy", label: "Privacy Policy", href: "/privacy" },
	],
};

export type SiteConfig = typeof siteConfig;
