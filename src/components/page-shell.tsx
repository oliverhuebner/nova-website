import Link from "next/link";

import Footer from "~/components/footer";
import { Logo } from "~/components/svgs";
import { siteConfig } from "~/lib/site-config";

/**
 * Layout for the secondary text pages. The article element carries the type
 * styles because the Tailwind typography plugin isn't installed here.
 */
export default function PageShell({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<main className="mx-auto w-full h-full flex-1 flex flex-col">
			<div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 flex flex-col gap-8">
				<Link
					href="/"
					className="flex items-center gap-3 self-start text-sm font-semibold tracking-tight hover:opacity-80"
				>
					<Logo className="h-8 w-8" />
					{siteConfig.name}
				</Link>

				<h1 className="text-3xl font-bold tracking-tight">{title}</h1>

				<article
					className="flex flex-col gap-4 text-muted-foreground text-pretty
						[&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground
						[&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground
						[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5
						[&_a]:underline [&_a]:hover:text-foreground"
				>
					{children}
				</article>
			</div>
			<Footer />
		</main>
	);
}
