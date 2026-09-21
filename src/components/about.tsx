import Link from "next/link";

import { siteConfig } from "~/lib/site-config";

export default function About() {
	const { about, dataUse, contactEmail } = siteConfig;

	return (
		<section
			id="about"
			className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col gap-8"
		>
			<div className="flex flex-col gap-4">
				<h2 className="text-2xl font-semibold">{about.heading}</h2>
				{about.body.map((paragraph) => (
					<p
						key={paragraph.slice(0, 32)}
						className="text-muted-foreground text-pretty"
					>
						{paragraph}
					</p>
				))}
				{about.founder.name && (
					<div className="rounded-xl border border-border p-5 flex flex-col gap-1">
						<p className="font-semibold text-foreground">
							{about.founder.name}
						</p>
						<p className="text-sm text-seaweed">{about.founder.role}</p>
						<p className="text-sm text-muted-foreground text-pretty">
							{about.founder.bio}
						</p>
					</div>
				)}
			</div>

			<div className="flex flex-col gap-2 rounded-xl border border-border p-5">
				<h3 className="font-semibold text-foreground">{dataUse.heading}</h3>
				<p className="text-sm text-muted-foreground text-pretty">
					{dataUse.body} Read our{" "}
					<Link href="/privacy" className="underline hover:text-foreground">
						privacy policy
					</Link>{" "}
					or email us at{" "}
					<a
						href={`mailto:${contactEmail}`}
						className="underline hover:text-foreground"
					>
						{contactEmail}
					</a>
					.
				</p>
			</div>
		</section>
	);
}
