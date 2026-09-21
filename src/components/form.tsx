"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

import { newEventId, trackPixelEvent } from "~/lib/meta-pixel";
import { siteConfig } from "~/lib/site-config";

interface FormProps {
	onSuccessChange?: (success: boolean) => void;
}

export default function WaitlistForm({ onSuccessChange }: FormProps) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const isValidEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!email || !isValidEmail(email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		try {
			setLoading(true);

			// Shared with the server-side Conversions API event so Meta counts
			// the two copies of this Lead as one.
			const eventId = newEventId();

			const notionRes = await fetch("/api/notion", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, eventId }),
			});

			// An address we already have isn't a failure the visitor can act on, so
			// they get the same confirmation as everyone else. No Lead fires: Meta
			// already counted this person the first time round.
			if (notionRes.status === 409) {
				toast.success("You're already on the list — we'll be in touch soon.");
				setSuccess(true);
				onSuccessChange?.(true);
				setEmail("");
				return;
			}

			if (!notionRes.ok) {
				const err = notionRes.status === 429 ? "Rate limited" : "Notion failed";
				throw new Error(err);
			}

			trackPixelEvent("Lead", { content_name: "Consultation Request" }, eventId);

			toast.success("Request received. Check your inbox for a confirmation.");
			setSuccess(true);
			onSuccessChange?.(true);

			setTimeout(() => {
				confetti({
					particleCount: 120,
					spread: 80,
					origin: { y: 0.6 },
					colors: [
						"#6EE7B7",
						"#34D399",
						"#A7F3D0",
						"#5EEAD4",
						"#99F6E4",
						"#D1FAE5",
					],
				});
			}, 150);

			setEmail("");
		} catch (error: unknown) {
			if (error instanceof Error) {
				const msg =
					error.message === "Rate limited"
						? "Too many attempts. Try again later."
						: "Something went wrong. Try again.";
				toast.error(msg);
			}
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setEmail("");
		setSuccess(false);
		onSuccessChange?.(false);
	};

	return (
		<div className="w-full relative">
			{success ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center"
				>
					<button
						type="button"
						onClick={resetForm}
						className="text-sm text-muted-foreground underline"
					>
						Use a different email
					</button>
				</motion.div>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col gap-2">
					<label
						htmlFor="email"
						className="text-sm font-medium text-foreground"
					>
						{siteConfig.form.label}
					</label>
					<input
						id="email"
						type="email"
						name="email"
						autoComplete="email"
						value={email}
						onChange={handleChange}
						placeholder={siteConfig.form.placeholder}
						className="w-full bg-background border border-border text-foreground px-4 py-3 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-seaweed focus:ring-offset-2"
						disabled={loading}
						required
					/>
					<button
						type="submit"
						className="w-full bg-seaweed text-seaweed-foreground px-5 py-3 rounded-[12px] font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
						disabled={loading}
					>
						{loading ? siteConfig.form.ctaLoading : siteConfig.form.cta}
					</button>
				</form>
			)}
		</div>
	);
}
