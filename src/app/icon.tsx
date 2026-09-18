import { ImageResponse } from "next/og";

export const size = {
	width: 48,
	height: 48,
};

export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: "#2a684e",
					borderRadius: 14,
					color: "#eff7f3",
					fontSize: 26,
					fontWeight: 600,
				}}
			>
				N
			</div>
		),
		{ ...size },
	);
}
