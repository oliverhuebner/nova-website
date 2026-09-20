export const META_PIXEL_ID = "2503180586852987";

declare global {
	interface Window {
		fbq?: (...args: unknown[]) => void;
	}
}

/**
 * Shared between the browser pixel and the Conversions API so Meta can
 * deduplicate the two copies of the same event.
 */
export function newEventId() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function trackPixelEvent(
	event: string,
	params: Record<string, unknown> = {},
	eventId?: string,
) {
	window.fbq?.("track", event, params, eventId ? { eventID: eventId } : {});
}
