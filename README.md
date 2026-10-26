# Genesis Gabiola portfolio — v4

Next.js App Router, React, TypeScript, CSS Modules, and next-themes.
Node 24 is required. npm is the package manager; commit package-lock.json.

## Development

```sh
nvm use
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

With the production server running, use another terminal:

```sh
npm run test:smoke
```

Type checking generates Next.js route types first, so it works in a clean checkout.
next-env.d.ts and .next are generated and ignored. TypeScript is strict; app source
uses .ts/.tsx.

The smoke test checks page titles, content, a single main heading per page, active
navigation, project and resume links, 404 status, manifest, and Keybase verification.
Browser interaction and external destination availability are separate checks.

## Content

Edit src/content/profile.ts for contact details and resume URLs, about.ts for
experience and skills, and projects.ts for project cards. Site defaults and
navigation live in src/config/site.ts.

Resume downloads use Google Drive. Confirm Anyone with the link → Viewer sharing
and test signed out. Drive may show its own download confirmation page.

## Deployment and version history

Vercel uses the Next.js preset, Node 24, npm ci, npm run build, and the default
output handling. Keep vercel.json; it explicitly selects the Next.js adapter.

- v2: historical GitHub Pages version.
- v3: preserved Gatsby version.
- feat/nextjs-v4: ongoing migration and preview deployment.
- develop: integration branch.
- main: production branch after the reviewed migration is merged.
