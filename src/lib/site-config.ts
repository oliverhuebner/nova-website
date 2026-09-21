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
		title: "Smart Money Nova — Free Financial Consultation",
		titleTemplate: "%s · Smart Money Nova",
		description:
			"Get personalized guidance on budgeting, saving, and building better money habits. Request your free financial consultation with Smart Money Nova.",
	},

	hero: {
		eyebrow: "Financial education",
		headline: "Take control of your money with a free consultation",
		subheadline:
			"Get personalized guidance on budgeting, saving, and building better money habits. Enter your email to request your free consultation — no cost, no obligation.",
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
	 * deadline — an expired timer reads as "this offer is gone".
	 */
	countdown: {
		enabled: false,
		deadline: "",
		label: "UNTIL APPLICATIONS CLOSE",
	},

	benefits: [
		{
			id: "budget",
			title: "Build a budget that works for you",
			body: "Understand where your money actually goes each month and set up a system you can stick with.",
		},
		{
			id: "save",
			title: "Build stronger savings habits",
			body: "Work through practical ways to prepare for emergencies and put money toward longer-term goals.",
		},
		{
			id: "learn",
			title: "Improve your financial knowledge",
			body: "Learn the concepts behind the advice so you can make informed decisions on your own.",
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
			body: "We talk through your goals and you walk away with concrete actions to take.",
		},
	],

	about: {
		heading: "About Smart Money Nova",
		body: [
			"Smart Money Nova is a financial education service. We help people who feel behind on money get a clear, jargon-free picture of where they stand and what to do next.",
			"Your consultation is a conversation, not a sales pitch. We'll ask about your situation and your goals, then walk through the budgeting and saving strategies that actually apply to you.",
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

	footerLinks: [
		{ id: "about", label: "About", href: "/#about" },
		{ id: "contact", label: "Contact", href: "/contact" },
		{ id: "privacy", label: "Privacy Policy", href: "/privacy" },
	],
};

export type SiteConfig = typeof siteConfig;
