import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('dist');
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = Number(
  portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 3000,
);
const rules = [];
for (const line of (await readFile(resolve(root, '_headers'), 'utf8')).split(
  /\r?\n/,
)) {
  if (line.startsWith('/')) rules.push({ path: line.trim(), headers: {} });
  else if (line.trim() && rules.length) {
    const divider = line.indexOf(':');
    rules.at(-1).headers[line.slice(0, divider).trim()] = line
      .slice(divider + 1)
      .trim();
  }
}
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};
async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
const server = createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method || '')) {
      res.writeHead(405);
      res.end();
      return;
    }
    const pathname = decodeURIComponent(
      new URL(req.url || '/', 'http://localhost').pathname,
    );
    const file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(400);
      res.end();
      return;
    }
    if (pathname === '/_headers') {
      res.writeHead(404);
      res.end();
      return;
    }
    let target = pathname === '/' ? resolve(root, 'index.html') : file;
    if (!(await fileExists(target)) && (await fileExists(file + '.html')))
      target = file + '.html';
    const found = await fileExists(target);
    if (!found) target = resolve(root, '404.html');
    const headers = {
      'Content-Type': types[extname(target)] || 'application/octet-stream',
    };
    for (const rule of rules) {
      if (
        rule.path.endsWith('*')
          ? pathname.startsWith(rule.path.slice(0, -1))
          : pathname === rule.path
      )
        Object.assign(headers, rule.headers);
    }
    const body = await readFile(target);
    res.writeHead(found ? 200 : 404, headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log('Portfolio preview listening on http://127.0.0.1:' + port),
);
