// Run after installing Playwright and Chromium; no Firebase credentials needed.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const server = spawn(process.execPath, ['tools/prototype-server.mjs'], { env: { ...process.env, PORT: '4187' } });
  let browser;
  try {
    await Promise.race([
      once(server.stdout, 'data'),
      once(server, 'exit').then(([code]) => { throw Error('Test server exited: ' + code); }),
      new Promise((_, reject) => { const timer = setTimeout(() => reject(Error('Test server startup timeout')), 5000); timer.unref(); })
    ].filter(Boolean));
    browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
    const context = await browser.newContext();
    const page = await context.newPage(), errors = [], external = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (!r.url().startsWith('http://localhost:4187')) external.push(r.url()); });
    await page.goto('http://localhost:4187/v0.5.html');
    await page.locator('#cloud-save-panel').waitFor();
    assert.equal(await page.locator('[data-login]').textContent(), 'Entrar com Google');
    assert.equal(await page.locator('[data-login]').isDisabled(), true);
    await page.locator('#demo').click();
    assert.equal(await page.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 1);
    await page.reload();
    assert.equal(await page.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 1);
    await context.setOffline(true); await page.locator('#demo').click();
    assert.equal(await page.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 2);
    assert.match(await page.locator('[data-status]').textContent(), /Offline/);
    await context.setOffline(false);
    await page.evaluate(() => localStorage.setItem('capsulemon:save:v1:guest', '{corrupt'));
    await page.reload();
    assert.match(await page.locator('[data-status]').textContent(), /Erro/);
    await page.locator('#demo').click(); // game keeps running despite save failure
    assert.equal(await page.evaluate(() => localStorage.getItem('capsulemon:save:v1:guest')), '{corrupt');
    assert.match(await page.locator('#toast').textContent(), /Demo iniciado|IMPACTO FORTE/);
    assert.deepEqual(errors, []); assert.deepEqual(external, []);
    console.log('Browser: guest, refresh, offline, corrupt save, gameplay and zero external requests OK');
    // Script files work on file:// too: local-only play does not require an HTTP server.
    if (process.env.SKIP_FILE_TEST === '1') console.log('SKIP file:// check (managed browser policy)');
    else {
      const filePage = await context.newPage();
      await filePage.goto(pathToFileURL(path.resolve('prototype/v0.5.html')).href);
      await filePage.locator('#cloud-save-panel').waitFor(); await filePage.locator('#demo').click();
      assert.equal(await filePage.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 1);
      console.log('Browser: direct HTML opening OK');
    }
    // End-to-end UI with an in-memory auth/cloud double, not a real OAuth claim.
    const account = await browser.newContext();
    await account.route('**/cloud-save/firebase-config.js', route => route.fulfill({ contentType: 'text/javascript', body: 'window.CAPSULEMON_FIREBASE_CONFIG={enabled:true};' }));
    await account.route('**/cloud-save/firebase-adapter.js', route => route.fulfill({ contentType: 'text/javascript', body: `
      window.createCapsuleFirebase=async()=>{
        let cb; const docs=new Map();
        return {auth:{onAuthStateChanged:fn=>{cb=fn;fn(null)},loginGoogle:async()=>cb({uid:'test-google',displayName:'Jogador',email:'player@example.test'}),logout:async()=>cb(null)},
          cloud:{read:async uid=>docs.get(uid)||null,reconcile:async(uid,resolve)=>{const d=resolve(docs.get(uid)||null);if(d.write)docs.set(uid,d.data);return d.data}}};
      };` }));
    const logged = await account.newPage(); await logged.goto('http://localhost:4187/v0.5.html');
    await logged.locator('[data-login]:not([disabled])').waitFor(); await logged.locator('#demo').click();
    await logged.locator('[data-login]').click();
    await logged.waitForFunction(() => document.querySelector('[data-status]').textContent === 'Sincronizado');
    assert.match(await logged.locator('[data-user]').textContent(), /player@example.test/);
    assert.equal(await logged.evaluate(() => JSON.parse(localStorage.getItem('capsulemon:save:v1:test-google')).stats.demoRuns), 1);
    await logged.locator('[data-sync]').click();
    await logged.addInitScript(() => Object.defineProperty(navigator, 'onLine', { get: () => false, configurable: true }));
    await logged.reload();
    assert.match(await logged.locator('[data-user]').textContent(), /Perfil local/);
    assert.equal(await logged.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 1);
    await logged.locator('#demo').click();
    assert.equal(await logged.evaluate(() => CapsuleProgress.getState().stats.demoRuns), 2);
    assert.match(await logged.locator('[data-status]').textContent(), /Offline/);
    console.log('Browser: offline refresh restores last local uid without cloud authorization OK');
    // Restore connectivity to let the auth observer resolve the session.
    await logged.evaluate(() => { Object.defineProperty(navigator, 'onLine', { get: () => true, configurable: true }); window.dispatchEvent(new Event('online')); });
    await logged.waitForFunction(() => document.querySelector('[data-user]').textContent === 'Visitante');
    await logged.locator('[data-login]').click();
    await logged.waitForFunction(() => document.querySelector('[data-status]').textContent === 'Sincronizado');
    await logged.locator('[data-logout]').click();
    assert.equal(await logged.locator('[data-user]').textContent(), 'Visitante');
    console.log('Browser: Google UI, uid association, sync and logout with adapter double OK');
  } finally { if (browser) await browser.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
