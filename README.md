# G’s portfolio and blog

[![README views](https://hits.sh/github.com/gbgabiola/gbgabiola.github.io.svg?label=README%20views&color=006a60)](https://hits.sh/github.com/gbgabiola/gbgabiola.github.io/)

[View portfolio](https://gbgabiola.vercel.app)

Built with Astro, TypeScript, and CSS Modules. Pages and Markdown articles
build to static HTML. Small browser scripts handle theme preferences and
keyboard access to overflowing article tables.

The theme follows the system preference until the visitor selects a theme.
Manual choices persist across visits.

## Development

Use the Node version in `.nvmrc` and npm.

```sh
nvm use
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm run test:content
npm run build
```

Run `npm start`, then `npm run test:smoke` in another terminal.
The local preview serves the generated `dist/` files and applies `public/_headers`.
Stop the server before running browser tests.

```sh
npx playwright install --with-deps chromium webkit
npm run test:browser
```

Prettier is configured for Astro, TypeScript, and styles. Format changed files
with `npx prettier --write <files>`.

## Content

- `src/content/profile.ts` contains contact details and résumé links.
- `src/content/about.ts` contains experience and skills.
- `src/content/projects.ts` contains featured projects.
- `src/config/site.ts` contains the canonical URL, metadata, and navigation.
- `src/content.config.ts` defines the blog collection and metadata schema.

Keep résumé files publicly readable and check downloads while signed out.

## Blog

1. Add a lowercase, hyphen-separated Markdown filename in `src/content/blog/`.
   Its filename becomes the article URL.
2. Include frontmatter in that same file:

```yaml
---
title: "Article title"
date: "2026-12-05"
summary: "A short description for the blog index and search previews."
tags: ["git"]
---
```

3. Use existing tag keys from `src/content/posts.ts`, or register a new tag there.
4. Write the article below the frontmatter. Use level-two and level-three headings;
   the page generates the title, byline, tag links, and table of contents.
5. Run `npm run validate:blog`, build, and review the branch preview.

No separate post catalog entry is needed. Articles automatically appear in
`/blog`, tag archives, `/sitemap.xml`, and `/feed.xml`.
The Next.js theme-switch article documents the previous implementation.

## Hosting

The output is portable static files in `dist/`; no server adapter is required.

**Vercel:** `vercel.json` selects Astro, `npm ci`, `npm run build`, and `dist/`.
It retains security headers, feed content types, and immutable asset caching.
Existing production remains on Vercel while the rebuild is reviewed.

**Cloudflare Workers Static Assets:** `wrangler.jsonc` configures extensionless
URLs and the custom 404 page. `public/_headers` supplies response headers. A rewrite in `public/_redirects`
keeps the Google ownership response at its original `.html` filename.
Connect the review branch using build command `npm run build` and deploy command
`npx wrangler@4.169.0 deploy`. Use the pinned Node version for builds.
Alternatively, build locally and deploy the same `dist/` with Wrangler.
No Worker script, database, or runtime rendering is needed.

Before changing the production hostname, update `site.url` and the production
smoke workflow URL together, verify redirects from the previous hostname, and
recheck canonical URLs, sitemap submission, RSS links, and ownership verification.
Preview deployments intentionally keep the current production canonical URL.

## Releases

The `feat/astro-v5` branch prepares portfolio version `5.0.0` for review.
It does not publish a release or change production hosting.

After review:

1. Open a PR to `develop` and wait for validation and the deployment preview.
2. Merge `develop` into `main` through a PR, preserving commit history.
3. Confirm the ready production deployment matches the expected `main` SHA.
4. Run the **Production smoke** workflow from `main` with that deployment SHA.
5. Tag the verified commit and publish its GitHub Release when the version changes.

Update `package.json` and `package-lock.json` together with
`npm version <patch|minor|major> --no-git-tag-version` in the same PR as the change.
Keep published tags on their original commits.

Dependabot checks npm and GitHub Actions monthly. Review its grouped updates
against `develop` and assess major upgrades separately.

## License

[MIT](LICENSE). Contact icons by [Font Awesome](https://fontawesome.com/) are used
under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
