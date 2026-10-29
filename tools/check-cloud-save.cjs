// Dependency-free syntax and source hygiene checks; no external lint download needed.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const vm = require('node:vm');
const files = ['schema.js', 'save-service.js', 'auth-service.js', 'firebase-config.js', 'firebase-adapter.js', 'bootstrap.js']
  .map(f => 'prototype/cloud-save/' + f)
  .concat(['tests/cloud-save.test.cjs', 'tests/browser-smoke.cjs', 'tests/firestore-rules.test.mjs', 'tools/check-cloud-save.cjs']);
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  if (/[^\S\n]+$/m.test(source)) throw Error('Trailing whitespace: ' + file);
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(1);
}
const html = fs.readFileSync('prototype/v0.5.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach(source => new vm.Script(source));
// The before-state can be supplied from the original upstream commit without Git history locally.
if (process.env.CAPSULEMON_BASE_HTML) {
  const original = fs.readFileSync(process.env.CAPSULEMON_BASE_HTML, 'utf8');
  const originalScripts = [...original.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (JSON.stringify(originalScripts) !== JSON.stringify(scripts)) throw Error('Original gameplay script changed');
}
for (const [, file] of html.matchAll(/<script src="([^"]+)"/g)) {
  if (!fs.existsSync(path.join('prototype', file))) throw Error('Missing script ' + file);
}
console.log('Syntax, source hygiene, inline script and asset links: OK');
