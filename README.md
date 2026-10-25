# gbgabiola's portfolio — v4

Next.js App Router, React, and plain CSS. Node 24 is required.

## Development

```sh
nvm use
npm ci
npm run dev
```

## Production checks

```sh
npm run lint
npm run build
npm start
```

With the production server running, use another terminal:

```sh
npm run test:smoke
```

The smoke test covers page content and metadata, active navigation,
404 handling, the manifest, and Keybase verification.
Browser interaction checks remain separate.

## Version history

- `v2`: historical GitHub Pages version.
- `v3`: preserved Gatsby version.
- `develop`: integration branch for current development.
- `main`: Vercel production branch.


