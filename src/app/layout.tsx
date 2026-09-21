import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

import "./globals.css";
import { META_PIXEL_ID } from "~/lib/meta-pixel";
import { siteConfig } from "~/lib/site-config";
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

const { title, description } = siteConfig.meta;

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: title,
		template: siteConfig.meta.titleTemplate,
	},
	description,
	applicationName: siteConfig.name,
	openGraph: {
		title,
		description,
		siteName: siteConfig.name,
		url: siteConfig.url,
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
				<Script id="meta-pixel" strategy="beforeInteractive">
					{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
				</Script>
			</head>
			<body
				className={`${interTight.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
			>
				<noscript>
					<img
						alt=""
						height="1"
						width="1"
						style={{ display: "none" }}
						src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
					/>
				</noscript>
				<ThemeProvider>
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
