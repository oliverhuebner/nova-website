"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

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

			const notionRes = await fetch("/api/notion", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!notionRes.ok) {
				const errData = await notionRes.json();
				if (notionRes.status === 409) {
					toast.error(errData.error || "You're already on the waitlist!");
					return;
				}
				const err = notionRes.status === 429 ? "Rate limited" : "Notion failed";
				throw new Error(err);
			}

			toast.success("Congrats! You've successfully signed up.");
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
						Join with another email
					</button>
				</motion.div>
			) : (
				<form onSubmit={handleSubmit} className="relative">
					<div className="flex relative">
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
							placeholder="Email"
							className="flex-grow bg-background border border-border text-foreground px-4 py-3 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-seaweed focus:ring-offset-2"
							disabled={loading}
							required
						/>
						<button
							type="submit"
							className="absolute right-0 top-0 bottom-0 bg-seaweed text-seaweed-foreground px-5 py-2 m-2 rounded-[12px] font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
							disabled={loading}
						>
							{loading ? "Joining..." : "Join"}
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
