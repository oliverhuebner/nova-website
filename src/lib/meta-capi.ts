import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

import { META_PIXEL_ID } from "~/lib/meta-pixel";

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION ?? "v26.0";

type UserData = {
	em?: string[];
	client_ip_address?: string;
	client_user_agent?: string;
	fbp?: string;
	fbc?: string;
};

type CapiEvent = {
	event_name: string;
	event_time: number;
	event_id?: string;
	event_source_url?: string;
	action_source: "website";
	user_data: UserData;
	custom_data?: Record<string, unknown>;
};

function hash(value: string) {
	return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function clientIp(request: NextRequest) {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) return forwardedFor.split(",")[0].trim();
	return request.headers.get("x-real-ip")?.trim();
}

/**
 * Meta drops the click id in a `_fbc` cookie, but only after the visitor lands
 * with an `fbclid` query param, so fall back to building it from the referer.
 */
function clickId(request: NextRequest, sourceUrl?: string) {
	const cookie = request.cookies.get("_fbc")?.value;
	if (cookie) return cookie;
	if (!sourceUrl) return undefined;

	try {
		const fbclid = new URL(sourceUrl).searchParams.get("fbclid");
		return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
	} catch {
		return undefined;
	}
}

export async function sendCapiEvent(
	request: NextRequest,
	event: {
		name: string;
		email?: string;
		eventId?: string;
		sourceUrl?: string;
		customData?: Record<string, unknown>;
	},
) {
	const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

	if (!accessToken) {
		console.warn("META_CAPI_ACCESS_TOKEN is not set, skipping CAPI event");
		return;
	}

	const sourceUrl =
		event.sourceUrl ?? request.headers.get("referer") ?? undefined;

	const payload: { data: CapiEvent[]; test_event_code?: string } = {
		data: [
			{
				event_name: event.name,
				event_time: Math.floor(Date.now() / 1000),
				event_id: event.eventId,
				event_source_url: sourceUrl,
				action_source: "website",
				user_data: {
					em: event.email ? [hash(event.email)] : undefined,
					client_ip_address: clientIp(request),
					client_user_agent: request.headers.get("user-agent") ?? undefined,
					fbp: request.cookies.get("_fbp")?.value,
					fbc: clickId(request, sourceUrl),
				},
				custom_data: event.customData,
			},
		],
	};

	if (process.env.META_TEST_EVENT_CODE) {
		payload.test_event_code = process.env.META_TEST_EVENT_CODE;
	}

	try {
		const res = await fetch(
			`https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${accessToken}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			},
		);

		if (!res.ok) {
			console.error("Meta CAPI error:", res.status, await res.text());
		}
	} catch (error: unknown) {
		// Never let a tracking failure break the request that triggered it.
		console.error("Meta CAPI request failed:", error);
	}
}
