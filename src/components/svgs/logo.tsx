import type { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Nova"
			role="img"
			{...props}
		>
			<rect width="48" height="48" rx="14" fill="var(--seaweed)" />
			<text
				x="24"
				y="25"
				textAnchor="middle"
				dominantBaseline="central"
				fill="var(--seaweed-foreground)"
				fontSize="26"
				fontWeight="600"
				style={{
					fontFamily:
						"var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif",
				}}
			>
				N
			</text>
		</svg>
	);
}
