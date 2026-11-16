# G’s portfolio and blog — v4

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

The smoke test checks page titles, content, a single main heading per page,
project and resume links, 404 status, the manifest, and Keybase and Google ownership
files. Each request has a 15-second deadline. The Playwright suite checks viewport
fit, active and keyboard navigation, theme persistence, and common accessibility
issues against a production build. A focused WebKit test also checks keyboard
scrolling for overflowing article tables. Stop any previous test server and run:

```sh
npx playwright install chromium webkit
npm run build
npm run test:browser
```

Before a release, test the external project links and résumé in a signed-out
browser.

## Content

Edit src/content/profile.ts for contact details and resume URLs, about.ts for
experience and skills, and projects.ts for project cards. Site defaults and
navigation live in src/config/site.ts.

Resume downloads use Google Drive. Confirm Anyone with the link → Viewer sharing
and test signed out. Drive may show its own download confirmation page.

## Blog

Add a Markdown file in `src/content/blog/` and an entry in
`src/content/posts.ts` with the matching slug, a title, an ISO date, a summary,
and tags from `blogTags`. Use level-two headings in articles. The page supplies
the main heading. The desktop table of contents is generated automatically
from level-two and level-three headings. Run `npm run validate:blog` to check
the catalog and Markdown files before opening a PR. The production build runs
the same check. Posts and tag archives are built with the site and listed in
the sitemap. Use a branch preview to check an article before publishing it.

## Deployment and version history

Vercel uses the Next.js preset, Node 24, npm ci, npm run build, and the default
output handling. Keep vercel.json; it explicitly selects the Next.js adapter.

The application version follows [Semantic Versioning](https://semver.org/).
The site footer reads it directly from `package.json`. Update the manifest and
lockfile together with `npm version <patch|minor|major> --no-git-tag-version`
in the same pull request as the changes being released.

Dependabot checks npm monthly and groups minor and patch updates into one
open PR against `develop`. Review major upgrades separately for compatibility.
GitHub security update PRs target the default branch when that repository setting
is enabled.

1. Open a PR to `develop`. Review its Vercel preview and wait for the
   `Next.js validation / validate` result.
2. Open a PR from `develop` to `main` when the release is approved. Vercel owns
   production deployment from `main`.
3. In Vercel, confirm the production domain points to the **Ready** deployment
   for the expected `main` commit and copy its full commit SHA.
4. In GitHub Actions, open **Production smoke → Run workflow**, select
   `main`, and paste the deployment SHA. Wait for it to pass. The workflow
   compares the supplied SHA with the checkout and checks the site’s public
   responses and footer version. Check the deployment SHA in Vercel because
   builds can share a version. To run the smoke test locally from that commit,
   use `SMOKE_BASE_URL=https://gbgabiola.vercel.app npm run test:smoke`.
5. Tag the verified production commit with an annotated `vMAJOR.MINOR.PATCH`
   tag matching `package.json` and publish short GitHub release notes.

Use patch versions for fixes and routine content updates, minor versions for
features such as the blog, and major versions for substantial rebuilds or
incompatible public URL changes.

For GitHub rulesets, target `main` and `develop`, require a pull request and the
`validate` job from GitHub Actions, and block force pushes. Set the required
approval count to zero for a solo maintainer. Verify the exact check name on a
PR before enabling the rule.

For a production regression, select the previous healthy production deployment
in Vercel and use Instant Rollback. Revert the faulty changes in Git through the
normal PR flow so the branch and deployed site converge. Keep existing release
tags on their original commits.

- `4.0.0` was the Next.js migration baseline before the blog was integrated.
- [`4.1.0`](https://github.com/gbgabiola/gbgabiola.github.io/releases/tag/v4.1.0)
  includes both the Next.js migration and the blog.
- Routine post publication uses the normal PR workflow. Add a release tag when
  the portfolio version itself changes.
- `v3` and the `portfolio-v3-gatsby` tag preserve the final Gatsby version.
- `feat/nextjs-v4` is the migration branch with its own Vercel preview.

Contact icons by [Font Awesome](https://fontawesome.com/) are used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
