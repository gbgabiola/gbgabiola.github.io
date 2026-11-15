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

The application version follows [Semantic Versioning](https://semver.org/).
The site footer reads it directly from `package.json`. Update the manifest and
lockfile together with `npm version <patch|minor|major> --no-git-tag-version`
when preparing the next release.

Promote changes through `develop` before merging to `main`. After the release
lands, create an annotated `vMAJOR.MINOR.PATCH` tag on the production commit
using the version in `package.json`, then push the tag to GitHub.

- `v4.0.0` is the first Next.js release.
- `v3` and the `portfolio-v3-gatsby` tag preserve the final Gatsby version.
- `feat/nextjs-v4` is the migration branch with its own Vercel preview.
