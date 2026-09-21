import { siteConfig } from "~/lib/site-config";

export default function HowItWorks() {
	return (
		<section
			id="how-it-works"
			className="w-full max-w-4xl mx-auto px-4 py-16 flex flex-col gap-8"
		>
			<h2 className="text-2xl font-semibold text-center">
				What happens after you sign up
			</h2>
			<ol className="grid gap-6 sm:grid-cols-3">
				{siteConfig.steps.map((step, index) => (
					<li key={step.id} className="flex flex-col gap-2">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-seaweed text-seaweed-foreground text-sm font-semibold">
							{index + 1}
						</span>
						<h3 className="font-semibold text-foreground">{step.title}</h3>
						<p className="text-sm text-muted-foreground text-pretty">
							{step.body}
						</p>
					</li>
				))}
			</ol>
		</section>
	);
}
