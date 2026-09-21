import { siteConfig } from "~/lib/site-config";

export default function Benefits() {
	return (
		<section
			id="what-you-get"
			className="w-full max-w-4xl mx-auto px-4 py-16 flex flex-col gap-8"
		>
			<h2 className="text-2xl font-semibold text-center">
				What you&rsquo;ll work on
			</h2>
			<ul className="grid gap-4 sm:grid-cols-2">
				{siteConfig.benefits.map((benefit) => (
					<li
						key={benefit.id}
						className="flex flex-col gap-2 rounded-xl border border-border p-5"
					>
						<h3 className="font-semibold text-foreground">{benefit.title}</h3>
						<p className="text-sm text-muted-foreground text-pretty">
							{benefit.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
