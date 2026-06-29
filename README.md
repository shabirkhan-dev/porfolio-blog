# Portfolio Blog

A portfolio and blog built with Next.js App Router, TypeScript, Tailwind CSS,
and Framer Motion. Blog posts are **read** from Supabase Postgres at request /
build time; static site content (profile, projects, testimonials) lives in
`src/data/site.ts`.

> This project is read-only with respect to Supabase. Creating, editing, and
> automating posts will live in a separate personal dashboard. Here we only
> fetch published posts and render them.

## Getting Started

Install dependencies with Bun:

```bash
bun install
```

Create a `.env` (or `.env.local`) from the example and fill in your Supabase
values:

```bash
cp .env.example .env
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example`. Only public, read-only values are needed.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Project URL (Settings → API). |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes\* | New publishable key (`sb_publishable_...`). Safe in the browser. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Fallback | Legacy anon key. Used only if the publishable key is unset. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public URL for sitemap/metadata. |

\* Either the publishable key or its legacy anon fallback must be present. Row
Level Security restricts reads to `published` posts, so the publishable key is
safe to expose.

## Supabase

The schema lives in `supabase/migrations/001_posts.sql` (the `posts` table plus
RLS allowing public reads of `published` rows). Posts are managed from an
external dashboard; this app never writes to the database.

If Supabase env vars are absent, the blog data helpers return empty results, so
the site still builds.

## Content

- Blog posts: read from Supabase via `src/data/posts.server.ts`.
- Blog types + Markdown helpers (reading time, table of contents, text for the
  Listen feature): `src/data/posts.ts`.
- Everything else (profile, projects, testimonials, nav): `src/data/site.ts`.

### Markdown format

Post bodies are Markdown, rendered with the site's editorial styles:

| Syntax | Renders as |
| --- | --- |
| `## Heading` | Section heading (collected into the table of contents) |
| `### Subheading` | Subheading (not in TOC) |
| `::lead Your text` | Large lead paragraph |
| `> quote` | Pull quote |
| `> [!NOTE] text` | Callout box (label can be any word) |
| ` ```ts filename.ts ` | Code block with window chrome |
| `- item` / `1. item` | Styled bullet / numbered list |
| `---` | Decorative divider |

## Project Structure

- `src/app` — App Router pages (`/`, `/blog`, `/blog/[slug]`, etc.).
- `src/components` — layout, UI, and blog components.
- `src/data/site.ts` — static profile, projects, testimonials, nav content.
- `src/data/posts.ts` — client-safe blog types + Markdown helpers.
- `src/data/posts.server.ts` — server-only Supabase read queries.
- `src/lib/supabase/{config,static}.ts` — read-only Supabase client + config.
- `supabase/migrations` — SQL schema + RLS policies.

## Useful Commands

```bash
bun dev        # start the dev server
bun run build  # production build
bun run lint   # lint
```

## Deploy on Vercel

Push to GitHub, import in Vercel (`bun install` / `bun run build`), and add the
variables from `.env.example` to the Vercel project settings.
