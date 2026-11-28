import { site } from '@/config/site';
export function GET() {
  return new Response(
    'User-agent: *\nAllow: /\nSitemap: ' +
      new URL('/sitemap.xml', site.url).href +
      '\n',
  );
}
