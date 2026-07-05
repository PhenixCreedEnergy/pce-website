# Phoenix Creed Energy Website

Corporate website for Phoenix Creed Energy (PCE), built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and local Roboto font assets.

The site presents PCE's electric mobility ecosystem: EV charging infrastructure, the PCE app, investor information, company pages, EV service and maintenance, careers, and placeholder pages for products that are not yet launched.

## Table of Contents

- [Branch Workflow](#branch-workflow)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation and Development](#installation-and-development)
- [Production Build](#production-build)
- [Linting](#linting)
- [Visual Verification](#visual-verification)
- [Project Structure Overview](#project-structure-overview)
- [Application Routes](#application-routes)
- [App Directory](#app-directory)
- [Components](#components)
- [Layout Components](#layout-components)
- [Section Components](#section-components)
- [UI Components](#ui-components)
- [Library Helpers](#library-helpers)
- [Public Assets](#public-assets)
- [Fonts](#fonts)
- [SEO, Sitemap, and Robots](#seo-sitemap-and-robots)
- [Navigation and Footer Rules](#navigation-and-footer-rules)
- [Styling Guidelines](#styling-guidelines)
- [Known Local Development Notes](#known-local-development-notes)
- [Deployment Notes](#deployment-notes)
- [Contributor Notes](#contributor-notes)

## Branch Workflow

This repository follows a simple organization workflow:

| Branch | Purpose | Merge Direction |
| --- | --- | --- |
| `dev` | Active development, feature work, UI iterations, route updates, and QA checks. | Feature work lands here first. |
| `main` | Production-ready source. Keep stable and deployable. | Promote from `dev` after review and verification. |

Recommended workflow:

1. Pull the latest `dev`.
2. Make changes on `dev` or a feature branch from `dev`.
3. Run verification locally.
4. Commit with a conventional commit message.
5. Push to remote.
6. Merge/promote `dev` into `main` only when the site is ready for production.

Conventional commit examples:

```bash
feat: add careers page
fix: route unavailable products to coming soon
style: refine homepage hero typography
chore: update readme documentation
```

## Recommended IDE Setup

Recommended editor:

- VS Code

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript support built into VS Code

## Prerequisites

Use Node.js 20 or newer. The project currently uses React 19 and Next.js 15, so a modern Node runtime is expected.

Check your versions:

```bash
node --version
npm --version
```

## Environment Variables

This project currently does not require a `.env` file for local development.

SEO metadata is configured in `src/lib/seo.ts`, and static assets are served from `public/`.

If future integrations are added, create a `.env.local` file at the project root and document every variable here before merging.

Suggested future format:

```bash
NEXT_PUBLIC_SITE_URL="https://example.com"
NEXT_PUBLIC_ANALYTICS_ID=""
```

Rules:

- Do not commit secrets.
- Use `NEXT_PUBLIC_` only for values that are safe to expose in the browser.
- Keep production-only values in the deployment provider's environment settings.

## Installation and Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

By default, Next.js tries to run on:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will automatically choose another port, commonly:

```text
http://localhost:3001
http://localhost:3002
```

Use the URL printed in the terminal.

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

Important local note:

Do not run `npm run build` while `npm run dev` is active in this repository. Both commands write to `.next/`, and running them at the same time can temporarily cause missing manifests, stale CSS, blank pages, or transient 404/500 responses. Stop the dev server first, then build.

## Linting

Run linting:

```bash
npm run lint
```

Note: this project currently uses `next lint` via the `lint` script.

## Visual Verification

There is a Playwright helper script:

```text
scripts/screenshot-all.js
```

It captures desktop, tablet, and mobile screenshots for key pages and checks for basic image/console issues.

Before using it, start the app on the port expected by the script. The script currently uses:

```js
const BASE = "http://localhost:3001";
```

If your dev server is running on another port, update `BASE` in `scripts/screenshot-all.js` or start Next on the expected port.

Example:

```bash
npm run dev -- --port 3001
node scripts/screenshot-all.js
```

Generated screenshots are written to:

```text
screenshots/
```

The `screenshots/` folder is generated output and should not usually be committed unless explicitly needed for review.

## Project Structure Overview

```text
pce-website/
├── public/
│   ├── Roboto/
│   ├── hero/
│   ├── investor/
│   ├── pce-logo-new.png
│   ├── charging-hub.png
│   ├── fuel-station.png
│   ├── energy-source.png
│   └── ...
├── scripts/
│   └── screenshot-all.js
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Application Routes

Routes are implemented with the Next.js App Router under `src/app`.

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Homepage and main marketing flow. |
| `/charging-network` | `src/app/charging-network/page.tsx` | EV charging network page. |
| `/pce-app` | `src/app/pce-app/page.tsx` | PCE mobile app page. |
| `/investors` | `src/app/investors/page.tsx` | Investor relations page. |
| `/about` | `src/app/about/page.tsx` | Company story, vision, leadership, and capabilities. |
| `/contact` | `src/app/contact/page.tsx` | Contact form and office/contact details. |
| `/careers` | `src/app/careers/page.tsx` | Careers page; currently no open roles. |
| `/coming-soon` | `src/app/coming-soon/page.tsx` | Placeholder route for unavailable products. |
| `/products/ev-service` | `src/app/products/ev-service/page.tsx` | EV service and maintenance page. |
| `/robots.txt` | `src/app/robots.ts` | Robots metadata route. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Sitemap metadata route. |

## App Directory

`src/app/` contains route files, global styles, and the root layout.

Key files:

- `layout.tsx`: root HTML layout, metadata wrapping, navbar/footer inclusion, and local Roboto font registration.
- `globals.css`: Tailwind layers, global base styles, typography defaults, utility classes, and global UI helpers.
- `page.tsx`: homepage composition.
- `robots.ts`: generated robots route.
- `sitemap.ts`: generated sitemap route.

Client pages:

- `src/app/contact/ContactPageClient.tsx`
- `src/app/investors/InvestorsPageClient.tsx`
- `src/app/products/ev-service/EVServicePageClient.tsx`

These use client-side interactivity, Framer Motion, form state, or viewport animation hooks.

## Components

Reusable components live under `src/components`.

```text
src/components/
├── layout/
├── sections/
└── ui/
```

## Layout Components

`src/components/layout/`

- `Navbar.tsx`: fixed responsive navigation, Products mega-menu, compact Investors/Company dropdowns, and mobile drawer.
- `Footer.tsx`: organization footer with product, company, investor, contact, and legal link groups.

Navigation rules:

- Products uses a large mega-menu.
- Investors and Company use compact dropdowns.
- `EV Power Banks` and `Energy Storage` route to `/coming-soon`.
- Blog is not currently included because there is no `/blog` route.
- Careers routes to `/careers`.
- Contact routes to `/contact`.

## Section Components

`src/components/sections/`

- `HeroSection.tsx`: homepage hero with carousel background and bottom-left editorial text lockup.
- `StatsSection.tsx`: homepage metrics and supporting visuals.
- `WhatWeBuild.tsx`: product capability cards.
- `NetworkMapSection.tsx`: network/market map section.
- `AppPreviewSection.tsx`: phone/app UI previews.
- `InvestorTeaser.tsx`: investor callout section.
- `LeadershipSection.tsx`: leadership profiles.
- `CTASection.tsx`: homepage mid-page CTA.
- `FinalCTASection.tsx`: final conversion CTA.

## UI Components

`src/components/ui/`

- `AnimatedSection.tsx`: shared animation wrapper.
- `Button.tsx`: reusable button utility.
- `HeroCarousel.tsx`: homepage image carousel.
- `Logo.tsx`: PCE logo component.
- `StatCard.tsx`: metric card display.
- `StoreBadges.tsx`: app store badge display.
- `ThemeProvider.tsx` and `ThemeToggle.tsx`: theme support utilities.

## Library Helpers

`src/lib/`

- `seo.ts`: site URL, site name, default metadata, Open Graph image settings, and metadata helper.
- `utils.ts`: shared utility helpers such as class merging.

Use `createPageMetadata` from `src/lib/seo.ts` when adding new public pages so metadata stays consistent.

## Public Assets

`public/` contains static assets served directly by Next.js.

Important groups:

- `public/Roboto/`: local Roboto font files and license.
- `public/hero/`: hero image assets.
- `public/investor/`: investor PDF deck.
- `public/pce-logo-new.png`, `public/pce-logo.png`: logo assets.
- Product imagery:
  - `product-ev-app.png`
  - `product-ev-charger.png`
  - `product-ev-service.jpg`
  - `product-power-bank.png`
  - `product-storage-unit.png`
- Page imagery:
  - `charging-hub.png`
  - `fuel-station.png`
  - `energy-source.png`
  - `energy-hub.png`
  - `about-us.png`
  - `ev-service-hero.jpg`

Static asset rules:

- Put browser-served images, PDFs, and font files in `public/`.
- Reference public assets with root-relative paths, for example `/pce-logo-new.png`.
- Keep large generated or temporary files out of the repository.

## Fonts

The site uses local Roboto from:

```text
public/Roboto/
```

Font registration happens in:

```text
src/app/layout.tsx
```

Tailwind `font-sans` is configured in:

```text
tailwind.config.ts
```

Global fallback enforcement is in:

```text
src/app/globals.css
```

Do not reintroduce Google-hosted font loading without a product/engineering reason. The current setup keeps the site self-contained and predictable.

## SEO, Sitemap, and Robots

SEO helpers live in:

```text
src/lib/seo.ts
```

Use `createPageMetadata` for page metadata:

```ts
export const metadata = createPageMetadata({
  title: "Careers",
  description: "Join Phoenix Creed Energy...",
  path: "/careers",
  image: "/energy-hub.png",
});
```

Sitemap routes are listed in:

```text
src/app/sitemap.ts
```

Robots configuration is in:

```text
src/app/robots.ts
```

When adding a new public page:

1. Add metadata using `createPageMetadata`.
2. Add the route to `src/app/sitemap.ts`.
3. Confirm the page builds.

## Navigation and Footer Rules

Current footer groups:

- Products
- Company
- Investors
- Contact
- Legal

Current behavior:

- `Charging Network` -> `/charging-network`
- `PCE App` -> `/pce-app`
- `EV Power Banks` -> `/coming-soon`
- `Energy Storage` -> `/coming-soon`
- `About Us` -> `/about`
- `Careers` -> `/careers`
- `Overview` -> `/investors`
- Contact-related links -> `/contact`

Avoid linking to routes that do not exist. If a feature is not ready, route it to `/coming-soon` or remove the link.

## Styling Guidelines

This site uses Tailwind CSS with a restrained PCE visual system:

- Deep navy backgrounds for dark sections.
- Electric blue/cyan highlights.
- Roboto typography.
- Rounded cards and glass panels where appropriate.
- Editorial bottom-left hero text on cinematic image pages.
- Left-aligned editorial text blocks on light pages.

Hero direction:

- Homepage, Charging Network, Investors, EV Service: dark or image-led editorial hero treatment.
- About, Contact, PCE App: cleaner left-aligned light hero treatment.
- Avoid oversized centered text unless a page intentionally needs a centered product reveal.

CTA direction:

- Primary CTA: solid PCE blue.
- Secondary CTA: glass or outline treatment.
- Do not route unavailable product CTAs to Contact unless the action is genuinely contacting the team.

## Known Local Development Notes

### Next.js workspace root warning

You may see:

```text
Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles and selected the directory of /Users/myke/package-lock.json as the root directory.
Detected additional lockfiles:
* /Users/myke/pce-website/package-lock.json
```

This is caused by another `package-lock.json` outside this repository. The build can still succeed. To silence it permanently, either remove the unnecessary parent lockfile or configure `outputFileTracingRoot` in `next.config.ts`.

### Build/dev `.next` collision

Do not run `npm run build` while `npm run dev` is active.

Symptoms of collision:

- temporary 404/500 responses
- missing `.next/routes-manifest.json`
- stale CSS
- blank pages
- webpack cache warnings

Fix:

1. Stop the dev server.
2. Run `npm run build`.
3. Restart `npm run dev`.

### Local route checks

You can verify a route with Node:

```bash
node -e "fetch('http://localhost:3002/careers').then(r => console.log(r.status, r.url))"
```

Use the actual port printed by Next.js.

## Deployment Notes

This is a standard Next.js application.

Typical deployment steps:

```bash
npm ci
npm run build
npm run start
```

If deploying to Vercel or another managed Next.js platform:

- Set the production branch to `main`.
- Keep `dev` as the active development branch.
- Confirm `npm run build` passes before promotion.
- Ensure the configured site URL in `src/lib/seo.ts` matches the production domain.

## Contributor Notes

Before opening a PR or pushing shared changes:

1. Confirm the branch target is correct (`dev` for active development, `main` for production-ready promotion).
2. Run:

```bash
npm run build
```

3. Check affected routes manually in the browser.
4. Use a conventional commit message.
5. Avoid committing generated folders such as `.next/`, `node_modules/`, and `screenshots/`.

Current repository focus:

- Keep the site fast and visually consistent.
- Keep public routes real; avoid dead links.
- Keep unavailable product experiences pointed to `/coming-soon`.
- Keep navigation and footer behavior consistent across desktop and mobile.

