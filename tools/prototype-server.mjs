import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 4174);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'prototype');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function indexPage() {
  const files = fs.readdirSync(root).filter(file => file.toLowerCase().endsWith('.html')).sort();
  const links = files.map(file => `<li><a href="/${encodeURIComponent(file)}">${file}</a></li>`).join('');
  return `<!doctype html><meta charset="utf-8"><title>GORDON · Protótipos</title><style>body{font:16px system-ui;max-width:800px;margin:40px auto;padding:0 20px;background:#101713;color:#e8f2eb}a{color:#9ee8d5}li{margin:14px 0}</style><h1>GORDON · Protótipos</h1><p>Servidor local dedicado a <code>GORDON/prototype</code>.</p><ul>${links}</ul>`;
}

const server = http.createServer((request, response) => {
  try {
    const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
    if (requestPath === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(indexPage());
      return;
    }
    const file = path.resolve(root, `.${requestPath}`);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Server error: ${error.message}`);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`GORDON prototype server: http://localhost:${port}/`);
  console.log(`Root: ${root}`);
});
