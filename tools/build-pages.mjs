import { copyFile, cp, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Portal ESTILINGADO como entrada de publicação.
// A build de combate permanece em TESTgordon/ com o mesmo caminho.
const output = new URL('../_site/', import.meta.url);
await mkdir(output, { recursive: true });
await copyFile(new URL('../index.html', import.meta.url), new URL('index.html', output));
for (const dir of ['assets', 'telas', 'TESTgordon']) {
  await cp(new URL('../' + dir + '/', import.meta.url), new URL(dir + '/', output), { recursive: true });
}
await writeFile(new URL('.nojekyll', output), '');
console.log('Portal mobile publicado em: ' + fileURLToPath(output));
