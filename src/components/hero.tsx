"use client";

import { useState } from "react";

import Countdown from "./countdown";
import People from "./people";
import { Logo } from "./svgs";
import Form from "./form";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
	const [isSuccess, setIsSuccess] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center gap-6 pt-16">
			<div className="flex flex-col items-center justify-center gap-6 mb-6">
				<Logo />
				<div className="flex items-center gap-4 rounded-full border border-border px-4 py-1 relative">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seaweed opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-seaweed" />
					</span>
					<p className="uppercase text-sm font-medium">
						Only available now
					</p>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
				<h2 className="text-4xl font-bold text-foreground">
					{isSuccess ? "You're on the waitlist" : "Receive your free consultation"}
				</h2>
				<p className="text-base text-muted-foreground text-center max-w-md">
					{isSuccess
						? "You've successfully secured your spot.We’ll hit you up the moment it’s your turn to dive in"
						: "Learn advanced financial literacy skills to better manage your money."}
				</p>
			</div>
			<div className="flex flex-col items-center justify-center gap-2 w-full max-w-md">
				<Form onSuccessChange={setIsSuccess} />
			</div>
			<div className="flex items-center justify-center gap-2">
				<People count={waitlistPeople} />
			</div>
			<Countdown
				period={new Date("2026-09-21T17:30:00-04:00")}
				label="UNTIL OFFER EXPIRES"
			/>
		</div>
	);
}
