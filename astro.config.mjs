import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkGfm from 'remark-gfm';
import articleLayout from './src/lib/article-layout.ts';
export default defineConfig({
  site: 'https://gbgabiola.vercel.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [articleLayout],
      smartypants: false,
    }),
    syntaxHighlight: false,
  },
});
