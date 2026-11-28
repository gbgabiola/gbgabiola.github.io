import { readFileSync } from 'node:fs';

// Keep the verification response available at its original filename on static hosts.
export function GET() {
  return new Response(readFileSync('public/google88fb68dc55bbcb2f.html'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
