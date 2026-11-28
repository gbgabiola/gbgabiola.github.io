import { readFileSync } from 'node:fs';
export function GET() {
  return new Response(readFileSync('public/social-preview.png'), {
    headers: { 'Content-Type': 'image/png' },
  });
}
