"use client";

import { useState } from "react";

import { siteConfig } from "~/lib/site-config";
import Countdown from "./countdown";
import Form from "./form";
import People from "./people";
import { Logo } from "./svgs";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
	const [isSuccess, setIsSuccess] = useState(false);
	const { hero, form, countdown } = siteConfig;

	return (
		<section className="flex flex-col items-center justify-center gap-6 px-4 pt-16">
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex items-center gap-3">
					<Logo className="h-10 w-10" />
					<span className="text-lg font-semibold tracking-tight">
						{siteConfig.name}
					</span>
				</div>
				<div className="flex items-center gap-3 rounded-full border border-border px-4 py-1">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seaweed opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-seaweed" />
					</span>
					<p className="uppercase text-xs font-medium tracking-wider">
						{hero.eyebrow}
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-3 max-w-2xl">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center text-balance">
					{isSuccess ? hero.successHeadline : hero.headline}
				</h1>
				<p className="text-base text-muted-foreground text-center max-w-lg text-pretty">
					{isSuccess ? hero.successBody : hero.subheadline}
				</p>
			</div>

			<div className="flex flex-col items-center justify-center gap-3 w-full max-w-md">
				<Form onSuccessChange={setIsSuccess} />
				{!isSuccess && (
					<p className="text-xs text-muted-foreground text-center text-pretty">
						{form.reassurance}
					</p>
				)}
			</div>

			<People count={waitlistPeople} />

			{countdown.enabled && countdown.deadline && (
				<Countdown
					period={new Date(countdown.deadline)}
					label={countdown.label}
				/>
			)}
		</section>
	);
}
