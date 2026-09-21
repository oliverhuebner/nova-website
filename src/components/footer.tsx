import Link from "next/link";

import { siteConfig } from "~/lib/site-config";

export default function Footer() {
	return (
		<footer className="mt-auto border-t border-border">
			<div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between">
				<p className="text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} {siteConfig.name}. All rights
					reserved.
				</p>
				<nav className="flex items-center gap-5">
					{siteConfig.footerLinks.map((link) => (
						<Link
							key={link.id}
							href={link.href}
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
				</nav>
			</div>
		</footer>
	);
}
