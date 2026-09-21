import { ImageResponse } from "next/og";

import { siteConfig } from "~/lib/site-config";

export const alt = siteConfig.meta.title;
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					background: "#ffffff",
					padding: 80,
					gap: 28,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 20,
					}}
				>
					<div
						style={{
							width: 72,
							height: 72,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							background: "#2a684e",
							borderRadius: 22,
							color: "#eff7f3",
							fontSize: 40,
							fontWeight: 600,
						}}
					>
						N
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 44,
							fontWeight: 700,
							color: "#141414",
						}}
					>
						{siteConfig.name}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 56,
						fontWeight: 700,
						color: "#141414",
						maxWidth: 900,
						textAlign: "center",
						lineHeight: 1.2,
					}}
				>
					{siteConfig.hero.headline}
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 28,
						color: "#666666",
						maxWidth: 820,
						textAlign: "center",
					}}
				>
					Personalized guidance on budgeting, saving, and building better money
					habits.
				</div>
			</div>
		),
		{ ...size },
	);
}
