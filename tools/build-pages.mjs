import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const output = new URL('../_site/', import.meta.url);
await mkdir(output, { recursive: true });
await copyFile(new URL('../TESTgordon/BATALHA_CENTRALIZADA.html', import.meta.url), new URL('index.html', output));
await writeFile(new URL('.nojekyll', output), '');
console.log(`GitHub Pages: ${fileURLToPath(output)}`);
