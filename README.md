# Portfolio Blog

A portfolio and blog starter built with Next.js App Router, TypeScript,
Tailwind CSS, Bun, and Vercel deployment config.

## Getting Started

Install dependencies with Bun:

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app` contains the App Router pages.
- `src/components` contains shared layout and UI components.
- `src/content/site.ts` contains editable profile, project, social, and blog content.
- `vercel.json` pins Bun install/build commands for Vercel.

## Useful Commands

```bash
bun dev
bun run build
bun run lint
```

## Deploy on Vercel

Push the repository to GitHub, import it in Vercel, and Vercel will use:

- install command: `bun install`
- build command: `bun run build`
- output directory: `.next`

Set `NEXT_PUBLIC_SITE_URL` in Vercel once you have a production domain.
