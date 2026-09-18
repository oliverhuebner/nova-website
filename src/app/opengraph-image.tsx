import { ImageResponse } from "next/og";

export const alt = "nova";
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
					gap: 28,
				}}
			>
				<div
					style={{
						width: 96,
						height: 96,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "#2a684e",
						borderRadius: 28,
						color: "#eff7f3",
						fontSize: 52,
						fontWeight: 600,
					}}
				>
					N
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 64,
						fontWeight: 700,
						color: "#141414",
					}}
				>
					nova
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 28,
						color: "#666666",
						maxWidth: 720,
						textAlign: "center",
					}}
				>
					Learn advanced financial literacy skills to better manage your
					money.
				</div>
			</div>
		),
		{ ...size },
	);
}
