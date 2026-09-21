"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { siteConfig } from "~/lib/site-config";

interface PeopleProps {
	count: number;
	className?: string;
}

/**
 * Counts up to the live Notion row count. Hidden entirely below
 * `socialProof.minimumCount` so the page never advertises a number that
 * isn't real or isn't yet persuasive.
 */
export default function People({ count, className = "" }: PeopleProps) {
	const [displayCount, setDisplayCount] = useState(0);

	useEffect(() => {
		let startTime: number | undefined;
		let requestId: number;
		const duration = 1200;

		const animateCount = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easeOutQuart = 1 - (1 - progress) ** 4;

			setDisplayCount(Math.floor(easeOutQuart * count));

			if (progress < 1) {
				requestId = requestAnimationFrame(animateCount);
			}
		};

		requestId = requestAnimationFrame(animateCount);

		return () => cancelAnimationFrame(requestId);
	}, [count]);

	if (count < siteConfig.socialProof.minimumCount) {
		return null;
	}

	return (
		<motion.p
			className={`flex items-center justify-center gap-2 text-sm text-muted-foreground ${className}`}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<span className="font-semibold text-foreground">
				{displayCount.toLocaleString()}
			</span>
			{siteConfig.socialProof.suffix}
		</motion.p>
	);
}
