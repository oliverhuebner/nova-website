import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { notion } from "./notion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COUNT_TTL_MS = 5 * 60 * 1000;

let cachedCount: { id: string; value: number; expiresAt: number } | null = null;
let inFlightCount: Promise<number> | null = null;

async function fetchNotionDatabaseRowCount(databaseId: string) {
  let total = 0;
  let hasMore = true;
  let startCursor: string | null = null;

  // Notion has no count endpoint, so sizing the database means walking every
  // page of it. Only the length matters, so rows are counted rather than kept.
  while (hasMore) {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor ?? undefined,
      page_size: 100,
    });

    total += response.results.length;
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  return total;
}

/**
 * Cached because the walk above runs serially on the render path of the landing
 * page: uncached, every visitor waits out one round trip per 100 rows before
 * receiving any HTML, to render a social proof line that changes rarely. The
 * in-flight promise is shared so a burst of arrivals triggers one walk, not one
 * per request.
 */
export async function getNotionDatabaseRowCount(databaseId: string) {
  if (
    cachedCount &&
    cachedCount.id === databaseId &&
    cachedCount.expiresAt > Date.now()
  ) {
    return cachedCount.value;
  }

  if (!inFlightCount) {
    inFlightCount = fetchNotionDatabaseRowCount(databaseId)
      .then((value) => {
        cachedCount = {
          id: databaseId,
          value,
          expiresAt: Date.now() + COUNT_TTL_MS,
        };
        return value;
      })
      .catch((error) => {
        // The count only drives optional social proof, so a Notion outage
        // should degrade to hiding it rather than taking the page down.
        console.error("Error fetching database rows:", error);
        return cachedCount?.value ?? 0;
      })
      .finally(() => {
        inFlightCount = null;
      });
  }

  return inFlightCount;
}
