import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { sendCapiEvent } from "~/lib/meta-capi";
import { notion, NOTION_DB_ID } from "~/lib/notion";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
});

export async function POST(request: NextRequest) {
  try {
    const xForwardedForHeader = request.headers.get("x-forwarded-for");
    const ip = xForwardedForHeader
      ? xForwardedForHeader.split(",")[0].trim()
      : (request.headers.get("x-real-ip")?.trim() ?? "127.0.0.1");

    const result = await ratelimit.limit(ip);

    if (!result.success) {
      return NextResponse.json({ error: "Too many requests!" }, { status: 429 });
    }

    const { email, eventId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const existing = await notion.databases.query({
      database_id: NOTION_DB_ID,
      filter: {
        property: "Email",
        email: { equals: email },
      },
    });

    if (existing.results.length > 0) {
      return NextResponse.json(
        { error: "That email is already on the list — we'll be in touch soon." },
        { status: 409 }
      );
    }

    const page = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Name: {
          title: [],
        },
        Email: { email },
      },
    });

    await sendCapiEvent(request, {
      name: "Lead",
      email,
      eventId,
      customData: { content_name: "Consultation Request" },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Consultation request recorded",
        notionId: page.id,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Notion API error:", error.message);

      return NextResponse.json(
        {
          error: "Failed to save to Notion",
          details: error.message,
          success: false,
        },
        { status: 500 }
      );
    }
  }
}
