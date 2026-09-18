# Nova

Landing page for Nova, where visitors sign up for a free financial consultation.
Built with Next.js and Tailwind CSS; signups are stored in a Notion database and
rate limited with Upstash Redis.

## Local development

```bash
pnpm install
pnpm dev
```

The site runs on `http://localhost:3000`.

## Environment variables

Create a `.env.local` file with:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NOTION_SECRET=
NOTION_DB_ID=
```

`NOTION_DB_ID` is the 32-character ID in the Notion database URL. The database
needs `Name` (title), `Email` (email), `Referral Code` (text), `Referred By`
(text), and `Referrer` (relation to itself) properties, and must be shared with
the Notion integration that issued `NOTION_SECRET`.

---

Originally based on the MIT-licensed [Waitly](https://github.com/Idee8/Waitly)
template (see [LICENSE](LICENSE)).
