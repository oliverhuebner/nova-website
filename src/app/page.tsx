import { LandingPage } from "./page.client";
import { connection } from "next/server";
import { NOTION_DB_ID } from "~/lib/notion";
import { getNotionDatabaseRowCount } from "~/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  // forces the page to be dynamically rendered
  await connection();

  const waitlistPeople = await getNotionDatabaseRowCount(NOTION_DB_ID);

  return <LandingPage waitlistPeople={waitlistPeople} />;
}
