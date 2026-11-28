import { defineConfig, globalIgnores } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
export default defineConfig([
  globalIgnores([
    'dist/**',
    '.wrangler/**',
    '.astro/**',
    '.next/**',
    'node_modules/**',
    'test-results/**',
    'playwright-report/**',
  ]),
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
]);
