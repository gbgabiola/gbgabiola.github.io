# G’s portfolio and blog

[![README views](https://hits.sh/github.com/gbgabiola/gbgabiola.github.io.svg?label=README%20views&color=006a60)](https://hits.sh/github.com/gbgabiola/gbgabiola.github.io/)

[View portfolio](https://gbgabiola.vercel.app)

Built with Next.js, React, TypeScript, CSS Modules, and next-themes.
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
Stop the server before running browser tests.

```sh
npx playwright install --with-deps chromium webkit
npm run test:browser
```

## Content

- `src/content/profile.ts` contains contact details and résumé links.
- `src/content/about.ts` contains experience and skills.
- `src/content/projects.ts` contains featured projects.
- `src/config/site.ts` contains site metadata and navigation.

Keep résumé files publicly readable and check downloads while signed out.

## Blog

1. Add a Markdown file in `src/content/blog/`.
2. Add its matching slug, title, ISO date, summary, and tags in `src/content/posts.ts`.
3. Use level-two and level-three headings. The page generates the title and table of contents.
4. Run `npm run validate:blog` and review the branch preview before publishing.

Published posts appear in the sitemap and `/feed.xml`.

## Deployment and releases

Vercel deploys `main` using Node 26, `npm ci`, and `npm run build`.

1. Open a PR to `develop` and wait for CI and the Vercel preview.
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
