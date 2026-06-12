# enscribe-www

Marketing site for [enscribe.online](https://enscribe.online), built with Next.js (App Router). The product app lives at [app.enscribe.online](https://app.enscribe.online).

## Structure

```
app/                    # Routes, layout, global styles
components/landing/     # Landing sections (landing-header.jsx, landing-page-2.jsx, …)
app/landing-page-2/   # Header-only preview route
lib/                    # Shared utilities (app URL helpers)
public/                 # Static assets (logo, etc.)
```

## Setup

```bash
npm install
cp .env.local   # optional — override app URL
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) (port **3002** so it does not conflict with enscribe-web on 3000).

Header-only preview: [http://localhost:3002/landing-page-2](http://localhost:3002/landing-page-2).

## Scripts

- `npm run dev` — development server on port 3002
- `npm run build` — production build
- `npm run start` — serve production build

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_APP_URL` | `https://app.enscribe.online` | Base URL for Log in / Sign up links |
| `NEXT_PUBLIC_BETA_ONLY` | `false` | When `true` (or `1` / `yes`), content inside `<BetaOnly>` is shown |

### BetaOnly

Wrap any UI that should only appear in beta:

```jsx
import { BetaOnly } from "@/components/beta-only";

<BetaOnly fallback={<p>Not available</p>}>
  <YourBetaFeature />
</BetaOnly>
```

Set `NEXT_PUBLIC_BETA_ONLY=true` in `.env.local` and restart the dev server. When disabled, children are hidden and `fallback` is rendered instead.
