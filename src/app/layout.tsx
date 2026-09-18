import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "~/providers/theme-provider";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const interTight = Inter_Tight({
	variable: "--font-inter-tight",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const title = "nova";
const description =
	"Learn advanced financial literacy skills to better manage your money.";

export const metadata: Metadata = {
	title,
	description,
	applicationName: "Nova",
	openGraph: {
		title,
		description,
		siteName: "Nova",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<head>
				<Script id="reddit-pixel" strategy="beforeInteractive">
					{`!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js?pixel_id=a2_jpbnqzt2ww6x",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_jpbnqzt2ww6x');rdt('track','PageVisit');`}
				</Script>
			</head>
			<body
				className={`${interTight.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
			>
				<ThemeProvider>
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
